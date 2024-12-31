<?php

namespace Flarum\Foundation\Info\Section;

use Flarum\Foundation\ApplicationInfoProvider;
use Flarum\Foundation\Info\RendererInterface;
use Flarum\Foundation\Info\SectionInterface;

class Database implements SectionInterface
{
    public function __construct(protected ApplicationInfoProvider $appInfo)
    {
    }

    public function __invoke(RendererInterface $renderer): void
    {
        $renderer->keyValue(
            'Database driver',
            $this->appInfo->identifyDatabaseDriver()
        );

        $renderer->keyValue(
            'Database version',
            $this->appInfo->identifyDatabaseVersion()
        );
    }
}
