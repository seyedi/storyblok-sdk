# StoryblokSdk Python SDK



The Python SDK for the StoryblokSdk API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Asset()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/storyblok-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from storybloksdk_sdk import StoryblokSdkSDK

client = StoryblokSdkSDK({
    "apikey": os.environ.get("STORYBLOK_SDK_APIKEY"),
})
```

### 3. Load an asset

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    asset = client.Asset().load({"filename": "example_filename", "token": "example_token"})
    print(asset)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    space = client.Space().load({"token": "example"})
    print(space)
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = StoryblokSdkSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
space = client.Space().load({"token": "example"})
# space contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = StoryblokSdkSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### StoryblokSdkSDK

```python
from storybloksdk_sdk import StoryblokSdkSDK

client = StoryblokSdkSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = StoryblokSdkSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### StoryblokSdkSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `Asset` | `(data) -> AssetEntity` | Create an Asset entity instance. |
| `DataSource` | `(data) -> DataSourceEntity` | Create a DataSource entity instance. |
| `DataSourceEntry` | `(data) -> DataSourceEntryEntity` | Create a DataSourceEntry entity instance. |
| `Experiment` | `(data) -> ExperimentEntity` | Create an Experiment entity instance. |
| `Link` | `(data) -> LinkEntity` | Create a Link entity instance. |
| `Space` | `(data) -> SpaceEntity` | Create a Space entity instance. |
| `Story` | `(data) -> StoryEntity` | Create a Story entity instance. |
| `Tag` | `(data) -> TagEntity` | Create a Tag entity instance. |
| `Taxonomy` | `(data) -> TaxonomyEntity` | Create a Taxonomy entity instance. |
| `TaxonomyTerm` | `(data) -> TaxonomyTermEntity` | Create a TaxonomyTerm entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### Asset

| Field | Description |
| --- | --- |
| `alt` | Alt text for the asset (default language). |
| `asset_folder_id` | Id of the folder that contains this asset. |
| `content_length` | The content length in bytes. |
| `content_type` | The asset’s MIME type. |
| `copyright` | Copyright text. |
| `created_at` | Creation timestamp. |
| `expire_at` | Expiration timestamp. |
| `filename` | Full path of the asset, including the file name. |
| `focus` | Focus. |
| `is_private` | Defines if the asset should be inaccessible to the public. |
| `signed_url` | The signed URL for the asset. |
| `title` | Title of the asset. |
| `updated_at` | Latest update timestamp. |

Operations: Load.

API path: `/v2/cdn/assets/me`

#### DataSource

| Field | Description |
| --- | --- |
| `created_at` | Creation timestamp. |
| `cv` | Cached version Unix timestamp. |
| `datasource` | A single data source object. |
| `dimensions` | An array listing the dimensions defined for the data source. |
| `id` | Data source ID. |
| `name` | Data source name. |
| `slug` | Data source `slug`. |
| `updated_at` | Latest update timestamp. |

Operations: List, Load.

API path: `/v2/cdn/datasources`

#### DataSourceEntry

| Field | Description |
| --- | --- |
| `dimension_value` | Entry value (requested dimension). |
| `id` | Entry ID. |
| `name` | Entry name. |
| `value` | Entry value (default dimension). |

Operations: List.

API path: `/v2/cdn/datasource_entries`

#### Experiment

| Field | Description |
| --- | --- |
| `display_name` | Human-readable display name. |
| `id` | Numeric ID of the experiment. |
| `name` | Internal name (lowercase letters, numbers, and underscores). |
| `story_ids` | IDs of [stories](https://www.storyblok.com/docs/api/content-delivery/v2/stories/the-story-object) assigned to the experiment. |
| `variants` | Variants belonging to the experiment. |

Operations: List.

API path: `/v2/cdn/experiments`

#### Link

| Field | Description |
| --- | --- |
| `alternates` | An array that contains objects correlating to the language versions defined using [field-level translation](https://www.storyblok.com/docs/concepts/internationalization#field-level-translation). |
| `created_at` | Creation timestamp. |
| `id` | Story or folder `id`. |
| `is_folder` | Returns `true` if the item is a folder. |
| `is_startpage` | Returns `true` if the story is the folder’s root. |
| `name` | Story or folder name. |
| `parent_id` | Parent folder ID. |
| `path` | Real path defined in the story’s entry configuration. |
| `position` | Numeric representation of the story’s position in the folder. |
| `published` | Returns `true` if the story is currently published. |
| `published_at` | Latest publication timestamp. |
| `real_path` | Either the full slug of the story or folder with a leading `/`, or the value of the real path defined in the story’s entry configuration with a leading `/`. |
| `slug` | Story or folder full slug. |
| `updated_at` | Latest update timestamp. |
| `uuid` | Story or folder `uuid`. |

Operations: Load.

API path: `/v2/cdn/links`

#### Space

| Field | Description |
| --- | --- |
| `domain` | Domain associated with the space (configured under **Visual Editor** → **Location**). |
| `id` | Space ID. |
| `language_codes` | An array of language codes configured in the space. |
| `name` | Space name. |
| `version` | Cached version Unix timestamp. |

Operations: Load.

API path: `/v2/cdn/spaces/me`

#### Story

| Field | Description |
| --- | --- |
| `cv` | Cached version Unix timestamp. |
| `id` |  |
| `link_uuids` | An array of all linked stories’ UUIDs. |
| `links` | An array of resolved links. |
| `rel_uuids` | An array of all referenced stories’ UUIDs. |
| `rels` | An array of resolved stories. |
| `stories` | An array of story objects. |
| `story` | The complete story object. |

Operations: List, Load.

API path: `/v2/cdn/stories`

#### Tag

| Field | Description |
| --- | --- |
| `name` | The tag name. |
| `tag_on_stories` | The number of distinct stories this tag appears on (only present when all_tags parameter is true). |
| `taggings_count` | The number of stories that include this tag. |

Operations: List.

API path: `/v2/cdn/tags`

#### Taxonomy

| Field | Description |
| --- | --- |
| `associated_content` | An array of story objects associated with the taxonomy. |
| `children` | An array of sub-terms objects. |
| `created_at` | Creation timestamp. |
| `cv` |  |
| `description` | The taxonomy’s description. |
| `display_name` | The taxonomy’s name. |
| `id` | The taxonomy’s ID. |
| `last_activity_at` | Latest update timestamp. |
| `last_author` | An object that contains the details of user who created the term. |
| `last_author_id` | The user’s ID. |
| `name` | The taxonomy’s technical name. |
| `parent_id` | The top-level term’s ID. |
| `taxonomy` | An object that contains a taxonomy. |
| `terms_count` | The number sub-terms (at any depth). |
| `updated_at` | Latest update timestamp. |

Operations: List, Load.

API path: `/v2/cdn/taxonomies`

#### TaxonomyTerm

| Field | Description |
| --- | --- |
| `cv` |  |
| `id` |  |
| `taxonomy_term` | An object that contains a taxonomy. |

Operations: Load.

API path: `/v2/cdn/taxonomy_terms/{id}`



## Entities


### Asset

Create an instance: `asset = client.Asset()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alt` | `str | None` | Alt text for the asset (default language). |
| `asset_folder_id` | `int | None` | Id of the folder that contains this asset. |
| `content_length` | `int | None` | The content length in bytes. |
| `content_type` | `str | None` | The asset’s MIME type. |
| `copyright` | `str | None` | Copyright text. |
| `created_at` | `str | None` | Creation timestamp. |
| `expire_at` | `str | None` | Expiration timestamp. |
| `filename` | `str` | Full path of the asset, including the file name. |
| `focus` | `str | None` | Focus. |
| `is_private` | `bool` | Defines if the asset should be inaccessible to the public. |
| `signed_url` | `str | None` | The signed URL for the asset. |
| `title` | `str | None` | Title of the asset. |
| `updated_at` | `str | None` | Latest update timestamp. |

#### Example: Load

```python
asset = client.Asset().load({"filename": "filename", "token": "token"})
```


### DataSource

Create an instance: `data_source = client.DataSource()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` | Creation timestamp. |
| `cv` | `int | None` | Cached version Unix timestamp. |
| `datasource` | `dict` | A single data source object. |
| `dimensions` | `list` | An array listing the dimensions defined for the data source. |
| `id` | `int` | Data source ID. |
| `name` | `str` | Data source name. |
| `slug` | `str` | Data source `slug`. |
| `updated_at` | `str` | Latest update timestamp. |

#### Example: Load

```python
data_source = client.DataSource().load({"id": "data_source_id", "token": "token"})
```

#### Example: List

```python
data_sources = client.DataSource().list({"token": "example"})
```


### DataSourceEntry

Create an instance: `data_source_entry = client.DataSourceEntry()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `dimension_value` | `str | None` | Entry value (requested dimension). |
| `id` | `int` | Entry ID. |
| `name` | `str` | Entry name. |
| `value` | `str` | Entry value (default dimension). |

#### Example: List

```python
data_source_entrys = client.DataSourceEntry().list({"token": "example"})
```


### Experiment

Create an instance: `experiment = client.Experiment()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `display_name` | `str` | Human-readable display name. |
| `id` | `int` | Numeric ID of the experiment. |
| `name` | `str` | Internal name (lowercase letters, numbers, and underscores). |
| `story_ids` | `list` | IDs of [stories](https://www.storyblok.com/docs/api/content-delivery/v2/stories/the-story-object) assigned to the experiment. |
| `variants` | `list` | Variants belonging to the experiment. |

#### Example: List

```python
experiments = client.Experiment().list({"token": "example"})
```


### Link

Create an instance: `link = client.Link()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alternates` | `list` | An array that contains objects correlating to the language versions defined using [field-level translation](https://www.storyblok.com/docs/concepts/internationalization#field-level-translation). |
| `created_at` | `str | None` | Creation timestamp. |
| `id` | `int` | Story or folder `id`. |
| `is_folder` | `bool` | Returns `true` if the item is a folder. |
| `is_startpage` | `bool` | Returns `true` if the story is the folder’s root. |
| `name` | `str` | Story or folder name. |
| `parent_id` | `int` | Parent folder ID. |
| `path` | `str | None` | Real path defined in the story’s entry configuration. |
| `position` | `int` | Numeric representation of the story’s position in the folder. |
| `published` | `bool` | Returns `true` if the story is currently published. |
| `published_at` | `str | None` | Latest publication timestamp. |
| `real_path` | `str | None` | Either the full slug of the story or folder with a leading `/`, or the value of the real path defined in the story’s entry configuration with a leading `/`. |
| `slug` | `str` | Story or folder full slug. |
| `updated_at` | `str | None` | Latest update timestamp. |
| `uuid` | `str` | Story or folder `uuid`. |

#### Example: Load

```python
link = client.Link().load({"id": "link_id", "token": "token"})
```


### Space

Create an instance: `space = client.Space()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `str` | Domain associated with the space (configured under **Visual Editor** → **Location**). |
| `id` | `int` | Space ID. |
| `language_codes` | `list` | An array of language codes configured in the space. |
| `name` | `str` | Space name. |
| `version` | `int` | Cached version Unix timestamp. |

#### Example: Load

```python
space = client.Space().load({"token": "token"})
```


### Story

Create an instance: `story = client.Story()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cv` | `int` | Cached version Unix timestamp. |
| `id` | `str` |  |
| `link_uuids` | `list` | An array of all linked stories’ UUIDs. |
| `links` | `list` | An array of resolved links. |
| `rel_uuids` | `list` | An array of all referenced stories’ UUIDs. |
| `rels` | `list` | An array of resolved stories. |
| `stories` | `list` | An array of story objects. |
| `story` | `Any` | The complete story object. |

#### Example: Load

```python
story = client.Story().load({"id": "story_id", "token": "token"})
```

#### Example: List

```python
storys = client.Story().list({"token": "example"})
```


### Tag

Create an instance: `tag = client.Tag()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `str` | The tag name. |
| `tag_on_stories` | `int` | The number of distinct stories this tag appears on (only present when all_tags parameter is true). |
| `taggings_count` | `int` | The number of stories that include this tag. |

#### Example: List

```python
tags = client.Tag().list({"token": "example"})
```


### Taxonomy

Create an instance: `taxonomy = client.Taxonomy()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `associated_content` | `list` | An array of story objects associated with the taxonomy. |
| `children` | `list` | An array of sub-terms objects. |
| `created_at` | `str` | Creation timestamp. |
| `cv` | `int | None` |  |
| `description` | `str | None` | The taxonomy’s description. |
| `display_name` | `str` | The taxonomy’s name. |
| `id` | `str` | The taxonomy’s ID. |
| `last_activity_at` | `str` | Latest update timestamp. |
| `last_author` | `dict | None` | An object that contains the details of user who created the term. |
| `last_author_id` | `str | None` | The user’s ID. |
| `name` | `str` | The taxonomy’s technical name. |
| `parent_id` | `str | None` | The top-level term’s ID. |
| `taxonomy` | `dict` | An object that contains a taxonomy. |
| `terms_count` | `int` | The number sub-terms (at any depth). |
| `updated_at` | `str` | Latest update timestamp. |

#### Example: Load

```python
taxonomy = client.Taxonomy().load({"id": "taxonomy_id", "token": "token"})
```

#### Example: List

```python
taxonomys = client.Taxonomy().list({"token": "example"})
```


### TaxonomyTerm

Create an instance: `taxonomy_term = client.TaxonomyTerm()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cv` | `int | None` |  |
| `id` | `str` |  |
| `taxonomy_term` | `dict` | An object that contains a taxonomy. |

#### Example: Load

```python
taxonomy_term = client.TaxonomyTerm().load({"id": "taxonomy_term_id", "token": "token"})
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── storybloksdk_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`storybloksdk_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
space = client.Space()
space.load({"token": "example"})

# space.data_get() now returns the space data from the last load
# space.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
