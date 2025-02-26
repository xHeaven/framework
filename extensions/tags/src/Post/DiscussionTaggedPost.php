<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Flarum\Tags\Post;

use Carbon\Carbon;
use Flarum\Post\AbstractEventPost;
use Flarum\Post\MergeableInterface;
use Flarum\Post\Post;

class DiscussionTaggedPost extends AbstractEventPost implements MergeableInterface
{
    public static string $type = 'discussionTagged';

    public function saveAfter(?Post $previous = null): static
    {
        // If the previous post is another 'discussion tagged' post, and it's
        // by the same user, then we can merge this post into it. If we find
        // that we've in fact reverted the tag changes, delete it. Otherwise,
        // update its content.
        if ($previous instanceof static && $this->user_id === $previous->user_id) {
            if ($previous->content[0] == $this->content[1]) {
                $previous->delete();
            } else {
                $previous->content = static::buildContent($previous->content[0], $this->content[1]);
                $previous->created_at = $this->created_at;

                $previous->save();
            }

            return $previous;
        }

        $this->save();

        // Create mentions of the tags so that we can load them when rendering.
        $this->mentionsTags()->sync(
            array_merge($this->content[0], $this->content[1])
        );

        return $this;
    }

    public static function reply(int $discussionId, int $userId, array $oldTagIds, array $newTagIds): static
    {
        $post = new static;

        $post->content = static::buildContent($oldTagIds, $newTagIds);
        $post->created_at = Carbon::now();
        $post->discussion_id = $discussionId;
        $post->user_id = $userId;

        return $post;
    }

    public static function buildContent(array $oldTagIds, array $newTagIds): array
    {
        return [array_map(intval(...), $oldTagIds), array_map(intval(...), $newTagIds)];
    }
}
