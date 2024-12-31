<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Flarum\Foundation\Info\Concerns;

trait PackageVersionFromPath
{
    /**
     * Try to detect a package's exact version.
     *
     * If the package seems to be a Git version, we extract the currently
     * checked out commit using the command line.
     */
    private function findPackageVersion(string $path, ?string $fallback = null): ?string
    {
        if (file_exists("$path/.git")) {
            $cwd = getcwd();
            chdir($path);

            $output = [];
            $status = null;
            exec('git rev-parse HEAD 2>&1', $output, $status);

            chdir($cwd);

            if ($status == 0) {
                return isset($fallback) ? "$fallback ($output[0])" : $output[0];
            }
        }

        return $fallback;
    }
}
