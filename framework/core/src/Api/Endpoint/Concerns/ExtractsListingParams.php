<?php

namespace Flarum\Api\Endpoint\Concerns;

use Closure;
use Flarum\Http\RequestUtil;
use Tobyz\JsonApiServer\Context;
use Tobyz\JsonApiServer\Pagination\Pagination;
use Tobyz\JsonApiServer\Schema\Sort;

trait ExtractsListingParams
{
    protected ?Closure $extractFilterCallback = null;
    protected ?Closure $extractSortCallback = null;
    protected ?Closure $extractLimitCallback = null;
    protected ?Closure $extractOffsetCallback = null;

    public int $limit = 20;
    public int $maxLimit = 50;
    public ?string $defaultSort = null;

    public function limit(int $limit): static
    {
        $this->limit = $limit;
        return $this;
    }

    public function maxLimit(int $maxLimit): static
    {
        $this->maxLimit = $maxLimit;
        return $this;
    }

    public function extractFilter(Closure $callback): self
    {
        $this->extractFilterCallback = $callback;
        return $this;
    }

    public function extractSort(Closure $callback): self
    {
        $this->extractSortCallback = $callback;
        return $this;
    }

    public function extractLimit(Closure $callback): self
    {
        $this->extractLimitCallback = $callback;
        return $this;
    }

    public function extractOffset(Closure $callback): self
    {
        $this->extractOffsetCallback = $callback;
        return $this;
    }

    public function extractFilterValue(Context $context, array $defaultExtracts): array
    {
        return $this->extractFilterCallback
            ? ($this->extractFilterCallback)($context, $defaultExtracts)
            : $defaultExtracts['filter'];
    }

    public function extractSortValue(Context $context, array $defaultExtracts): ?array
    {
        $visibleSorts = $this->getAvailableSorts($context);

        return $this->extractSortCallback
            ? ($this->extractSortCallback)($context, $defaultExtracts, $visibleSorts)
            : $defaultExtracts['sort'];
    }

    public function extractLimitValue(Context $context, array $defaultExtracts): ?int
    {
        return $this->extractLimitCallback
            ? ($this->extractLimitCallback)($context, $defaultExtracts)
            : $defaultExtracts['limit'];
    }

    public function extractOffsetValue(Context $context, array $defaultExtracts): int
    {
        return $this->extractOffsetCallback
            ? ($this->extractOffsetCallback)($context, $defaultExtracts)
            : $defaultExtracts['offset'];
    }

    public function defaultExtracts(Context $context): array
    {
        return [
            'filter' => RequestUtil::extractFilter($context->request),
            'sort' => RequestUtil::extractSort($context->request, $this->defaultSort, $this->getAvailableSorts($context)),
            'limit' => $limit = (RequestUtil::extractLimit($context->request, $this->limit, $this->maxLimit) ?? -1),
            'offset' => RequestUtil::extractOffset($context->request, $limit),
        ];
    }

    public function getAvailableSorts(Context $context): array
    {
        $asc = collect($context->collection->resolveSorts())
            ->filter(fn (Sort $field) => $field->isVisible($context))
            ->pluck('name')
            ->toArray();

        $desc = array_map(fn ($field) => "-$field", $asc);

        return array_merge($asc, $desc);
    }
}