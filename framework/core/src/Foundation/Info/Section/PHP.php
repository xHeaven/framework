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
use Flarum\Settings\SettingsRepositoryInterface;

class PHP implements SectionInterface
{
    public function __construct(
        protected ApplicationInfoProvider $appInfo,
        protected SettingsRepositoryInterface $settings
    ) {
    }

    public function __invoke(RendererInterface $renderer): void
    {
        $renderer->keyValue(
            'PHP version',
            $this->appInfo->identifyPHPVersion()
        );

        $renderer->keyValue(
            'PHP extensions',
            implode(', ', get_loaded_extensions())
        );

        $renderer->keyValue(
            'PHP OpCache',
            $this->settings->get('core.debug.opcache') ?? 'visit admin to identify'
        );
    }
}
