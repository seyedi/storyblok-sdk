# StoryblokSdk Python SDK Reference

Complete API reference for the StoryblokSdk Python SDK.


## StoryblokSdkSDK

### Constructor

```python
from storybloksdk_sdk import StoryblokSdkSDK

client = StoryblokSdkSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `StoryblokSdkSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = StoryblokSdkSDK.test()
```


### Instance Methods

#### `Asset(data=None)`

Create a new `AssetEntity` instance. Pass `None` for no initial data.

#### `DataSource(data=None)`

Create a new `DataSourceEntity` instance. Pass `None` for no initial data.

#### `DataSourceEntry(data=None)`

Create a new `DataSourceEntryEntity` instance. Pass `None` for no initial data.

#### `Experiment(data=None)`

Create a new `ExperimentEntity` instance. Pass `None` for no initial data.

#### `Link(data=None)`

Create a new `LinkEntity` instance. Pass `None` for no initial data.

#### `Space(data=None)`

Create a new `SpaceEntity` instance. Pass `None` for no initial data.

#### `Story(data=None)`

Create a new `StoryEntity` instance. Pass `None` for no initial data.

#### `Tag(data=None)`

Create a new `TagEntity` instance. Pass `None` for no initial data.

#### `Taxonomy(data=None)`

Create a new `TaxonomyEntity` instance. Pass `None` for no initial data.

#### `TaxonomyTerm(data=None)`

Create a new `TaxonomyTermEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AssetEntity

```python
asset = client.Asset()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alt` | `str | None` | Yes | Alt text for the asset (default language). |
| `asset_folder_id` | `int | None` | Yes | Id of the folder that contains this asset. |
| `content_length` | `int | None` | Yes | The content length in bytes. |
| `content_type` | `str | None` | Yes | The asset’s MIME type. |
| `copyright` | `str | None` | Yes | Copyright text. |
| `created_at` | `str | None` | Yes | Creation timestamp. |
| `expire_at` | `str | None` | Yes | Expiration timestamp. |
| `filename` | `str` | Yes | Full path of the asset, including the file name. |
| `focus` | `str | None` | Yes | Focus. |
| `is_private` | `bool` | Yes | Defines if the asset should be inaccessible to the public. |
| `signed_url` | `str | None` | No | The signed URL for the asset. |
| `title` | `str | None` | Yes | Title of the asset. |
| `updated_at` | `str | None` | Yes | Latest update timestamp. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Asset().load({"filename": "filename", "token": "token"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AssetEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DataSourceEntity

```python
data_source = client.DataSource()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No | Creation timestamp. |
| `cv` | `int | None` | Yes | Cached version Unix timestamp. |
| `datasource` | `dict` | Yes | A single data source object. |
| `dimensions` | `list` | Yes | An array listing the dimensions defined for the data source. |
| `id` | `int` | Yes | Data source ID. |
| `name` | `str` | Yes | Data source name. |
| `slug` | `str` | Yes | Data source `slug`. |
| `updated_at` | `str` | No | Latest update timestamp. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.DataSource().list({"token": "example"})
for data_source in results:
    print(data_source)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.DataSource().load({"id": "data_source_id", "token": "token"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DataSourceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DataSourceEntryEntity

```python
data_source_entry = client.DataSourceEntry()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dimension_value` | `str | None` | Yes | Entry value (requested dimension). |
| `id` | `int` | Yes | Entry ID. |
| `name` | `str` | Yes | Entry name. |
| `value` | `str` | Yes | Entry value (default dimension). |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.DataSourceEntry().list({"token": "example"})
for data_source_entry in results:
    print(data_source_entry)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DataSourceEntryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ExperimentEntity

```python
experiment = client.Experiment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `display_name` | `str` | Yes | Human-readable display name. |
| `id` | `int` | Yes | Numeric ID of the experiment. |
| `name` | `str` | Yes | Internal name (lowercase letters, numbers, and underscores). |
| `story_ids` | `list` | Yes | IDs of [stories](https://www.storyblok.com/docs/api/content-delivery/v2/stories/the-story-object) assigned to the experiment. |
| `variants` | `list` | Yes | Variants belonging to the experiment. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Experiment().list({"token": "example"})
for experiment in results:
    print(experiment)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ExperimentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LinkEntity

```python
link = client.Link()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alternates` | `list` | No | An array that contains objects correlating to the language versions defined using [field-level translation](https://www.storyblok.com/docs/concepts/internationalization#field-level-translation). |
| `created_at` | `str | None` | No | Creation timestamp. |
| `id` | `int` | Yes | Story or folder `id`. |
| `is_folder` | `bool` | Yes | Returns `true` if the item is a folder. |
| `is_startpage` | `bool` | Yes | Returns `true` if the story is the folder’s root. |
| `name` | `str` | Yes | Story or folder name. |
| `parent_id` | `int` | Yes | Parent folder ID. |
| `path` | `str | None` | No | Real path defined in the story’s entry configuration. |
| `position` | `int` | Yes | Numeric representation of the story’s position in the folder. |
| `published` | `bool` | Yes | Returns `true` if the story is currently published. |
| `published_at` | `str | None` | No | Latest publication timestamp. |
| `real_path` | `str | None` | No | Either the full slug of the story or folder with a leading `/`, or the value of the real path defined in the story’s entry configuration with a leading `/`. |
| `slug` | `str` | Yes | Story or folder full slug. |
| `updated_at` | `str | None` | No | Latest update timestamp. |
| `uuid` | `str` | Yes | Story or folder `uuid`. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Link().load({"id": "link_id", "token": "token"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LinkEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SpaceEntity

```python
space = client.Space()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `str` | Yes | Domain associated with the space (configured under **Visual Editor** → **Location**). |
| `id` | `int` | Yes | Space ID. |
| `language_codes` | `list` | Yes | An array of language codes configured in the space. |
| `name` | `str` | Yes | Space name. |
| `version` | `int` | Yes | Cached version Unix timestamp. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Space().load({"token": "token"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SpaceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StoryEntity

```python
story = client.Story()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cv` | `int` | Yes | Cached version Unix timestamp. |
| `id` | `str` | No |  |
| `link_uuids` | `list` | No | An array of all linked stories’ UUIDs. |
| `links` | `list` | No | An array of resolved links. |
| `rel_uuids` | `list` | No | An array of all referenced stories’ UUIDs. |
| `rels` | `list` | No | An array of resolved stories. |
| `stories` | `list` | Yes | An array of story objects. |
| `story` | `Any` | Yes | The complete story object. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Story().list({"token": "example"})
for story in results:
    print(story)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Story().load({"id": "story_id", "token": "token"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StoryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TagEntity

```python
tag = client.Tag()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `str` | Yes | The tag name. |
| `tag_on_stories` | `int` | No | The number of distinct stories this tag appears on (only present when all_tags parameter is true). |
| `taggings_count` | `int` | No | The number of stories that include this tag. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Tag().list({"token": "example"})
for tag in results:
    print(tag)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TagEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TaxonomyEntity

```python
taxonomy = client.Taxonomy()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `associated_content` | `list` | No | An array of story objects associated with the taxonomy. |
| `children` | `list` | No | An array of sub-terms objects. |
| `created_at` | `str` | Yes | Creation timestamp. |
| `cv` | `int | None` | Yes |  |
| `description` | `str | None` | Yes | The taxonomy’s description. |
| `display_name` | `str` | Yes | The taxonomy’s name. |
| `id` | `str` | Yes | The taxonomy’s ID. |
| `last_activity_at` | `str` | No | Latest update timestamp. |
| `last_author` | `dict | None` | Yes | An object that contains the details of user who created the term. |
| `last_author_id` | `str | None` | Yes | The user’s ID. |
| `name` | `str` | Yes | The taxonomy’s technical name. |
| `parent_id` | `str | None` | Yes | The top-level term’s ID. |
| `taxonomy` | `dict` | Yes | An object that contains a taxonomy. |
| `terms_count` | `int` | No | The number sub-terms (at any depth). |
| `updated_at` | `str` | Yes | Latest update timestamp. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Taxonomy().list({"token": "example"})
for taxonomy in results:
    print(taxonomy)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Taxonomy().load({"id": "taxonomy_id", "token": "token"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TaxonomyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TaxonomyTermEntity

```python
taxonomy_term = client.TaxonomyTerm()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cv` | `int | None` | Yes |  |
| `id` | `str` | No |  |
| `taxonomy_term` | `dict` | Yes | An object that contains a taxonomy. |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.TaxonomyTerm().load({"id": "taxonomy_term_id", "token": "token"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TaxonomyTermEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```python
client = StoryblokSdkSDK({
    "feature": {
        "test": {"active": True},
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

