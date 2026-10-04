# StoryblokSdk JavaScript SDK Reference

Complete API reference for the StoryblokSdk JavaScript SDK.


## StoryblokSdkSDK

### Constructor

```ts
new StoryblokSdkSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `StoryblokSdkSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = StoryblokSdkSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `StoryblokSdkSDK` instance in test mode.


### Instance Methods

#### `Asset(data?: object)`

Create a new `Asset` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AssetEntity` instance.

#### `DataSource(data?: object)`

Create a new `DataSource` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DataSourceEntity` instance.

#### `DataSourceEntry(data?: object)`

Create a new `DataSourceEntry` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DataSourceEntryEntity` instance.

#### `Experiment(data?: object)`

Create a new `Experiment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ExperimentEntity` instance.

#### `Link(data?: object)`

Create a new `Link` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LinkEntity` instance.

#### `Space(data?: object)`

Create a new `Space` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SpaceEntity` instance.

#### `Story(data?: object)`

Create a new `Story` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StoryEntity` instance.

#### `Tag(data?: object)`

Create a new `Tag` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TagEntity` instance.

#### `Taxonomy(data?: object)`

Create a new `Taxonomy` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TaxonomyEntity` instance.

#### `TaxonomyTerm(data?: object)`

Create a new `TaxonomyTerm` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TaxonomyTermEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `StoryblokSdkSDK.test()`.

**Returns:** `StoryblokSdkSDK` instance in test mode.


---

## AssetEntity

```ts
const asset = client.Asset()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alt` | `string|null` | Yes | Alt text for the asset (default language). |
| `asset_folder_id` | `number|null` | Yes | Id of the folder that contains this asset. |
| `content_length` | `number|null` | Yes | The content length in bytes. |
| `content_type` | `string|null` | Yes | The asset’s MIME type. |
| `copyright` | `string|null` | Yes | Copyright text. |
| `created_at` | `string|null` | Yes | Creation timestamp. |
| `expire_at` | `string|null` | Yes | Expiration timestamp. |
| `filename` | `string` | Yes | Full path of the asset, including the file name. |
| `focus` | `string|null` | Yes | Focus. |
| `is_private` | `boolean` | Yes | Defines if the asset should be inaccessible to the public. |
| `signed_url` | `string|null` | No | The signed URL for the asset. |
| `title` | `string|null` | Yes | Title of the asset. |
| `updated_at` | `string|null` | Yes | Latest update timestamp. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Asset().load({ filename: 'filename', token: 'token' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AssetEntity` instance with the same client and
options.

#### `client()`

Return the parent `StoryblokSdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DataSourceEntity

```ts
const data_source = client.DataSource()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | Creation timestamp. |
| `cv` | `number|null` | Yes | Cached version Unix timestamp. |
| `datasource` | `Object` | Yes | A single data source object. |
| `dimensions` | `Array` | Yes | An array listing the dimensions defined for the data source. |
| `id` | `number` | Yes | Data source ID. |
| `name` | `string` | Yes | Data source name. |
| `slug` | `string` | Yes | Data source `slug`. |
| `updated_at` | `string` | No | Latest update timestamp. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.DataSource().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.DataSource().load({ id: 'data_source_id', token: 'token' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DataSourceEntity` instance with the same client and
options.

#### `client()`

Return the parent `StoryblokSdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DataSourceEntryEntity

```ts
const data_source_entry = client.DataSourceEntry()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dimension_value` | `string|null` | Yes | Entry value (requested dimension). |
| `id` | `number` | Yes | Entry ID. |
| `name` | `string` | Yes | Entry name. |
| `value` | `string` | Yes | Entry value (default dimension). |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.DataSourceEntry().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DataSourceEntryEntity` instance with the same client and
options.

#### `client()`

Return the parent `StoryblokSdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ExperimentEntity

```ts
const experiment = client.Experiment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `display_name` | `string` | Yes | Human-readable display name. |
| `id` | `number` | Yes | Numeric ID of the experiment. |
| `name` | `string` | Yes | Internal name (lowercase letters, numbers, and underscores). |
| `story_ids` | `Array` | Yes | IDs of [stories](https://www.storyblok.com/docs/api/content-delivery/v2/stories/the-story-object) assigned to the experiment. |
| `variants` | `Array` | Yes | Variants belonging to the experiment. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Experiment().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ExperimentEntity` instance with the same client and
options.

#### `client()`

Return the parent `StoryblokSdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LinkEntity

```ts
const link = client.Link()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `alternates` | `Array` | No | An array that contains objects correlating to the language versions defined using [field-level translation](https://www.storyblok.com/docs/concepts/internationalization#field-level-translation). |
| `created_at` | `string|null` | No | Creation timestamp. |
| `id` | `number` | Yes | Story or folder `id`. |
| `is_folder` | `boolean` | Yes | Returns `true` if the item is a folder. |
| `is_startpage` | `boolean` | Yes | Returns `true` if the story is the folder’s root. |
| `name` | `string` | Yes | Story or folder name. |
| `parent_id` | `number` | Yes | Parent folder ID. |
| `path` | `string|null` | No | Real path defined in the story’s entry configuration. |
| `position` | `number` | Yes | Numeric representation of the story’s position in the folder. |
| `published` | `boolean` | Yes | Returns `true` if the story is currently published. |
| `published_at` | `string|null` | No | Latest publication timestamp. |
| `real_path` | `string|null` | No | Either the full slug of the story or folder with a leading `/`, or the value of the real path defined in the story’s entry configuration with a leading `/`. |
| `slug` | `string` | Yes | Story or folder full slug. |
| `updated_at` | `string|null` | No | Latest update timestamp. |
| `uuid` | `string` | Yes | Story or folder `uuid`. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Link().load({ id: 'link_id', token: 'token' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LinkEntity` instance with the same client and
options.

#### `client()`

Return the parent `StoryblokSdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SpaceEntity

```ts
const space = client.Space()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | Yes | Domain associated with the space (configured under **Visual Editor** → **Location**). |
| `id` | `number` | Yes | Space ID. |
| `language_codes` | `Array` | Yes | An array of language codes configured in the space. |
| `name` | `string` | Yes | Space name. |
| `version` | `number` | Yes | Cached version Unix timestamp. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Space().load({ token: 'token' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SpaceEntity` instance with the same client and
options.

#### `client()`

Return the parent `StoryblokSdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StoryEntity

```ts
const story = client.Story()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cv` | `number` | Yes | Cached version Unix timestamp. |
| `id` | `string` | No |  |
| `link_uuids` | `Array` | No | An array of all linked stories’ UUIDs. |
| `links` | `Array` | No | An array of resolved links. |
| `rel_uuids` | `Array` | No | An array of all referenced stories’ UUIDs. |
| `rels` | `Array` | No | An array of resolved stories. |
| `stories` | `Array` | Yes | An array of story objects. |
| `story` | `*` | Yes | The complete story object. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Story().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Story().load({ id: 'story_id', token: 'token' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StoryEntity` instance with the same client and
options.

#### `client()`

Return the parent `StoryblokSdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TagEntity

```ts
const tag = client.Tag()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes | The tag name. |
| `tag_on_stories` | `number` | No | The number of distinct stories this tag appears on (only present when all_tags parameter is true). |
| `taggings_count` | `number` | No | The number of stories that include this tag. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Tag().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TagEntity` instance with the same client and
options.

#### `client()`

Return the parent `StoryblokSdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TaxonomyEntity

```ts
const taxonomy = client.Taxonomy()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `associated_content` | `Array` | No | An array of story objects associated with the taxonomy. |
| `children` | `Array` | No | An array of sub-terms objects. |
| `created_at` | `string` | Yes | Creation timestamp. |
| `cv` | `number|null` | Yes |  |
| `description` | `string|null` | Yes | The taxonomy’s description. |
| `display_name` | `string` | Yes | The taxonomy’s name. |
| `id` | `string` | Yes | The taxonomy’s ID. |
| `last_activity_at` | `string` | No | Latest update timestamp. |
| `last_author` | `Object|null` | Yes | An object that contains the details of user who created the term. |
| `last_author_id` | `string|null` | Yes | The user’s ID. |
| `name` | `string` | Yes | The taxonomy’s technical name. |
| `parent_id` | `string|null` | Yes | The top-level term’s ID. |
| `taxonomy` | `Object` | Yes | An object that contains a taxonomy. |
| `terms_count` | `number` | No | The number sub-terms (at any depth). |
| `updated_at` | `string` | Yes | Latest update timestamp. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Taxonomy().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Taxonomy().load({ id: 'taxonomy_id', token: 'token' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TaxonomyEntity` instance with the same client and
options.

#### `client()`

Return the parent `StoryblokSdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TaxonomyTermEntity

```ts
const taxonomy_term = client.TaxonomyTerm()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cv` | `number|null` | Yes |  |
| `id` | `string` | No |  |
| `taxonomy_term` | `Object` | Yes | An object that contains a taxonomy. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.TaxonomyTerm().load({ id: 'taxonomy_term_id', token: 'token' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TaxonomyTermEntity` instance with the same client and
options.

#### `client()`

Return the parent `StoryblokSdkSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```ts
const client = new StoryblokSdkSDK({
  feature: {
    test: { active: true },
  }
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

