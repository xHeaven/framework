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

class PHP implements SectionInterface
{
    public function __construct(protected ApplicationInfoProvider $appInfo)
    {
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
    }
}
