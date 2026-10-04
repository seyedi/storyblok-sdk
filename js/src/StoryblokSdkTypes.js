// Typed models for the StoryblokSdk SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} Asset
 * @property {string|null} alt
 * @property {number|null} asset_folder_id
 * @property {number|null} content_length
 * @property {string|null} content_type
 * @property {string|null} copyright
 * @property {string|null} created_at
 * @property {string|null} expire_at
 * @property {string} filename
 * @property {string|null} focus
 * @property {boolean} is_private
 * @property {string|null} [signed_url]
 * @property {string|null} title
 * @property {string|null} updated_at
 */

/**
 * @typedef {Object} AssetLoadMatch
 * @property {string} filename
 * @property {string} token
 */

/**
 * @typedef {Object} DataSource
 * @property {string} [created_at]
 * @property {number|null} cv
 * @property {Object} datasource
 * @property {Array} dimensions
 * @property {number} id
 * @property {string} name
 * @property {string} slug
 * @property {string} [updated_at]
 */

/**
 * @typedef {Object} DataSourceLoadMatch
 * @property {string} id
 * @property {number} [cv]
 * @property {string} token
 * @property {string} [version]
 */

/**
 * @typedef {Object} DataSourceListMatch
 * @property {string} [by_id]
 * @property {number} [cv]
 * @property {number} [page]
 * @property {number} [per_page]
 * @property {string} [search]
 * @property {string} token
 * @property {string} [version]
 */

/**
 * @typedef {Object} DataSourceEntry
 * @property {string|null} dimension_value
 * @property {number} id
 * @property {string} name
 * @property {string} value
 */

/**
 * @typedef {Object} DataSourceEntryListMatch
 * @property {number} [cv]
 * @property {string} [datasource]
 * @property {string} [dimension]
 * @property {number} [page]
 * @property {number} [per_page]
 * @property {string} token
 */

/**
 * @typedef {Object} Experiment
 * @property {string} display_name
 * @property {number} id
 * @property {string} name
 * @property {Array} story_ids
 * @property {Array} variants
 */

/**
 * @typedef {Object} ExperimentListMatch
 * @property {number} [cv]
 * @property {string} token
 */

/**
 * @typedef {Object} Link
 * @property {Array} [alternates]
 * @property {string|null} [created_at]
 * @property {number} id
 * @property {boolean} is_folder
 * @property {boolean} is_startpage
 * @property {string} name
 * @property {number} parent_id
 * @property {string|null} [path]
 * @property {number} position
 * @property {boolean} published
 * @property {string|null} [published_at]
 * @property {string|null} [real_path]
 * @property {string} slug
 * @property {string|null} [updated_at]
 * @property {string} uuid
 */

/**
 * @typedef {Object} LinkLoadMatch
 * @property {string} [by_uuid]
 * @property {number} [cv]
 * @property {string} [include_date]
 * @property {number} [page]
 * @property {string} [paginated]
 * @property {number} [per_page]
 * @property {string} [starts_with]
 * @property {string} token
 * @property {string} [version]
 * @property {string} [with_parent]
 * @property {string} [id]
 */

/**
 * @typedef {Object} Space
 * @property {string} domain
 * @property {number} id
 * @property {Array} language_codes
 * @property {string} name
 * @property {number} version
 */

/**
 * @typedef {Object} SpaceLoadMatch
 * @property {string} token
 * @property {string} [version]
 */

/**
 * @typedef {Object} Story
 * @property {number} cv
 * @property {string} [id]
 * @property {Array} [link_uuids]
 * @property {Array} [links]
 * @property {Array} [rel_uuids]
 * @property {Array} [rels]
 * @property {Array} stories
 * @property {*} story
 */

/**
 * @typedef {Object} StoryLoadMatch
 * @property {string} id
 * @property {string} [content_type]
 * @property {number} [cv]
 * @property {string} [excluding_field]
 * @property {string} [excluding_story_field]
 * @property {string} [fallback_lang]
 * @property {string} [find_by]
 * @property {string} [from_release]
 * @property {string} [language]
 * @property {number} [resolve_asset]
 * @property {number} [resolve_level]
 * @property {string} [resolve_link]
 * @property {number} [resolve_links_level]
 * @property {string} [resolve_relation]
 * @property {string} token
 * @property {string} [version]
 */

/**
 * @typedef {Object} StoryListMatch
 * @property {string} [by_id]
 * @property {string} [by_slug]
 * @property {string} [by_uuid]
 * @property {string} [by_uuids_ordered]
 * @property {string} [content_type]
 * @property {number} [cv]
 * @property {string} [excluding_field]
 * @property {string} [excluding_id]
 * @property {string} [excluding_slug]
 * @property {string} [excluding_story_field]
 * @property {string} [fallback_lang]
 * @property {Object} [filter_query]
 * @property {string} [first_published_at_gt]
 * @property {string} [first_published_at_gte]
 * @property {string} [first_published_at_lt]
 * @property {string} [first_published_at_lte]
 * @property {string} [from_release]
 * @property {string} [in_workflow_stage]
 * @property {number} [is_startpage]
 * @property {string} [language]
 * @property {number} [level]
 * @property {string} [only_variant]
 * @property {number} [page]
 * @property {number} [per_page]
 * @property {string} [published_at_gt]
 * @property {string} [published_at_gte]
 * @property {string} [published_at_lt]
 * @property {string} [published_at_lte]
 * @property {number} [resolve_asset]
 * @property {number} [resolve_level]
 * @property {string} [resolve_link]
 * @property {number} [resolve_links_level]
 * @property {string} [resolve_relation]
 * @property {string} [search_term]
 * @property {string} [sort_by]
 * @property {string} [starts_with]
 * @property {string} token
 * @property {string} [updated_at_gt]
 * @property {string} [updated_at_gte]
 * @property {string} [updated_at_lt]
 * @property {string} [updated_at_lte]
 * @property {string} [version]
 * @property {string} [with_tag]
 */

/**
 * @typedef {Object} Tag
 * @property {string} name
 * @property {number} [tag_on_stories]
 * @property {number} [taggings_count]
 */

/**
 * @typedef {Object} TagListMatch
 * @property {Object} [filter_query]
 * @property {string} [starts_with]
 * @property {string} token
 * @property {string} [version]
 */

/**
 * @typedef {Object} Taxonomy
 * @property {Array} [associated_content]
 * @property {Array} [children]
 * @property {string} created_at
 * @property {number|null} cv
 * @property {string|null} description
 * @property {string} display_name
 * @property {string} id
 * @property {string} [last_activity_at]
 * @property {Object|null} last_author
 * @property {string|null} last_author_id
 * @property {string} name
 * @property {string|null} parent_id
 * @property {Object} taxonomy
 * @property {number} [terms_count]
 * @property {string} updated_at
 */

/**
 * @typedef {Object} TaxonomyLoadMatch
 * @property {string} id
 * @property {string} token
 */

/**
 * @typedef {Object} TaxonomyListMatch
 * @property {string} token
 */

/**
 * @typedef {Object} TaxonomyTerm
 * @property {number|null} cv
 * @property {string} [id]
 * @property {Object} taxonomy_term
 */

/**
 * @typedef {Object} TaxonomyTermLoadMatch
 * @property {string} id
 * @property {string} token
 */

