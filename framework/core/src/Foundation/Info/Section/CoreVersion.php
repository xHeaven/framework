<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Flarum\Foundation\Info\Section;

use Flarum\Foundation\Application;
use Flarum\Foundation\Info\Concerns\PackageVersionFromPath;
use Flarum\Foundation\Info\RendererInterface;
use Flarum\Foundation\Info\SectionInterface;

class CoreVersion implements SectionInterface
{
    use PackageVersionFromPath;

    public function __invoke(RendererInterface $renderer): void
    {
        $renderer->keyValue(
            'Flarum Core',
            $this->findPackageVersion(__DIR__.'/../../../../', Application::VERSION)
        );
    }
}
