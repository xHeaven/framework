<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Flarum\Sticky\Post;

use Carbon\Carbon;
use Flarum\Post\AbstractEventPost;
use Flarum\Post\MergeableInterface;
use Flarum\Post\Post;

class DiscussionStickiedPost extends AbstractEventPost implements MergeableInterface
{
    public static string $type = 'discussionStickied';

    public function saveAfter(?Post $previous = null): static
    {
        // If the previous post is another 'discussion stickied' post, and it's
        // by the same user, then we can merge this post into it. If we find
        // that we've in fact reverted the sticky status, delete it. Otherwise,
        // update its content.
        if ($previous instanceof static && $this->user_id === $previous->user_id) {
            if ($previous->content['sticky'] != $this->content['sticky']) {
                $previous->delete();
            } else {
                $previous->content = $this->content;

                $previous->save();
            }

            return $previous;
        }

        $this->save();

        return $this;
    }

    public static function reply(int $discussionId, int $userId, bool $isSticky): static
    {
        $post = new static;

        $post->content = static::buildContent($isSticky);
        $post->created_at = Carbon::now();
        $post->discussion_id = $discussionId;
        $post->user_id = $userId;

        return $post;
    }

    public static function buildContent(bool $isSticky): array
    {
        return ['sticky' => $isSticky];
    }
}
