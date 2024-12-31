<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Flarum\Foundation\Info\Section;

use Flarum\Extension\Extension;
use Flarum\Extension\ExtensionManager;
use Flarum\Foundation\Info\Concerns\PackageVersionFromPath;
use Flarum\Foundation\Info\RendererInterface;
use Flarum\Foundation\Info\SectionInterface;

class EnabledExtensions implements SectionInterface
{
    use PackageVersionFromPath;

    public function __construct(protected ExtensionManager $extensions)
    {
    }

    public function __invoke(RendererInterface $renderer): void
    {
        $rows = collect($this->extensions->getEnabledExtensions())
            ->map(fn (Extension $extension) => [
                $extension->getId(),
                $this->findPackageVersion($extension->getPath(), $extension->getVersion())
            ])
            ->toArray();

        $renderer->table([
            ['Flarum Extensions'],
            ['ID', 'Version']
        ], $rows);
    }
}
