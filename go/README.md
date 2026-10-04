# StoryblokSdk Golang SDK



The Golang SDK for the StoryblokSdk API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Asset(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `js`, `py`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/storyblok-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/storyblok-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/storyblok-sdk/go=../storyblok-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/storyblok-sdk/go"
)

func main() {
    client := sdk.NewStoryblokSdkSDK(map[string]any{
        "apikey": os.Getenv("STORYBLOK_SDK_APIKEY"),
    })

    // Load a single asset — the value is the loaded record.
    asset, err := client.Asset(nil).Load(map[string]any{"filename": "example_filename", "token": "example_token"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(asset)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
space, err := client.Space(nil).Load(map[string]any{"token": "example"}, nil)
if err != nil {
    // handle err
    return
}
_ = space
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

space, err := client.Space(nil).Load(
    map[string]any{"token": "example"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(space) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewStoryblokSdkSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
STORYBLOK_SDK_TEST_LIVE=TRUE
STORYBLOK_SDK_APIKEY=<your-key>
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewStoryblokSdkSDK

```go
func NewStoryblokSdkSDK(options map[string]any) *StoryblokSdkSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *StoryblokSdkSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### StoryblokSdkSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Asset` | `(data map[string]any) StoryblokSdkEntity` | Create an Asset entity instance. |
| `DataSource` | `(data map[string]any) StoryblokSdkEntity` | Create a DataSource entity instance. |
| `DataSourceEntry` | `(data map[string]any) StoryblokSdkEntity` | Create a DataSourceEntry entity instance. |
| `Experiment` | `(data map[string]any) StoryblokSdkEntity` | Create an Experiment entity instance. |
| `Link` | `(data map[string]any) StoryblokSdkEntity` | Create a Link entity instance. |
| `Space` | `(data map[string]any) StoryblokSdkEntity` | Create a Space entity instance. |
| `Story` | `(data map[string]any) StoryblokSdkEntity` | Create a Story entity instance. |
| `Tag` | `(data map[string]any) StoryblokSdkEntity` | Create a Tag entity instance. |
| `Taxonomy` | `(data map[string]any) StoryblokSdkEntity` | Create a Taxonomy entity instance. |
| `TaxonomyTerm` | `(data map[string]any) StoryblokSdkEntity` | Create a TaxonomyTerm entity instance. |

### Entity interface (StoryblokSdkEntity)

All entities implement the `StoryblokSdkEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    asset, err := client.Asset(nil).Load(nil, nil)
    if err != nil { /* handle */ }
    // asset is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Asset

| Field | Description |
| --- | --- |
| `"alt"` | Alt text for the asset (default language). |
| `"asset_folder_id"` | Id of the folder that contains this asset. |
| `"content_length"` | The content length in bytes. |
| `"content_type"` | The asset’s MIME type. |
| `"copyright"` | Copyright text. |
| `"created_at"` | Creation timestamp. |
| `"expire_at"` | Expiration timestamp. |
| `"filename"` | Full path of the asset, including the file name. |
| `"focus"` | Focus. |
| `"is_private"` | Defines if the asset should be inaccessible to the public. |
| `"signed_url"` | The signed URL for the asset. |
| `"title"` | Title of the asset. |
| `"updated_at"` | Latest update timestamp. |

Operations: Load.

API path: `/v2/cdn/assets/me`

#### DataSource

| Field | Description |
| --- | --- |
| `"created_at"` | Creation timestamp. |
| `"cv"` | Cached version Unix timestamp. |
| `"datasource"` | A single data source object. |
| `"dimensions"` | An array listing the dimensions defined for the data source. |
| `"id"` | Data source ID. |
| `"name"` | Data source name. |
| `"slug"` | Data source `slug`. |
| `"updated_at"` | Latest update timestamp. |

Operations: List, Load.

API path: `/v2/cdn/datasources`

#### DataSourceEntry

| Field | Description |
| --- | --- |
| `"dimension_value"` | Entry value (requested dimension). |
| `"id"` | Entry ID. |
| `"name"` | Entry name. |
| `"value"` | Entry value (default dimension). |

Operations: List.

API path: `/v2/cdn/datasource_entries`

#### Experiment

| Field | Description |
| --- | --- |
| `"display_name"` | Human-readable display name. |
| `"id"` | Numeric ID of the experiment. |
| `"name"` | Internal name (lowercase letters, numbers, and underscores). |
| `"story_ids"` | IDs of [stories](https://www.storyblok.com/docs/api/content-delivery/v2/stories/the-story-object) assigned to the experiment. |
| `"variants"` | Variants belonging to the experiment. |

Operations: List.

API path: `/v2/cdn/experiments`

#### Link

| Field | Description |
| --- | --- |
| `"alternates"` | An array that contains objects correlating to the language versions defined using [field-level translation](https://www.storyblok.com/docs/concepts/internationalization#field-level-translation). |
| `"created_at"` | Creation timestamp. |
| `"id"` | Story or folder `id`. |
| `"is_folder"` | Returns `true` if the item is a folder. |
| `"is_startpage"` | Returns `true` if the story is the folder’s root. |
| `"name"` | Story or folder name. |
| `"parent_id"` | Parent folder ID. |
| `"path"` | Real path defined in the story’s entry configuration. |
| `"position"` | Numeric representation of the story’s position in the folder. |
| `"published"` | Returns `true` if the story is currently published. |
| `"published_at"` | Latest publication timestamp. |
| `"real_path"` | Either the full slug of the story or folder with a leading `/`, or the value of the real path defined in the story’s entry configuration with a leading `/`. |
| `"slug"` | Story or folder full slug. |
| `"updated_at"` | Latest update timestamp. |
| `"uuid"` | Story or folder `uuid`. |

Operations: Load.

API path: `/v2/cdn/links`

#### Space

| Field | Description |
| --- | --- |
| `"domain"` | Domain associated with the space (configured under **Visual Editor** → **Location**). |
| `"id"` | Space ID. |
| `"language_codes"` | An array of language codes configured in the space. |
| `"name"` | Space name. |
| `"version"` | Cached version Unix timestamp. |

Operations: Load.

API path: `/v2/cdn/spaces/me`

#### Story

| Field | Description |
| --- | --- |
| `"cv"` | Cached version Unix timestamp. |
| `"id"` |  |
| `"link_uuids"` | An array of all linked stories’ UUIDs. |
| `"links"` | An array of resolved links. |
| `"rel_uuids"` | An array of all referenced stories’ UUIDs. |
| `"rels"` | An array of resolved stories. |
| `"stories"` | An array of story objects. |
| `"story"` | The complete story object. |

Operations: List, Load.

API path: `/v2/cdn/stories`

#### Tag

| Field | Description |
| --- | --- |
| `"name"` | The tag name. |
| `"tag_on_stories"` | The number of distinct stories this tag appears on (only present when all_tags parameter is true). |
| `"taggings_count"` | The number of stories that include this tag. |

Operations: List.

API path: `/v2/cdn/tags`

#### Taxonomy

| Field | Description |
| --- | --- |
| `"associated_content"` | An array of story objects associated with the taxonomy. |
| `"children"` | An array of sub-terms objects. |
| `"created_at"` | Creation timestamp. |
| `"cv"` |  |
| `"description"` | The taxonomy’s description. |
| `"display_name"` | The taxonomy’s name. |
| `"id"` | The taxonomy’s ID. |
| `"last_activity_at"` | Latest update timestamp. |
| `"last_author"` | An object that contains the details of user who created the term. |
| `"last_author_id"` | The user’s ID. |
| `"name"` | The taxonomy’s technical name. |
| `"parent_id"` | The top-level term’s ID. |
| `"taxonomy"` | An object that contains a taxonomy. |
| `"terms_count"` | The number sub-terms (at any depth). |
| `"updated_at"` | Latest update timestamp. |

Operations: List, Load.

API path: `/v2/cdn/taxonomies`

#### TaxonomyTerm

| Field | Description |
| --- | --- |
| `"cv"` |  |
| `"id"` |  |
| `"taxonomy_term"` | An object that contains a taxonomy. |

Operations: Load.

API path: `/v2/cdn/taxonomy_terms/{id}`



## Entities


### Asset

Create an instance: `asset := client.Asset(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alt` | `any` | Alt text for the asset (default language). |
| `asset_folder_id` | `any` | Id of the folder that contains this asset. |
| `content_length` | `any` | The content length in bytes. |
| `content_type` | `any` | The asset’s MIME type. |
| `copyright` | `any` | Copyright text. |
| `created_at` | `any` | Creation timestamp. |
| `expire_at` | `any` | Expiration timestamp. |
| `filename` | `string` | Full path of the asset, including the file name. |
| `focus` | `any` | Focus. |
| `is_private` | `bool` | Defines if the asset should be inaccessible to the public. |
| `signed_url` | `any` | The signed URL for the asset. |
| `title` | `any` | Title of the asset. |
| `updated_at` | `any` | Latest update timestamp. |

#### Example: Load

```go
asset, err := client.Asset(nil).Load(map[string]any{"filename": "filename", "token": "token"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(asset) // the loaded record
```


### DataSource

Create an instance: `dataSource := client.DataSource(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | Creation timestamp. |
| `cv` | `any` | Cached version Unix timestamp. |
| `datasource` | `map[string]any` | A single data source object. |
| `dimensions` | `[]any` | An array listing the dimensions defined for the data source. |
| `id` | `int` | Data source ID. |
| `name` | `string` | Data source name. |
| `slug` | `string` | Data source `slug`. |
| `updated_at` | `string` | Latest update timestamp. |

#### Example: Load

```go
dataSource, err := client.DataSource(nil).Load(map[string]any{"id": "data_source_id", "token": "token"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(dataSource) // the loaded record
```

#### Example: List

```go
dataSources, err := client.DataSource(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(dataSources) // the array of records
```


### DataSourceEntry

Create an instance: `dataSourceEntry := client.DataSourceEntry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `dimension_value` | `any` | Entry value (requested dimension). |
| `id` | `int` | Entry ID. |
| `name` | `string` | Entry name. |
| `value` | `string` | Entry value (default dimension). |

#### Example: List

```go
dataSourceEntrys, err := client.DataSourceEntry(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(dataSourceEntrys) // the array of records
```


### Experiment

Create an instance: `experiment := client.Experiment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `display_name` | `string` | Human-readable display name. |
| `id` | `int` | Numeric ID of the experiment. |
| `name` | `string` | Internal name (lowercase letters, numbers, and underscores). |
| `story_ids` | `[]any` | IDs of [stories](https://www.storyblok.com/docs/api/content-delivery/v2/stories/the-story-object) assigned to the experiment. |
| `variants` | `[]any` | Variants belonging to the experiment. |

#### Example: List

```go
experiments, err := client.Experiment(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(experiments) // the array of records
```


### Link

Create an instance: `link := client.Link(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alternates` | `[]any` | An array that contains objects correlating to the language versions defined using [field-level translation](https://www.storyblok.com/docs/concepts/internationalization#field-level-translation). |
| `created_at` | `any` | Creation timestamp. |
| `id` | `int` | Story or folder `id`. |
| `is_folder` | `bool` | Returns `true` if the item is a folder. |
| `is_startpage` | `bool` | Returns `true` if the story is the folder’s root. |
| `name` | `string` | Story or folder name. |
| `parent_id` | `int` | Parent folder ID. |
| `path` | `any` | Real path defined in the story’s entry configuration. |
| `position` | `int` | Numeric representation of the story’s position in the folder. |
| `published` | `bool` | Returns `true` if the story is currently published. |
| `published_at` | `any` | Latest publication timestamp. |
| `real_path` | `any` | Either the full slug of the story or folder with a leading `/`, or the value of the real path defined in the story’s entry configuration with a leading `/`. |
| `slug` | `string` | Story or folder full slug. |
| `updated_at` | `any` | Latest update timestamp. |
| `uuid` | `string` | Story or folder `uuid`. |

#### Example: Load

```go
link, err := client.Link(nil).Load(map[string]any{"id": "link_id", "token": "token"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(link) // the loaded record
```


### Space

Create an instance: `space := client.Space(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `string` | Domain associated with the space (configured under **Visual Editor** → **Location**). |
| `id` | `int` | Space ID. |
| `language_codes` | `[]any` | An array of language codes configured in the space. |
| `name` | `string` | Space name. |
| `version` | `int` | Cached version Unix timestamp. |

#### Example: Load

```go
space, err := client.Space(nil).Load(map[string]any{"token": "token"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(space) // the loaded record
```


### Story

Create an instance: `story := client.Story(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cv` | `int` | Cached version Unix timestamp. |
| `id` | `string` |  |
| `link_uuids` | `[]any` | An array of all linked stories’ UUIDs. |
| `links` | `[]any` | An array of resolved links. |
| `rel_uuids` | `[]any` | An array of all referenced stories’ UUIDs. |
| `rels` | `[]any` | An array of resolved stories. |
| `stories` | `[]any` | An array of story objects. |
| `story` | `any` | The complete story object. |

#### Example: Load

```go
story, err := client.Story(nil).Load(map[string]any{"id": "story_id", "token": "token"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(story) // the loaded record
```

#### Example: List

```go
storys, err := client.Story(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(storys) // the array of records
```


### Tag

Create an instance: `tag := client.Tag(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | The tag name. |
| `tag_on_stories` | `int` | The number of distinct stories this tag appears on (only present when all_tags parameter is true). |
| `taggings_count` | `int` | The number of stories that include this tag. |

#### Example: List

```go
tags, err := client.Tag(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(tags) // the array of records
```


### Taxonomy

Create an instance: `taxonomy := client.Taxonomy(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `associated_content` | `[]any` | An array of story objects associated with the taxonomy. |
| `children` | `[]any` | An array of sub-terms objects. |
| `created_at` | `string` | Creation timestamp. |
| `cv` | `any` |  |
| `description` | `any` | The taxonomy’s description. |
| `display_name` | `string` | The taxonomy’s name. |
| `id` | `string` | The taxonomy’s ID. |
| `last_activity_at` | `string` | Latest update timestamp. |
| `last_author` | `any` | An object that contains the details of user who created the term. |
| `last_author_id` | `any` | The user’s ID. |
| `name` | `string` | The taxonomy’s technical name. |
| `parent_id` | `any` | The top-level term’s ID. |
| `taxonomy` | `map[string]any` | An object that contains a taxonomy. |
| `terms_count` | `int` | The number sub-terms (at any depth). |
| `updated_at` | `string` | Latest update timestamp. |

#### Example: Load

```go
taxonomy, err := client.Taxonomy(nil).Load(map[string]any{"id": "taxonomy_id", "token": "token"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(taxonomy) // the loaded record
```

#### Example: List

```go
taxonomys, err := client.Taxonomy(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(taxonomys) // the array of records
```


### TaxonomyTerm

Create an instance: `taxonomyTerm := client.TaxonomyTerm(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cv` | `any` |  |
| `id` | `string` |  |
| `taxonomy_term` | `map[string]any` | An object that contains a taxonomy. |

#### Example: Load

```go
taxonomyTerm, err := client.TaxonomyTerm(nil).Load(map[string]any{"id": "taxonomy_term_id", "token": "token"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(taxonomyTerm) // the loaded record
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | Test transport |

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Open types

1 field is carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes it with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `story` | `links` | 3 | 1 level |

These values round-trip unchanged — read them, modify them, send them back. If
the API adds a `discriminator` to the definition, regenerating will type them.
Every other field is typed normally.

## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/storyblok-sdk/go/
├── storyblok-sdk.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/storyblok-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
space := client.Space(nil)
space.Load(map[string]any{"token": "example"}, nil)

// space.Data() now returns the space data from the last load
// space.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
