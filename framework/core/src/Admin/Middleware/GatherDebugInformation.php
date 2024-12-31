<?php

namespace Flarum\Admin\Middleware;

use Flarum\Settings\SettingsRepositoryInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface as Middleware;
use Psr\Http\Server\RequestHandlerInterface as Handler;

class GatherDebugInformation implements Middleware
{
    public function __construct(protected SettingsRepositoryInterface $settings)
    {
    }

    public function process(Request $request, Handler $handler): Response
    {
        // Read current web user, so we can compare that against CLI executions,
        // these often cause file permission issues.
        $user = $this->settings->get('core.debug.web_user');
        $currentUser = get_current_user();
        if ($user !== $currentUser) {
            $this->settings->set(
                "core.web_user",
                $currentUser
            );
        }

        // Read the opcache situation, this is only visible in web.
        $opcache = $this->settings->get('core.debug.opcache_enabled');
        $opcacheStatus = function_exists('opcache_get_configuration')
            && opcache_get_configuration() !== false;
        if ($opcache !== $opcacheStatus) {
            $this->settings->set(
                'core.debug.opcache_enabled',
                $opcacheStatus
            );
        }

        return $handler->handle($request);
    }
}
