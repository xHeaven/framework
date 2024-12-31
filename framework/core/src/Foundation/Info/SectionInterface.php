<?php

namespace Flarum\Foundation\Info;

interface SectionInterface
{
    public function __invoke(RendererInterface $renderer): void;
}
