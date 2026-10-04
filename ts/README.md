# StoryblokSdk TypeScript SDK



The TypeScript SDK for the StoryblokSdk API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Asset()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `js`, `py` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/storyblok-sdk/releases)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/storyblok-sdk
npm install ./storyblok-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { StoryblokSdkSDK } from '@voxgig-sdk/storyblok-sdk'

const client = new StoryblokSdkSDK({
  apikey: process.env.STORYBLOK_SDK_APIKEY,
})
```

### 3. Load an asset

`load()` returns the entity directly and throws on failure:

```ts
try {
  const asset = await client.Asset().load({ filename: 'example_filename', token: 'example_token' })
  console.log(asset)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const space = await client.Space().load({ token: "example" })
  console.log(space)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = StoryblokSdkSDK.test()

const space = await client.Space().load({ token: 'example_token' })
// space is the entity, populated with mock response data
// — call space.data() for the record itself
console.log(space)
```

You can also use the instance method:

```ts
const client = new StoryblokSdkSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Space()

// First call runs the operation and stores its result
await entity.load({ token: 'example_token' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new StoryblokSdkSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### StoryblokSdkSDK

#### Constructor

```ts
new StoryblokSdkSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Asset(data?)` | `AssetEntity` | Create an Asset entity instance. |
| `DataSource(data?)` | `DataSourceEntity` | Create a DataSource entity instance. |
| `DataSourceEntry(data?)` | `DataSourceEntryEntity` | Create a DataSourceEntry entity instance. |
| `Experiment(data?)` | `ExperimentEntity` | Create an Experiment entity instance. |
| `Link(data?)` | `LinkEntity` | Create a Link entity instance. |
| `Space(data?)` | `SpaceEntity` | Create a Space entity instance. |
| `Story(data?)` | `StoryEntity` | Create a Story entity instance. |
| `Tag(data?)` | `TagEntity` | Create a Tag entity instance. |
| `Taxonomy(data?)` | `TaxonomyEntity` | Create a Taxonomy entity instance. |
| `TaxonomyTerm(data?)` | `TaxonomyTermEntity` | Create a TaxonomyTerm entity instance. |
| `tester(testopts?, sdkopts?)` | `StoryblokSdkSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `StoryblokSdkSDK.test(testopts?, sdkopts?)` | `StoryblokSdkSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): StoryblokSdkSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: load.

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

Operations: list, load.

API path: `/v2/cdn/datasources`

#### DataSourceEntry

| Field | Description |
| --- | --- |
| `dimension_value` | Entry value (requested dimension). |
| `id` | Entry ID. |
| `name` | Entry name. |
| `value` | Entry value (default dimension). |

Operations: list.

API path: `/v2/cdn/datasource_entries`

#### Experiment

| Field | Description |
| --- | --- |
| `display_name` | Human-readable display name. |
| `id` | Numeric ID of the experiment. |
| `name` | Internal name (lowercase letters, numbers, and underscores). |
| `story_ids` | IDs of [stories](https://www.storyblok.com/docs/api/content-delivery/v2/stories/the-story-object) assigned to the experiment. |
| `variants` | Variants belonging to the experiment. |

Operations: list.

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

Operations: load.

API path: `/v2/cdn/links`

#### Space

| Field | Description |
| --- | --- |
| `domain` | Domain associated with the space (configured under **Visual Editor** → **Location**). |
| `id` | Space ID. |
| `language_codes` | An array of language codes configured in the space. |
| `name` | Space name. |
| `version` | Cached version Unix timestamp. |

Operations: load.

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

Operations: list, load.

API path: `/v2/cdn/stories`

#### Tag

| Field | Description |
| --- | --- |
| `name` | The tag name. |
| `tag_on_stories` | The number of distinct stories this tag appears on (only present when all_tags parameter is true). |
| `taggings_count` | The number of stories that include this tag. |

Operations: list.

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

Operations: list, load.

API path: `/v2/cdn/taxonomies`

#### TaxonomyTerm

| Field | Description |
| --- | --- |
| `cv` |  |
| `id` |  |
| `taxonomy_term` | An object that contains a taxonomy. |

Operations: load.

API path: `/v2/cdn/taxonomy_terms/{id}`



## Entities


### Asset

Create an instance: `const asset = client.Asset()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alt` | `string | null` | Alt text for the asset (default language). |
| `asset_folder_id` | `number | null` | Id of the folder that contains this asset. |
| `content_length` | `number | null` | The content length in bytes. |
| `content_type` | `string | null` | The asset’s MIME type. |
| `copyright` | `string | null` | Copyright text. |
| `created_at` | `string | null` | Creation timestamp. |
| `expire_at` | `string | null` | Expiration timestamp. |
| `filename` | `string` | Full path of the asset, including the file name. |
| `focus` | `string | null` | Focus. |
| `is_private` | `boolean` | Defines if the asset should be inaccessible to the public. |
| `signed_url` | `string | null` | The signed URL for the asset. |
| `title` | `string | null` | Title of the asset. |
| `updated_at` | `string | null` | Latest update timestamp. |

#### Example: Load

```ts
const asset = await client.Asset().load({ filename: 'filename', token: 'token' })
```


### DataSource

Create an instance: `const data_source = client.DataSource()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | Creation timestamp. |
| `cv` | `number | null` | Cached version Unix timestamp. |
| `datasource` | `Record<string, any>` | A single data source object. |
| `dimensions` | `any[]` | An array listing the dimensions defined for the data source. |
| `id` | `number` | Data source ID. |
| `name` | `string` | Data source name. |
| `slug` | `string` | Data source `slug`. |
| `updated_at` | `string` | Latest update timestamp. |

#### Example: Load

```ts
const data_source = await client.DataSource().load({ id: 'data_source_id', token: 'token' })
```

#### Example: List

```ts
const data_sources = await client.DataSource().list({ token: "example" })
```


### DataSourceEntry

Create an instance: `const data_source_entry = client.DataSourceEntry()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `dimension_value` | `string | null` | Entry value (requested dimension). |
| `id` | `number` | Entry ID. |
| `name` | `string` | Entry name. |
| `value` | `string` | Entry value (default dimension). |

#### Example: List

```ts
const data_source_entrys = await client.DataSourceEntry().list({ token: "example" })
```


### Experiment

Create an instance: `const experiment = client.Experiment()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `display_name` | `string` | Human-readable display name. |
| `id` | `number` | Numeric ID of the experiment. |
| `name` | `string` | Internal name (lowercase letters, numbers, and underscores). |
| `story_ids` | `any[]` | IDs of [stories](https://www.storyblok.com/docs/api/content-delivery/v2/stories/the-story-object) assigned to the experiment. |
| `variants` | `any[]` | Variants belonging to the experiment. |

#### Example: List

```ts
const experiments = await client.Experiment().list({ token: "example" })
```


### Link

Create an instance: `const link = client.Link()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `alternates` | `any[]` | An array that contains objects correlating to the language versions defined using [field-level translation](https://www.storyblok.com/docs/concepts/internationalization#field-level-translation). |
| `created_at` | `string | null` | Creation timestamp. |
| `id` | `number` | Story or folder `id`. |
| `is_folder` | `boolean` | Returns `true` if the item is a folder. |
| `is_startpage` | `boolean` | Returns `true` if the story is the folder’s root. |
| `name` | `string` | Story or folder name. |
| `parent_id` | `number` | Parent folder ID. |
| `path` | `string | null` | Real path defined in the story’s entry configuration. |
| `position` | `number` | Numeric representation of the story’s position in the folder. |
| `published` | `boolean` | Returns `true` if the story is currently published. |
| `published_at` | `string | null` | Latest publication timestamp. |
| `real_path` | `string | null` | Either the full slug of the story or folder with a leading `/`, or the value of the real path defined in the story’s entry configuration with a leading `/`. |
| `slug` | `string` | Story or folder full slug. |
| `updated_at` | `string | null` | Latest update timestamp. |
| `uuid` | `string` | Story or folder `uuid`. |

#### Example: Load

```ts
const link = await client.Link().load({ id: 'link_id', token: 'token' })
```


### Space

Create an instance: `const space = client.Space()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `string` | Domain associated with the space (configured under **Visual Editor** → **Location**). |
| `id` | `number` | Space ID. |
| `language_codes` | `any[]` | An array of language codes configured in the space. |
| `name` | `string` | Space name. |
| `version` | `number` | Cached version Unix timestamp. |

#### Example: Load

```ts
const space = await client.Space().load({ token: 'token' })
```


### Story

Create an instance: `const story = client.Story()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cv` | `number` | Cached version Unix timestamp. |
| `id` | `string` |  |
| `link_uuids` | `any[]` | An array of all linked stories’ UUIDs. |
| `links` | `any[]` | An array of resolved links. |
| `rel_uuids` | `any[]` | An array of all referenced stories’ UUIDs. |
| `rels` | `any[]` | An array of resolved stories. |
| `stories` | `any[]` | An array of story objects. |
| `story` | `any` | The complete story object. |

#### Example: Load

```ts
const story = await client.Story().load({ id: 'story_id', token: 'token' })
```

#### Example: List

```ts
const storys = await client.Story().list({ token: "example" })
```


### Tag

Create an instance: `const tag = client.Tag()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | The tag name. |
| `tag_on_stories` | `number` | The number of distinct stories this tag appears on (only present when all_tags parameter is true). |
| `taggings_count` | `number` | The number of stories that include this tag. |

#### Example: List

```ts
const tags = await client.Tag().list({ token: "example" })
```


### Taxonomy

Create an instance: `const taxonomy = client.Taxonomy()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `associated_content` | `any[]` | An array of story objects associated with the taxonomy. |
| `children` | `any[]` | An array of sub-terms objects. |
| `created_at` | `string` | Creation timestamp. |
| `cv` | `number | null` |  |
| `description` | `string | null` | The taxonomy’s description. |
| `display_name` | `string` | The taxonomy’s name. |
| `id` | `string` | The taxonomy’s ID. |
| `last_activity_at` | `string` | Latest update timestamp. |
| `last_author` | `Record<string, any> | null` | An object that contains the details of user who created the term. |
| `last_author_id` | `string | null` | The user’s ID. |
| `name` | `string` | The taxonomy’s technical name. |
| `parent_id` | `string | null` | The top-level term’s ID. |
| `taxonomy` | `Record<string, any>` | An object that contains a taxonomy. |
| `terms_count` | `number` | The number sub-terms (at any depth). |
| `updated_at` | `string` | Latest update timestamp. |

#### Example: Load

```ts
const taxonomy = await client.Taxonomy().load({ id: 'taxonomy_id', token: 'token' })
```

#### Example: List

```ts
const taxonomys = await client.Taxonomy().list({ token: "example" })
```


### TaxonomyTerm

Create an instance: `const taxonomy_term = client.TaxonomyTerm()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cv` | `number | null` |  |
| `id` | `string` |  |
| `taxonomy_term` | `Record<string, any>` | An object that contains a taxonomy. |

#### Example: Load

```ts
const taxonomy_term = await client.TaxonomyTerm().load({ id: 'taxonomy_term_id', token: 'token' })
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
storyblok-sdk/
├── src/
│   ├── StoryblokSdkSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { StoryblokSdkSDK } from '@voxgig-sdk/storyblok-sdk'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const space = client.Space()
await space.load({ token: "example" })

// space.data() now returns the space data from the last `load`
// space.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
