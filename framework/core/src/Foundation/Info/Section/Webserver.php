<?php

namespace Flarum\Foundation\Info\Section;

use Flarum\Foundation\Info\RendererInterface;
use Flarum\Foundation\Info\SectionInterface;
use Flarum\Settings\SettingsRepositoryInterface;

class Webserver implements SectionInterface
{
    public function __construct(protected SettingsRepositoryInterface $settings)
    {
    }

    public function __invoke(RendererInterface $renderer): void
    {
        $renderer->keyValue(
            'Web user',
            $this->settings->get('core.debug.web_user') ?? 'visit admin to identify'
        );
    }
}
