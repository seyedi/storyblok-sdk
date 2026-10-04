# StoryblokSdk Golang SDK Reference

Complete API reference for the StoryblokSdk Golang SDK.


## StoryblokSdkSDK

### Constructor

```go
func NewStoryblokSdkSDK(options map[string]any) *StoryblokSdkSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *StoryblokSdkSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *StoryblokSdkSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Asset(data map[string]any) StoryblokSdkEntity`

Create a new `Asset` entity instance. Pass `nil` for no initial data.

#### `DataSource(data map[string]any) StoryblokSdkEntity`

Create a new `DataSource` entity instance. Pass `nil` for no initial data.

#### `DataSourceEntry(data map[string]any) StoryblokSdkEntity`

Create a new `DataSourceEntry` entity instance. Pass `nil` for no initial data.

#### `Experiment(data map[string]any) StoryblokSdkEntity`

Create a new `Experiment` entity instance. Pass `nil` for no initial data.

#### `Link(data map[string]any) StoryblokSdkEntity`

Create a new `Link` entity instance. Pass `nil` for no initial data.

#### `Space(data map[string]any) StoryblokSdkEntity`

Create a new `Space` entity instance. Pass `nil` for no initial data.

#### `Story(data map[string]any) StoryblokSdkEntity`

Create a new `Story` entity instance. Pass `nil` for no initial data.

#### `Tag(data map[string]any) StoryblokSdkEntity`

Create a new `Tag` entity instance. Pass `nil` for no initial data.

#### `Taxonomy(data map[string]any) StoryblokSdkEntity`

Create a new `Taxonomy` entity instance. Pass `nil` for no initial data.

#### `TaxonomyTerm(data map[string]any) StoryblokSdkEntity`

Create a new `TaxonomyTerm` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AssetEntity

```go
asset := client.Asset(nil)
fmt.Println(asset.GetName()) // "asset"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alt` | `any` | Yes | Alt text for the asset (default language). |
| `asset_folder_id` | `any` | Yes | Id of the folder that contains this asset. |
| `content_length` | `any` | Yes | The content length in bytes. |
| `content_type` | `any` | Yes | The asset’s MIME type. |
| `copyright` | `any` | Yes | Copyright text. |
| `created_at` | `any` | Yes | Creation timestamp. |
| `expire_at` | `any` | Yes | Expiration timestamp. |
| `filename` | `string` | Yes | Full path of the asset, including the file name. |
| `focus` | `any` | Yes | Focus. |
| `is_private` | `bool` | Yes | Defines if the asset should be inaccessible to the public. |
| `signed_url` | `any` | No | The signed URL for the asset. |
| `title` | `any` | Yes | Title of the asset. |
| `updated_at` | `any` | Yes | Latest update timestamp. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Asset(nil).Load(map[string]any{"filename": "filename", "token": "token"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AssetEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DataSourceEntity

```go
dataSource := client.DataSource(nil)
fmt.Println(dataSource.GetName()) // "data_source"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Creation timestamp. |
| `cv` | `any` | Yes | Cached version Unix timestamp. |
| `datasource` | `map[string]any` | Yes | A single data source object. |
| `dimensions` | `[]any` | Yes | An array listing the dimensions defined for the data source. |
| `id` | `int` | Yes | Data source ID. |
| `name` | `string` | Yes | Data source name. |
| `slug` | `string` | Yes | Data source `slug`. |
| `updated_at` | `string` | No | Latest update timestamp. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.DataSource(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.DataSource(nil).Load(map[string]any{"id": "data_source_id", "token": "token"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DataSourceEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DataSourceEntryEntity

```go
dataSourceEntry := client.DataSourceEntry(nil)
fmt.Println(dataSourceEntry.GetName()) // "data_source_entry"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dimension_value` | `any` | Yes | Entry value (requested dimension). |
| `id` | `int` | Yes | Entry ID. |
| `name` | `string` | Yes | Entry name. |
| `value` | `string` | Yes | Entry value (default dimension). |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.DataSourceEntry(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DataSourceEntryEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ExperimentEntity

```go
experiment := client.Experiment(nil)
fmt.Println(experiment.GetName()) // "experiment"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `display_name` | `string` | Yes | Human-readable display name. |
| `id` | `int` | Yes | Numeric ID of the experiment. |
| `name` | `string` | Yes | Internal name (lowercase letters, numbers, and underscores). |
| `story_ids` | `[]any` | Yes | IDs of [stories](https://www.storyblok.com/docs/api/content-delivery/v2/stories/the-story-object) assigned to the experiment. |
| `variants` | `[]any` | Yes | Variants belonging to the experiment. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Experiment(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ExperimentEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LinkEntity

```go
link := client.Link(nil)
fmt.Println(link.GetName()) // "link"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alternates` | `[]any` | No | An array that contains objects correlating to the language versions defined using [field-level translation](https://www.storyblok.com/docs/concepts/internationalization#field-level-translation). |
| `created_at` | `any` | No | Creation timestamp. |
| `id` | `int` | Yes | Story or folder `id`. |
| `is_folder` | `bool` | Yes | Returns `true` if the item is a folder. |
| `is_startpage` | `bool` | Yes | Returns `true` if the story is the folder’s root. |
| `name` | `string` | Yes | Story or folder name. |
| `parent_id` | `int` | Yes | Parent folder ID. |
| `path` | `any` | No | Real path defined in the story’s entry configuration. |
| `position` | `int` | Yes | Numeric representation of the story’s position in the folder. |
| `published` | `bool` | Yes | Returns `true` if the story is currently published. |
| `published_at` | `any` | No | Latest publication timestamp. |
| `real_path` | `any` | No | Either the full slug of the story or folder with a leading `/`, or the value of the real path defined in the story’s entry configuration with a leading `/`. |
| `slug` | `string` | Yes | Story or folder full slug. |
| `updated_at` | `any` | No | Latest update timestamp. |
| `uuid` | `string` | Yes | Story or folder `uuid`. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Link(nil).Load(map[string]any{"id": "link_id", "token": "token"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LinkEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SpaceEntity

```go
space := client.Space(nil)
fmt.Println(space.GetName()) // "space"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | Yes | Domain associated with the space (configured under **Visual Editor** → **Location**). |
| `id` | `int` | Yes | Space ID. |
| `language_codes` | `[]any` | Yes | An array of language codes configured in the space. |
| `name` | `string` | Yes | Space name. |
| `version` | `int` | Yes | Cached version Unix timestamp. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Space(nil).Load(map[string]any{"token": "token"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SpaceEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## StoryEntity

```go
story := client.Story(nil)
fmt.Println(story.GetName()) // "story"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cv` | `int` | Yes | Cached version Unix timestamp. |
| `id` | `string` | No |  |
| `link_uuids` | `[]any` | No | An array of all linked stories’ UUIDs. |
| `links` | `[]any` | No | An array of resolved links. |
| `rel_uuids` | `[]any` | No | An array of all referenced stories’ UUIDs. |
| `rels` | `[]any` | No | An array of resolved stories. |
| `stories` | `[]any` | Yes | An array of story objects. |
| `story` | `any` | Yes | The complete story object. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Story(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Story(nil).Load(map[string]any{"id": "story_id", "token": "token"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `StoryEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TagEntity

```go
tag := client.Tag(nil)
fmt.Println(tag.GetName()) // "tag"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes | The tag name. |
| `tag_on_stories` | `int` | No | The number of distinct stories this tag appears on (only present when all_tags parameter is true). |
| `taggings_count` | `int` | No | The number of stories that include this tag. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Tag(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TagEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TaxonomyEntity

```go
taxonomy := client.Taxonomy(nil)
fmt.Println(taxonomy.GetName()) // "taxonomy"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `associated_content` | `[]any` | No | An array of story objects associated with the taxonomy. |
| `children` | `[]any` | No | An array of sub-terms objects. |
| `created_at` | `string` | Yes | Creation timestamp. |
| `cv` | `any` | Yes |  |
| `description` | `any` | Yes | The taxonomy’s description. |
| `display_name` | `string` | Yes | The taxonomy’s name. |
| `id` | `string` | Yes | The taxonomy’s ID. |
| `last_activity_at` | `string` | No | Latest update timestamp. |
| `last_author` | `any` | Yes | An object that contains the details of user who created the term. |
| `last_author_id` | `any` | Yes | The user’s ID. |
| `name` | `string` | Yes | The taxonomy’s technical name. |
| `parent_id` | `any` | Yes | The top-level term’s ID. |
| `taxonomy` | `map[string]any` | Yes | An object that contains a taxonomy. |
| `terms_count` | `int` | No | The number sub-terms (at any depth). |
| `updated_at` | `string` | Yes | Latest update timestamp. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Taxonomy(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Taxonomy(nil).Load(map[string]any{"id": "taxonomy_id", "token": "token"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TaxonomyEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TaxonomyTermEntity

```go
taxonomyTerm := client.TaxonomyTerm(nil)
fmt.Println(taxonomyTerm.GetName()) // "taxonomy_term"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cv` | `any` | Yes |  |
| `id` | `string` | No |  |
| `taxonomy_term` | `map[string]any` | Yes | An object that contains a taxonomy. |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.TaxonomyTerm(nil).Load(map[string]any{"id": "taxonomy_term_id", "token": "token"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TaxonomyTermEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```go
client := sdk.NewStoryblokSdkSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

