<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Flarum\Mentions\Formatter;

use Flarum\Database\AbstractModel;
use Flarum\Tags\Tag;
use Psr\Http\Message\ServerRequestInterface as Request;
use s9e\TextFormatter\Renderer;
use s9e\TextFormatter\Utils;

class FormatTagMentions
{
    public function __invoke(Renderer $renderer, mixed $context, string $xml, ?Request $request = null): string
    {
        return Utils::replaceAttributes($xml, 'TAGMENTION', function ($attributes) use ($context) {
            /** @var Tag|null $tag */
            $tag = match (true) {
                $context instanceof AbstractModel && $context->isRelation('mentionsTags') => $context->relationLoaded('mentionsTags')
                    ? $context->mentionsTags->find($attributes['id']) // @phpstan-ignore-line
                    : $context->mentionsTags()->find($attributes['id']), // @phpstan-ignore-line
                default => Tag::query()->find($attributes['id']),
            };

            if ($tag) {
                $attributes['deleted'] = false;
                $attributes['tagname'] = $tag->name;
                $attributes['slug'] = $tag->slug;
                $attributes['color'] = $tag->color ?? '';
                $attributes['icon'] = $tag->icon ?? '';
            } else {
                $attributes['deleted'] = true;
            }

            return $attributes;
        });
    }
}
