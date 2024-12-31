<?php

namespace Flarum\Foundation\Info;

use Illuminate\Contracts\Container\Container;

class Report
{
    protected array $sections = [
        Section\CoreVersion::class,
        Section\PHP::class,
        Section\EnabledExtensions::class,
        Section\Features::class,
        Section\Debug::class,
    ];

    public function __construct(
        protected RendererInterface $renderer,
        protected Container $container
    )
    {}

    public function render(): void
    {
        $sections = $this->sections;

        $this->renderer->open();

        foreach($sections as &$section) {
            $section = $this->container->make($section);

            $section($this->renderer);
        }

        $this->renderer->close();
    }
}
