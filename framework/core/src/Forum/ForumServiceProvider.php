<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Flarum\Forum;

use Flarum\Extension\Event\Disabled;
use Flarum\Extension\Event\Enabled;
use Flarum\Formatter\Formatter;
use Flarum\Foundation\AbstractServiceProvider;
use Flarum\Foundation\ErrorHandling\Registry;
use Flarum\Foundation\ErrorHandling\Reporter;
use Flarum\Foundation\ErrorHandling\ViewFormatter;
use Flarum\Foundation\ErrorHandling\WhoopsFormatter;
use Flarum\Foundation\Event\ClearingCache;
use Flarum\Foundation\MaintenanceMode;
use Flarum\Frontend\AddLocaleAssets;
use Flarum\Frontend\AddTranslations;
use Flarum\Frontend\AssetManager;
use Flarum\Frontend\Assets;
use Flarum\Frontend\Compiler\Source\SourceCollector;
use Flarum\Frontend\Frontend;
use Flarum\Frontend\RecompileFrontendAssets;
use Flarum\Http\Middleware as HttpMiddleware;
use Flarum\Http\RouteCollection;
use Flarum\Http\RouteHandlerFactory;
use Flarum\Http\UrlGenerator;
use Flarum\Locale\LocaleManager;
use Flarum\Settings\Event\Saved;
use Flarum\Settings\Event\Saving;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Container\Container;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Contracts\View\Factory;
use Laminas\Stratigility\MiddlewarePipe;
use Symfony\Contracts\Translation\TranslatorInterface;

class ForumServiceProvider extends AbstractServiceProvider
{
    public function register(): void
    {
        $this->container->extend(UrlGenerator::class, function (UrlGenerator $url, Container $container) {
            return $url->addCollection('forum', $container->make('flarum.forum.routes'));
        });

        $this->container->singleton('flarum.forum.routes', function (Container $container) {
            $routes = new RouteCollection;
            $this->populateRoutes($routes, $container);

            return $routes;
        });

        $this->container->afterResolving('flarum.forum.routes', function (RouteCollection $routes, Container $container) {
            $this->setDefaultRoute($routes, $container);
        });

        $this->container->singleton('flarum.forum.middleware', function () {
            return [
                HttpMiddleware\InjectActorReference::class,
                'flarum.forum.error_handler',
                HttpMiddleware\ParseJsonBody::class,
                HttpMiddleware\CollectGarbage::class,
                HttpMiddleware\StartSession::class,
                HttpMiddleware\RememberFromCookie::class,
                HttpMiddleware\AuthenticateWithSession::class,
                HttpMiddleware\SetLocale::class,
                'flarum.forum.route_resolver',
                'flarum.forum.check_for_maintenance',
                HttpMiddleware\CheckCsrfToken::class,
                HttpMiddleware\ShareErrorsFromSession::class,
                HttpMiddleware\FlarumPromotionHeader::class,
                HttpMiddleware\ReferrerPolicyHeader::class,
                HttpMiddleware\ContentTypeOptionsHeader::class
            ];
        });

        $this->container->bind('flarum.forum.error_handler', function (Container $container) {
            return new HttpMiddleware\HandleErrors(
                $container->make(Registry::class),
                $container['flarum.config']->inDebugMode() ? $container->make(WhoopsFormatter::class) : $container->make(ViewFormatter::class),
                $container->tagged(Reporter::class)
            );
        });

        $this->container->bind('flarum.forum.route_resolver', function (Container $container) {
            return new HttpMiddleware\ResolveRoute($container->make('flarum.forum.routes'));
        });

        $this->container->bind('flarum.forum.check_for_maintenance', function (Container $container) {
            return new HttpMiddleware\CheckForMaintenanceMode(
                $container->make(MaintenanceMode::class),
                $container->make('flarum.forum.maintenance_route_exclusions')
            );
        });

        $this->container->singleton('flarum.forum.maintenance_route_exclusions', function () {
            return ['login', 'maintenance.login'];
        });

        $this->container->singleton('flarum.forum.handler', function (Container $container) {
            $pipe = new MiddlewarePipe;

            foreach ($container->make('flarum.forum.middleware') as $middleware) {
                $pipe->pipe($container->make($middleware));
            }

            $pipe->pipe(new HttpMiddleware\ExecuteRoute());

            return $pipe;
        });

        $this->container->bind('flarum.assets.forum', function (Container $container) {
            /** @var Assets $assets */
            $assets = $container->make('flarum.assets.factory')('forum');

            $assets->js(function (SourceCollector $sources) use ($container) {
                $sources->addFile(__DIR__.'/../../js/dist/forum.js');
                $sources->addString(function () use ($container) {
                    return $container->make(Formatter::class)->getJs();
                });
            });

            $assets->jsDirectory(function (SourceCollector $sources) {
                $sources->addDirectory(__DIR__.'/../../js/dist/forum', 'core');
            });

            $assets->css(function (SourceCollector $sources) use ($container) {
                $sources->addFile(__DIR__.'/../../less/forum.less');
                $sources->addString(function () use ($container) {
                    return $container->make(SettingsRepositoryInterface::class)->get('custom_less', '');
                }, 'custom_less');
            });

            $container->make(AddTranslations::class)->forFrontend('forum')->to($assets);
            $container->make(AddLocaleAssets::class)->to($assets);

            return $assets;
        });

        $this->container->afterResolving(AssetManager::class, function (AssetManager $assets) {
            $assets->register('forum', 'flarum.assets.forum');
        });

        $this->container->bind('flarum.frontend.forum', function (Container $container, array $parameters = []) {
            /** @var Frontend $frontend */
            $frontend = $container->make('flarum.frontend.factory')('forum');

            if (isset($parameters['content'])) {
                $frontend->content(is_callable($parameters['content']) ? $parameters['content'] : $container->make($parameters['content']), 100);
            }

            return $frontend;
        });

        $this->container->singleton('flarum.forum.discussions.sortmap', function () {
            return [
                'latest' => '-lastPostedAt',
                'top' => '-commentCount',
                'newest' => '-createdAt',
                'oldest' => 'createdAt'
            ];
        });
    }

    public function boot(Container $container, Dispatcher $events, Factory $view): void
    {
        $this->loadViewsFrom(__DIR__.'/../../views', 'flarum.forum');

        $view->share([
            'translator' => $container->make(TranslatorInterface::class),
            'settings' => $container->make(SettingsRepositoryInterface::class),
            'formatter' => $container->make(Formatter::class),
        ]);

        $events->listen(
            [Enabled::class, Disabled::class, ClearingCache::class],
            function () use ($container) {
                $recompile = new RecompileFrontendAssets(
                    $container->make('flarum.assets.forum'),
                    $container->make(LocaleManager::class)
                );
                $recompile->flush();
            }
        );

        $events->listen(
            Saved::class,
            function (Saved $event) use ($container) {
                $validator = new ValidateCustomLess(
                    $container->make('flarum.assets.forum'),
                    $container->make('flarum.locales'),
                    $container,
                    $container->make(SettingsRepositoryInterface::class),
                    $container->make('flarum.less.config'),
                );
                $validator->whenSettingsSaved($event);
            }
        );

        $events->listen(
            Saving::class,
            function (Saving $event) use ($container) {
                $validator = new ValidateCustomLess(
                    $container->make('flarum.assets.forum'),
                    $container->make('flarum.locales'),
                    $container,
                    $container->make(SettingsRepositoryInterface::class),
                    $container->make('flarum.less.config'),
                );
                $validator->whenSettingsSaving($event);
            }
        );
    }

    protected function populateRoutes(RouteCollection $routes, Container $container): void
    {
        $factory = $container->make(RouteHandlerFactory::class);

        $callback = include __DIR__.'/routes.php';
        $callback($routes, $factory);
    }

    protected function setDefaultRoute(RouteCollection $routes, Container $container): void
    {
        $factory = $container->make(RouteHandlerFactory::class);
        $defaultRoute = $container->make('flarum.settings')->get('default_route');

        if (isset($routes->getRouteData()[0]['GET'][$defaultRoute]['handler'])) {
            $toDefaultController = $routes->getRouteData()[0]['GET'][$defaultRoute]['handler'];
        } else {
            $toDefaultController = $factory->toForum(Content\Index::class);
        }

        $routes->get(
            '/',
            'default',
            $toDefaultController
        );
    }
}
