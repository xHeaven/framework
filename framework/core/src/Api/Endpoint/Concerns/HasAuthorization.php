<?php

namespace Flarum\Api\Endpoint\Concerns;

use Closure;
use Flarum\Http\RequestUtil;
use Flarum\User\Exception\NotAuthenticatedException;
use Flarum\User\Exception\PermissionDeniedException;
use Tobyz\JsonApiServer\Context;

trait HasAuthorization
{
    /**
     * @var bool|(Closure(mixed, Context): bool)
     */
    protected bool|Closure $authenticated = false;

    /**
     * @var null|string|Closure(mixed, Context): string
     */
    protected null|string|Closure $ability = null;

    public function authenticated(bool|Closure $condition = true): self
    {
        $this->authenticated = $condition;

        return $this;
    }

    public function can(null|string|Closure $ability): self
    {
        $this->ability = $ability;

        return $this;
    }

    public function getAuthenticated(Context $context): bool
    {
        if (is_bool($this->authenticated)) {
            return $this->authenticated;
        }

        return (bool) (isset($context->model)
            ? ($this->authenticated)($context->model, $context)
            : ($this->authenticated)($context));
    }

    public function getAuthorized(Context $context): string|null
    {
        if (! is_callable($this->ability)) {
            return $this->ability;
        }

        return (bool) (isset($context->model)
            ? ($this->ability)($context->model, $context)
            : ($this->ability)($context));
    }

    /**
     * @throws NotAuthenticatedException
     * @throws PermissionDeniedException
     */
    public function isVisible(Context $context): bool
    {
        $actor = RequestUtil::getActor($context->request);

        if ($this->getAuthenticated($context)) {
            $actor->assertRegistered();
        }

        if ($ability = $this->getAuthorized($context)) {
            $actor->assertCan($ability, $context->model);
        }

        return parent::isVisible($context);
    }
}