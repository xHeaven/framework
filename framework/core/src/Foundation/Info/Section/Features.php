<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Flarum\Foundation\Info\Section;

use Flarum\Foundation\ApplicationInfoProvider;
use Flarum\Foundation\Info\RendererInterface;
use Flarum\Foundation\Info\SectionInterface;
use Flarum\Mail\NullDriver;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Container\Container;

class Features implements SectionInterface
{
    public function __construct(
        protected ApplicationInfoProvider $appInfo,
        protected SettingsRepositoryInterface $settings,
        protected Container $container
    ) {
    }

    public function __invoke(RendererInterface $renderer): void
    {
        $renderer->keyValue(
            'Scheduler required',
            $this->appInfo->scheduledTasksRegistered() ? 'yes' : 'no'
        );

        $renderer->keyValue(
            'Scheduler status',
            $this->appInfo->getSchedulerStatus(translated: false)
        );

        $renderer->keyValue(
            'Queue driver',
            $this->appInfo->identifyQueueDriver()
        );

        $renderer->keyValue(
            'Session driver',
            $this->appInfo->identifySessionDriver()
        );

        $renderer->keyValue(
            'Mail driver',
            $this->mail()
        );
    }

    protected function mail()
    {
        $driver = $this->container->make('mail.driver');
        $configured = $this->settings->get('mail_driver');

        if ($driver instanceof NullDriver) {
            $configured .= ' (not active)';
        }

        return $configured;
    }
}
