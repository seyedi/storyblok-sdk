# Storyblok Content Delivery API

CDN endpoints for your Storyblok space

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 10 entities and 14 HTTP routes. There are 4 SDK targets.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Asset

Results: Asset returned.

SDK operations: `load`.

Key fields to recognise:

- `alt`: Alt text for the asset (default language).
- `asset_folder_id`: Id of the folder that contains this asset.
- `content_length`: The content length in bytes.
- `content_type`: The asset’s MIME type.
- `copyright`: Copyright text.

### DataSource

Results: Data sources returned.; Data source Found.

SDK operations: `list`, `load`.

Key fields to recognise:

- `created_at`: Creation timestamp. Supports ISO 8601.
- `cv`: Cached version Unix timestamp. Learn more in the [Caching concept](https://www.storyblok.com/docs/concepts/caching).
- `datasource`: A single data source object.
- `dimensions`: An array listing the dimensions defined for the data source.
- `id`: Data source ID.

### DataSourceEntry

Results: `datasource_entries` returned.

SDK operations: `list`.

Key fields to recognise:

- `dimension_value`: Entry value (requested dimension).
- `id`: Entry ID.
- `name`: Entry name.
- `value`: Entry value (default dimension).

### Experiment

Results: Running experiments returned.

SDK operations: `list`.

Key fields to recognise:

- `display_name`: Human-readable display name.
- `id`: Numeric ID of the experiment.
- `name`: Internal name (lowercase letters, numbers, and underscores).
- `story_ids`: IDs of [stories](https://www.storyblok.com/docs/api/content-delivery/v2/stories/the-story-object) assigned to the experiment.
- `variants`: Variants belonging to the experiment.

### Link

Results: Links returned.; Link Found.

SDK operations: `load`.

Key fields to recognise:

- `alternates`: An array that contains objects correlating to the language versions defined using [field-level translation](https://www.storyblok.com/docs/concepts/internationalization#field-level-translation). The `alternates` parameter is different from the story alternates defined in the [Dimensions app](https://www.storyblok.com/apps/locales) when using [folder-level translation](https://www.storyblok.com/docs/concepts/internationalization#folder-level-translation).
- `created_at`: Creation timestamp. Supports ISO 8601.
- `id`: Story or folder `id`.
- `is_folder`: Returns `true` if the item is a folder.
- `is_startpage`: Returns `true` if the story is the folder’s root.

### Space

Results: Space returned.

SDK operations: `load`.

Key fields to recognise:

- `domain`: Domain associated with the space (configured under **Visual Editor** → **Location**).
- `id`: Space ID.
- `language_codes`: An array of language codes configured in the space.
- `name`: Space name.
- `version`: Cached version Unix timestamp. Learn more in the [Caching concept](https://www.storyblok.com/docs/concepts/caching).

### Story

Results: Stories listed.; Story Found.

SDK operations: `list`, `load`.

Key fields to recognise:

- `cv`: Cache version.
- `id`: Story ID.
- `link_uuids`: An array of all linked stories’ UUIDs.
- `links`: An array of resolved links.
- `rel_uuids`: An array of all referenced stories’ UUIDs.

### Tag

Results: Tags returned.

SDK operations: `list`.

Key fields to recognise:

- `name`: The tag name.
- `tag_on_stories`: The number of distinct stories this tag appears on (only present when `all_tags` parameter is true).
- `taggings_count`: The number of stories that include this tag.

### Taxonomy

Results: Taxonomies returned.; Taxonomy retrieved.

SDK operations: `list`, `load`.

Key fields to recognise:

- `associated_content`: An array of story objects associated with the taxonomy.
- `children`: An array of sub-terms objects.
- `created_at`: Creation timestamp. Supports ISO 8601.
- `description`: The taxonomy’s description.
- `display_name`: The taxonomy’s name.

### TaxonomyTerm

Results: Term retrieved.

SDK operations: `load`.

Key fields to recognise:

- `id`: The taxonomy’s ID.
- `taxonomy_term`: An object that contains a taxonomy.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Asset | `load` | `GET /v2/cdn/assets/me` | Required |
| DataSource | `list` | `GET /v2/cdn/datasources` | Required |
| DataSource | `load` | `GET /v2/cdn/datasources/{id}` | Required |
| DataSourceEntry | `list` | `GET /v2/cdn/datasource_entries` | Required |
| Experiment | `list` | `GET /v2/cdn/experiments` | Required |
| Link | `load` | `GET /v2/cdn/links` | Required |
| Link | `load` | `GET /v2/cdn/links/{id}` | Required |
| Space | `load` | `GET /v2/cdn/spaces/me` | Required |
| Story | `list` | `GET /v2/cdn/stories` | Required |
| Story | `load` | `GET /v2/cdn/stories/{id}` | Required |
| Tag | `list` | `GET /v2/cdn/tags` | Required |
| Taxonomy | `list` | `GET /v2/cdn/taxonomies` | Required |
| Taxonomy | `load` | `GET /v2/cdn/taxonomies/{id}` | Required |
| TaxonomyTerm | `load` | `GET /v2/cdn/taxonomy_terms/{id}` | Required |

## Connect to the API

- European Union: `https://api.storyblok.com`
- United States: `https://api-us.storyblok.com`
- Canada: `https://api-ca.storyblok.com`
- Australia: `https://api-au.storyblok.com`
- China: `https://app.storyblokchina.cn`

The default credential is sent in the `token` query.

> Use read-only access tokens to view the content and assets in a specific space. To manage per-space tokens and generate new ones, select the space and open Settings → Access Tokens.
>
> Learn more in the [Access Tokens developer concept](https://www.storyblok.com/docs/concepts/access-tokens).

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| JavaScript | `js/` | Build from source |
| Python | `py/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `test`: In-memory mock transport for testing without a live server

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

