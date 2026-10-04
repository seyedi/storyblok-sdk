# Typed models for the StoryblokSdk SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class AssetRequired(TypedDict):
    alt: str | None
    asset_folder_id: int | None
    content_length: int | None
    content_type: str | None
    copyright: str | None
    created_at: str | None
    expire_at: str | None
    filename: str
    focus: str | None
    is_private: bool
    title: str | None
    updated_at: str | None


class Asset(AssetRequired, total=False):
    signed_url: str | None


class AssetLoadMatch(TypedDict):
    filename: str
    token: str


class DataSourceRequired(TypedDict):
    cv: int | None
    datasource: dict
    dimensions: list
    id: int
    name: str
    slug: str


class DataSource(DataSourceRequired, total=False):
    created_at: str
    updated_at: str


class DataSourceLoadMatchRequired(TypedDict):
    id: str
    token: str


class DataSourceLoadMatch(DataSourceLoadMatchRequired, total=False):
    cv: int
    version: str


class DataSourceListMatchRequired(TypedDict):
    token: str


class DataSourceListMatch(DataSourceListMatchRequired, total=False):
    by_id: str
    cv: int
    page: int
    per_page: int
    search: str
    version: str


class DataSourceEntry(TypedDict):
    dimension_value: str | None
    id: int
    name: str
    value: str


class DataSourceEntryListMatchRequired(TypedDict):
    token: str


class DataSourceEntryListMatch(DataSourceEntryListMatchRequired, total=False):
    cv: int
    datasource: str
    dimension: str
    page: int
    per_page: int


class Experiment(TypedDict):
    display_name: str
    id: int
    name: str
    story_ids: list
    variants: list


class ExperimentListMatchRequired(TypedDict):
    token: str


class ExperimentListMatch(ExperimentListMatchRequired, total=False):
    cv: int


class LinkRequired(TypedDict):
    id: int
    is_folder: bool
    is_startpage: bool
    name: str
    parent_id: int
    position: int
    published: bool
    slug: str
    uuid: str


class Link(LinkRequired, total=False):
    alternates: list
    created_at: str | None
    path: str | None
    published_at: str | None
    real_path: str | None
    updated_at: str | None


class LinkLoadMatchRequired(TypedDict):
    token: str


class LinkLoadMatch(LinkLoadMatchRequired, total=False):
    by_uuid: str
    cv: int
    include_date: str
    page: int
    paginated: str
    per_page: int
    starts_with: str
    version: str
    with_parent: str
    id: str


class Space(TypedDict):
    domain: str
    id: int
    language_codes: list
    name: str
    version: int


class SpaceLoadMatchRequired(TypedDict):
    token: str


class SpaceLoadMatch(SpaceLoadMatchRequired, total=False):
    version: str


class StoryRequired(TypedDict):
    cv: int
    stories: list
    story: Any


class Story(StoryRequired, total=False):
    id: str
    link_uuids: list
    links: list
    rel_uuids: list
    rels: list


class StoryLoadMatchRequired(TypedDict):
    id: str
    token: str


class StoryLoadMatch(StoryLoadMatchRequired, total=False):
    content_type: str
    cv: int
    excluding_field: str
    excluding_story_field: str
    fallback_lang: str
    find_by: str
    from_release: str
    language: str
    resolve_asset: int
    resolve_level: int
    resolve_link: str
    resolve_links_level: int
    resolve_relation: str
    version: str


class StoryListMatchRequired(TypedDict):
    token: str


class StoryListMatch(StoryListMatchRequired, total=False):
    by_id: str
    by_slug: str
    by_uuid: str
    by_uuids_ordered: str
    content_type: str
    cv: int
    excluding_field: str
    excluding_id: str
    excluding_slug: str
    excluding_story_field: str
    fallback_lang: str
    filter_query: dict
    first_published_at_gt: str
    first_published_at_gte: str
    first_published_at_lt: str
    first_published_at_lte: str
    from_release: str
    in_workflow_stage: str
    is_startpage: int
    language: str
    level: int
    only_variant: str
    page: int
    per_page: int
    published_at_gt: str
    published_at_gte: str
    published_at_lt: str
    published_at_lte: str
    resolve_asset: int
    resolve_level: int
    resolve_link: str
    resolve_links_level: int
    resolve_relation: str
    search_term: str
    sort_by: str
    starts_with: str
    updated_at_gt: str
    updated_at_gte: str
    updated_at_lt: str
    updated_at_lte: str
    version: str
    with_tag: str


class TagRequired(TypedDict):
    name: str


class Tag(TagRequired, total=False):
    tag_on_stories: int
    taggings_count: int


class TagListMatchRequired(TypedDict):
    token: str


class TagListMatch(TagListMatchRequired, total=False):
    filter_query: dict
    starts_with: str
    version: str


class TaxonomyRequired(TypedDict):
    created_at: str
    cv: int | None
    description: str | None
    display_name: str
    id: str
    last_author: dict | None
    last_author_id: str | None
    name: str
    parent_id: str | None
    taxonomy: dict
    updated_at: str


class Taxonomy(TaxonomyRequired, total=False):
    associated_content: list
    children: list
    last_activity_at: str
    terms_count: int


class TaxonomyLoadMatch(TypedDict):
    id: str
    token: str


class TaxonomyListMatch(TypedDict):
    token: str


class TaxonomyTermRequired(TypedDict):
    cv: int | None
    taxonomy_term: dict


class TaxonomyTerm(TaxonomyTermRequired, total=False):
    id: str


class TaxonomyTermLoadMatch(TypedDict):
    id: str
    token: str
