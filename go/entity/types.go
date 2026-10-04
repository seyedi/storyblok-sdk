// Typed models for the StoryblokSdk SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/storyblok-sdk/go/core"
)

// Asset is the typed data model for the asset entity.
type Asset struct {
}

// AssetLoadMatch is the typed request payload for Asset.LoadTyped.
type AssetLoadMatch struct {
	Filename string `json:"filename"`
	Token string `json:"token"`
}

// DataSource is the typed data model for the data_source entity.
type DataSource struct {
}

// DataSourceLoadMatch is the typed request payload for DataSource.LoadTyped.
type DataSourceLoadMatch struct {
	Id string `json:"id"`
	Cv *int `json:"cv,omitempty"`
	Token string `json:"token"`
	Version *string `json:"version,omitempty"`
}

// DataSourceListMatch is the typed request payload for DataSource.ListTyped.
type DataSourceListMatch struct {
	ById *string `json:"by_id,omitempty"`
	Cv *int `json:"cv,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	Search *string `json:"search,omitempty"`
	Token string `json:"token"`
	Version *string `json:"version,omitempty"`
}

// DataSourceEntry is the typed data model for the data_source_entry entity.
type DataSourceEntry struct {
}

// DataSourceEntryListMatch is the typed request payload for DataSourceEntry.ListTyped.
type DataSourceEntryListMatch struct {
	Cv *int `json:"cv,omitempty"`
	Datasource *string `json:"datasource,omitempty"`
	Dimension *string `json:"dimension,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	Token string `json:"token"`
}

// Experiment is the typed data model for the experiment entity.
type Experiment struct {
}

// ExperimentListMatch is the typed request payload for Experiment.ListTyped.
type ExperimentListMatch struct {
	Cv *int `json:"cv,omitempty"`
	Token string `json:"token"`
}

// Link is the typed data model for the link entity.
type Link struct {
}

// LinkLoadMatch is the typed request payload for Link.LoadTyped.
type LinkLoadMatch struct {
	ByUuid *string `json:"by_uuid,omitempty"`
	Cv *int `json:"cv,omitempty"`
	IncludeDate *string `json:"include_date,omitempty"`
	Page *int `json:"page,omitempty"`
	Paginated *string `json:"paginated,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	StartsWith *string `json:"starts_with,omitempty"`
	Token string `json:"token"`
	Version *string `json:"version,omitempty"`
	WithParent *string `json:"with_parent,omitempty"`
	Id *string `json:"id,omitempty"`
}

// Space is the typed data model for the space entity.
type Space struct {
}

// SpaceLoadMatch is the typed request payload for Space.LoadTyped.
type SpaceLoadMatch struct {
	Token string `json:"token"`
	Version *string `json:"version,omitempty"`
}

// Story is the typed data model for the story entity.
type Story struct {
}

// StoryLoadMatch is the typed request payload for Story.LoadTyped.
type StoryLoadMatch struct {
	Id string `json:"id"`
	ContentType *string `json:"content_type,omitempty"`
	Cv *int `json:"cv,omitempty"`
	ExcludingField *string `json:"excluding_field,omitempty"`
	ExcludingStoryField *string `json:"excluding_story_field,omitempty"`
	FallbackLang *string `json:"fallback_lang,omitempty"`
	FindBy *string `json:"find_by,omitempty"`
	FromRelease *string `json:"from_release,omitempty"`
	Language *string `json:"language,omitempty"`
	ResolveAsset *int `json:"resolve_asset,omitempty"`
	ResolveLevel *int `json:"resolve_level,omitempty"`
	ResolveLink *string `json:"resolve_link,omitempty"`
	ResolveLinksLevel *int `json:"resolve_links_level,omitempty"`
	ResolveRelation *string `json:"resolve_relation,omitempty"`
	Token string `json:"token"`
	Version *string `json:"version,omitempty"`
}

// StoryListMatch is the typed request payload for Story.ListTyped.
type StoryListMatch struct {
	ById *string `json:"by_id,omitempty"`
	BySlug *string `json:"by_slug,omitempty"`
	ByUuid *string `json:"by_uuid,omitempty"`
	ByUuidsOrdered *string `json:"by_uuids_ordered,omitempty"`
	ContentType *string `json:"content_type,omitempty"`
	Cv *int `json:"cv,omitempty"`
	ExcludingField *string `json:"excluding_field,omitempty"`
	ExcludingId *string `json:"excluding_id,omitempty"`
	ExcludingSlug *string `json:"excluding_slug,omitempty"`
	ExcludingStoryField *string `json:"excluding_story_field,omitempty"`
	FallbackLang *string `json:"fallback_lang,omitempty"`
	FilterQuery *map[string]any `json:"filter_query,omitempty"`
	FirstPublishedAtGt *string `json:"first_published_at_gt,omitempty"`
	FirstPublishedAtGte *string `json:"first_published_at_gte,omitempty"`
	FirstPublishedAtLt *string `json:"first_published_at_lt,omitempty"`
	FirstPublishedAtLte *string `json:"first_published_at_lte,omitempty"`
	FromRelease *string `json:"from_release,omitempty"`
	InWorkflowStage *string `json:"in_workflow_stage,omitempty"`
	IsStartpage *int `json:"is_startpage,omitempty"`
	Language *string `json:"language,omitempty"`
	Level *int `json:"level,omitempty"`
	OnlyVariant *string `json:"only_variant,omitempty"`
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	PublishedAtGt *string `json:"published_at_gt,omitempty"`
	PublishedAtGte *string `json:"published_at_gte,omitempty"`
	PublishedAtLt *string `json:"published_at_lt,omitempty"`
	PublishedAtLte *string `json:"published_at_lte,omitempty"`
	ResolveAsset *int `json:"resolve_asset,omitempty"`
	ResolveLevel *int `json:"resolve_level,omitempty"`
	ResolveLink *string `json:"resolve_link,omitempty"`
	ResolveLinksLevel *int `json:"resolve_links_level,omitempty"`
	ResolveRelation *string `json:"resolve_relation,omitempty"`
	SearchTerm *string `json:"search_term,omitempty"`
	SortBy *string `json:"sort_by,omitempty"`
	StartsWith *string `json:"starts_with,omitempty"`
	Token string `json:"token"`
	UpdatedAtGt *string `json:"updated_at_gt,omitempty"`
	UpdatedAtGte *string `json:"updated_at_gte,omitempty"`
	UpdatedAtLt *string `json:"updated_at_lt,omitempty"`
	UpdatedAtLte *string `json:"updated_at_lte,omitempty"`
	Version *string `json:"version,omitempty"`
	WithTag *string `json:"with_tag,omitempty"`
}

// Tag is the typed data model for the tag entity.
type Tag struct {
}

// TagListMatch is the typed request payload for Tag.ListTyped.
type TagListMatch struct {
	FilterQuery *map[string]any `json:"filter_query,omitempty"`
	StartsWith *string `json:"starts_with,omitempty"`
	Token string `json:"token"`
	Version *string `json:"version,omitempty"`
}

// Taxonomy is the typed data model for the taxonomy entity.
type Taxonomy struct {
}

// TaxonomyLoadMatch is the typed request payload for Taxonomy.LoadTyped.
type TaxonomyLoadMatch struct {
	Id string `json:"id"`
	Token string `json:"token"`
}

// TaxonomyListMatch is the typed request payload for Taxonomy.ListTyped.
type TaxonomyListMatch struct {
	Token string `json:"token"`
}

// TaxonomyTerm is the typed data model for the taxonomy_term entity.
type TaxonomyTerm struct {
}

// TaxonomyTermLoadMatch is the typed request payload for TaxonomyTerm.LoadTyped.
type TaxonomyTermLoadMatch struct {
	Id string `json:"id"`
	Token string `json:"token"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
