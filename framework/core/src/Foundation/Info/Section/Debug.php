<?php

namespace Flarum\Foundation\Info\Section;

use Flarum\Foundation\Config;
use Flarum\Foundation\Info\RendererInterface;
use Flarum\Foundation\Info\SectionInterface;

class Debug implements SectionInterface
{
    public function __construct(protected Config $config)
    {
    }

    public function __invoke(RendererInterface $renderer): void
    {
        $renderer->keyValue(
            'Debug mode',
            $this->config->inDebugMode() ? 'on' : 'off'
        );

        if ($this->config->inDebugMode()) {
            $renderer->heading("Debug mode should not be enabled in production; this will cause javascript and stylesheets to be recompiled on each visit.");
        }
    }
}
