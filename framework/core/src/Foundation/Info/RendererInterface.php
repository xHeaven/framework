<?php

namespace Flarum\Foundation\Info;

interface RendererInterface
{
    public function heading(string $title): void;

    public function keyValue(string $key, mixed $value): void;

    public function table(array $headers, array $rows): void;

    public function open(): void;

    public function close(): void;

}
