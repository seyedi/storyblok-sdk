export interface Asset {
    alt: string | null;
    asset_folder_id: number | null;
    content_length: number | null;
    content_type: string | null;
    copyright: string | null;
    created_at: string | null;
    expire_at: string | null;
    filename: string;
    focus: string | null;
    is_private: boolean;
    signed_url?: string | null;
    title: string | null;
    updated_at: string | null;
}
export interface AssetLoadMatch {
    filename: string;
    token: string;
    $action?: string;
    [action: string]: any;
}
export interface DataSource {
    created_at?: string;
    cv: number | null;
    datasource: Record<string, any>;
    dimensions: any[];
    id: number;
    name: string;
    slug: string;
    updated_at?: string;
}
export interface DataSourceLoadMatch {
    id: string;
    cv?: number;
    token: string;
    version?: string;
}
export interface DataSourceListMatch {
    by_id?: string;
    cv?: number;
    page?: number;
    per_page?: number;
    search?: string;
    token: string;
    version?: string;
}
export interface DataSourceEntry {
    dimension_value: string | null;
    id: number;
    name: string;
    value: string;
}
export interface DataSourceEntryListMatch {
    cv?: number;
    datasource?: string;
    dimension?: string;
    page?: number;
    per_page?: number;
    token: string;
}
export interface Experiment {
    display_name: string;
    id: number;
    name: string;
    story_ids: any[];
    variants: any[];
}
export interface ExperimentListMatch {
    cv?: number;
    token: string;
}
export interface Link {
    alternates?: any[];
    created_at?: string | null;
    id: number;
    is_folder: boolean;
    is_startpage: boolean;
    name: string;
    parent_id: number;
    path?: string | null;
    position: number;
    published: boolean;
    published_at?: string | null;
    real_path?: string | null;
    slug: string;
    updated_at?: string | null;
    uuid: string;
}
export interface LinkLoadMatch {
    by_uuid?: string;
    cv?: number;
    include_date?: string;
    page?: number;
    paginated?: string;
    per_page?: number;
    starts_with?: string;
    token: string;
    version?: string;
    with_parent?: string;
    id?: string;
}
export interface Space {
    domain: string;
    id: number;
    language_codes: any[];
    name: string;
    version: number;
}
export interface SpaceLoadMatch {
    token: string;
    version?: string;
    $action?: string;
    [action: string]: any;
}
export interface Story {
    cv: number;
    id?: string;
    link_uuids?: any[];
    links?: any[];
    rel_uuids?: any[];
    rels?: any[];
    stories: any[];
    story: any;
}
export interface StoryLoadMatch {
    id: string;
    content_type?: string;
    cv?: number;
    excluding_field?: string;
    excluding_story_field?: string;
    fallback_lang?: string;
    find_by?: string;
    from_release?: string;
    language?: string;
    resolve_asset?: number;
    resolve_level?: number;
    resolve_link?: string;
    resolve_links_level?: number;
    resolve_relation?: string;
    token: string;
    version?: string;
}
export interface StoryListMatch {
    by_id?: string;
    by_slug?: string;
    by_uuid?: string;
    by_uuids_ordered?: string;
    content_type?: string;
    cv?: number;
    excluding_field?: string;
    excluding_id?: string;
    excluding_slug?: string;
    excluding_story_field?: string;
    fallback_lang?: string;
    filter_query?: Record<string, any>;
    first_published_at_gt?: string;
    first_published_at_gte?: string;
    first_published_at_lt?: string;
    first_published_at_lte?: string;
    from_release?: string;
    in_workflow_stage?: string;
    is_startpage?: number;
    language?: string;
    level?: number;
    only_variant?: string;
    page?: number;
    per_page?: number;
    published_at_gt?: string;
    published_at_gte?: string;
    published_at_lt?: string;
    published_at_lte?: string;
    resolve_asset?: number;
    resolve_level?: number;
    resolve_link?: string;
    resolve_links_level?: number;
    resolve_relation?: string;
    search_term?: string;
    sort_by?: string;
    starts_with?: string;
    token: string;
    updated_at_gt?: string;
    updated_at_gte?: string;
    updated_at_lt?: string;
    updated_at_lte?: string;
    version?: string;
    with_tag?: string;
}
export interface Tag {
    name: string;
    tag_on_stories?: number;
    taggings_count?: number;
}
export interface TagListMatch {
    filter_query?: Record<string, any>;
    starts_with?: string;
    token: string;
    version?: string;
}
export interface Taxonomy {
    associated_content?: any[];
    children?: any[];
    created_at: string;
    cv: number | null;
    description: string | null;
    display_name: string;
    id: string;
    last_activity_at?: string;
    last_author: Record<string, any> | null;
    last_author_id: string | null;
    name: string;
    parent_id: string | null;
    taxonomy: Record<string, any>;
    terms_count?: number;
    updated_at: string;
}
export interface TaxonomyLoadMatch {
    id: string;
    token: string;
}
export interface TaxonomyListMatch {
    token: string;
}
export interface TaxonomyTerm {
    cv: number | null;
    id?: string;
    taxonomy_term: Record<string, any>;
}
export interface TaxonomyTermLoadMatch {
    id: string;
    token: string;
}
