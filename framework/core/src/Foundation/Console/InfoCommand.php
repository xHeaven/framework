<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Flarum\Foundation\Console;

use Flarum\Console\AbstractCommand;
use Flarum\Extension\ExtensionManager;
use Flarum\Foundation\Application;
use Flarum\Foundation\ApplicationInfoProvider;
use Flarum\Foundation\Config;
use Flarum\Foundation\Info\Renderer\CliRenderer;
use Flarum\Foundation\Info\Report;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Container\Container;
use Illuminate\Database\ConnectionInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\Table;
use Symfony\Component\Console\Helper\TableStyle;

class InfoCommand extends AbstractCommand
{
    public function __construct(
        protected Container $container
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->setName('info')
            ->setDescription("Gather information about Flarum's core and installed extensions");
    }

    protected function fire(): int
    {
        $report = new Report(
            new CliRenderer($this->output),
            $this->container
        );

        $report->render();

        return Command::SUCCESS;
    }
}
