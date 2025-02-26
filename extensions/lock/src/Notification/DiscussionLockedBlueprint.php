<?php

/*
 * This file is part of Flarum.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace Flarum\Lock\Notification;

use Flarum\Database\AbstractModel;
use Flarum\Discussion\Discussion;
use Flarum\Lock\Post\DiscussionLockedPost;
use Flarum\Notification\AlertableInterface;
use Flarum\Notification\Blueprint\BlueprintInterface;
use Flarum\User\User;

class DiscussionLockedBlueprint implements BlueprintInterface, AlertableInterface
{
    public function __construct(
        protected DiscussionLockedPost $post
    ) {
    }

    public function getFromUser(): ?User
    {
        return $this->post->user;
    }

    public function getSubject(): ?AbstractModel
    {
        return $this->post->discussion;
    }

    public function getData(): array
    {
        return ['postNumber' => (int) $this->post->number];
    }

    public static function getType(): string
    {
        return 'discussionLocked';
    }

    public static function getSubjectModel(): string
    {
        return Discussion::class;
    }
}
