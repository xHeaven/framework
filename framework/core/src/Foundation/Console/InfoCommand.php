<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Flarum\Foundation\Console;

use Flarum\Console\AbstractCommand;
use Flarum\Foundation\Info\Renderer\CliRenderer;
use Flarum\Foundation\Info\Report;
use Illuminate\Contracts\Container\Container;
use Symfony\Component\Console\Command\Command;

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
