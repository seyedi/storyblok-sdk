package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "StoryblokSdk",
			"slug": "storyblok-sdk",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.storyblok.com",
			"auth": map[string]any{
				"prefix": "",
				"in": "query",
				"name": "token",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"asset": map[string]any{},
				"data_source": map[string]any{},
				"data_source_entry": map[string]any{},
				"experiment": map[string]any{},
				"link": map[string]any{},
				"space": map[string]any{},
				"story": map[string]any{},
				"tag": map[string]any{},
				"taxonomy": map[string]any{},
				"taxonomy_term": map[string]any{},
			},
		},
		"entity": map[string]any{
			"asset": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "alt",
						"title": "Alt",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "Alt text for the asset (default language).",
					},
					map[string]any{
						"name": "asset_folder_id",
						"title": "Asset Folder Id",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "Id of the folder that contains this asset.",
					},
					map[string]any{
						"name": "content_length",
						"title": "Content Length",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "The content length in bytes.",
					},
					map[string]any{
						"name": "content_type",
						"title": "Content Type",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "The asset’s MIME type.",
					},
					map[string]any{
						"name": "copyright",
						"title": "Copyright",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "Copyright text.",
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "Creation timestamp.",
						"format": "date-time",
					},
					map[string]any{
						"name": "expire_at",
						"title": "Expire At",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "Expiration timestamp.",
						"format": "date-time",
					},
					map[string]any{
						"name": "filename",
						"title": "Filename",
						"type": "`$STRING`",
						"req": true,
						"short": "Full path of the asset, including the file name.",
					},
					map[string]any{
						"name": "focus",
						"title": "Focus",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "Focus.",
					},
					map[string]any{
						"name": "is_private",
						"title": "Is Private",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Defines if the asset should be inaccessible to the public.",
					},
					map[string]any{
						"name": "signed_url",
						"title": "Signed Url",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "The signed URL for the asset.",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "Title of the asset.",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "Latest update timestamp.",
						"format": "date-time",
					},
				},
				"name": "asset",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v2/cdn/assets/me",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "cdn",
									},
									map[string]any{
										"lit": "assets",
									},
									map[string]any{
										"lit": "me",
									},
								},
								"parts": []any{
									"v2",
									"cdn",
									"assets",
									"me",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.asset`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "filename",
											"orig": "filename",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "filename",
										},
										map[string]any{
											"name": "token",
											"orig": "token",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "ask9soUkv02QqbZgmZdeDAtt",
										},
									},
								},
								"select": map[string]any{
									"$action": "me",
									"exist": []any{
										"filename",
										"token",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"data_source": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"short": "Creation timestamp.",
						"format": "date-time",
					},
					map[string]any{
						"name": "cv",
						"title": "Cv",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "Cached version Unix timestamp.",
					},
					map[string]any{
						"name": "datasource",
						"title": "Datasource",
						"type": "`$OBJECT`",
						"req": true,
						"short": "A single data source object.",
					},
					map[string]any{
						"name": "dimensions",
						"title": "Dimensions",
						"type": "`$ARRAY`",
						"req": true,
						"short": "An array listing the dimensions defined for the data source.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Data source ID.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Data source name.",
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
						"req": true,
						"short": "Data source `slug`.",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"short": "Latest update timestamp.",
						"format": "date-time",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "data_source",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v2/cdn/datasources",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "cdn",
									},
									map[string]any{
										"lit": "datasources",
									},
								},
								"parts": []any{
									"v2",
									"cdn",
									"datasources",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.datasources`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "by_id",
											"orig": "by_ids",
											"type": "`$STRING`",
											"kind": "query",
											"example": "12312,234234",
										},
										map[string]any{
											"name": "cv",
											"orig": "cv",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1541863983,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 25,
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
											"example": "labels",
										},
										map[string]any{
											"name": "token",
											"orig": "token",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "ask9soUkv02QqbZgmZdeDAtt",
										},
										map[string]any{
											"name": "version",
											"orig": "version",
											"type": "`$STRING`",
											"kind": "query",
											"example": "published",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"by_id",
										"cv",
										"page",
										"per_page",
										"search",
										"token",
										"version",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v2/cdn/datasources/{id}",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "cdn",
									},
									map[string]any{
										"lit": "datasources",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"v2",
									"cdn",
									"datasources",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "labels",
										},
									},
									"query": []any{
										map[string]any{
											"name": "cv",
											"orig": "cv",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1541863983,
										},
										map[string]any{
											"name": "token",
											"orig": "token",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "ask9soUkv02QqbZgmZdeDAtt",
										},
										map[string]any{
											"name": "version",
											"orig": "version",
											"type": "`$STRING`",
											"kind": "query",
											"example": "published",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cv",
										"id",
										"token",
										"version",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"data_source_entry": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "dimension_value",
						"title": "Dimension Value",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "Entry value (requested dimension).",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Entry ID.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Entry name.",
					},
					map[string]any{
						"name": "value",
						"title": "Value",
						"type": "`$STRING`",
						"req": true,
						"short": "Entry value (default dimension).",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "data_source_entry",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v2/cdn/datasource_entries",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "cdn",
									},
									map[string]any{
										"lit": "datasource_entries",
									},
								},
								"parts": []any{
									"v2",
									"cdn",
									"datasource_entries",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.datasource_entries`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cv",
											"orig": "cv",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1541863983,
										},
										map[string]any{
											"name": "datasource",
											"orig": "datasource",
											"type": "`$STRING`",
											"kind": "query",
											"example": "labels",
										},
										map[string]any{
											"name": "dimension",
											"orig": "dimension",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 25,
										},
										map[string]any{
											"name": "token",
											"orig": "token",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "ask9soUkv02QqbZgmZdeDAtt",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cv",
										"datasource",
										"dimension",
										"page",
										"per_page",
										"token",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"experiment": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "display_name",
						"title": "Display Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Human-readable display name.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Numeric ID of the experiment.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Internal name (lowercase letters, numbers, and underscores).",
					},
					map[string]any{
						"name": "story_ids",
						"title": "Story Ids",
						"type": "`$ARRAY`",
						"req": true,
						"short": "IDs of [stories](https://www.storyblok.com/docs/api/content-delivery/v2/stories/the-story-object) assigned to the experiment.",
					},
					map[string]any{
						"name": "variants",
						"title": "Variants",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Variants belonging to the experiment.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "experiment",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v2/cdn/experiments",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "cdn",
									},
									map[string]any{
										"lit": "experiments",
									},
								},
								"parts": []any{
									"v2",
									"cdn",
									"experiments",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.experiments`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cv",
											"orig": "cv",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1541863983,
										},
										map[string]any{
											"name": "token",
											"orig": "token",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "ask9soUkv02QqbZgmZdeDAtt",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cv",
										"token",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"link": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "alternates",
						"title": "Alternates",
						"type": "`$ARRAY`",
						"short": "An array that contains objects correlating to the language versions defined using [field-level translation](https://www.storyblok.com/docs/concepts/internationalization#field-level-translation).",
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "Creation timestamp.",
						"format": "date-time",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Story or folder `id`.",
					},
					map[string]any{
						"name": "is_folder",
						"title": "Is Folder",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Returns `true` if the item is a folder.",
					},
					map[string]any{
						"name": "is_startpage",
						"title": "Is Startpage",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Returns `true` if the story is the folder’s root.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Story or folder name.",
					},
					map[string]any{
						"name": "parent_id",
						"title": "Parent Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Parent folder ID.",
					},
					map[string]any{
						"name": "path",
						"title": "Path",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "Real path defined in the story’s entry configuration.",
					},
					map[string]any{
						"name": "position",
						"title": "Position",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Numeric representation of the story’s position in the folder.",
					},
					map[string]any{
						"name": "published",
						"title": "Published",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Returns `true` if the story is currently published.",
					},
					map[string]any{
						"name": "published_at",
						"title": "Published At",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "Latest publication timestamp.",
						"format": "date-time",
					},
					map[string]any{
						"name": "real_path",
						"title": "Real Path",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "Either the full slug of the story or folder with a leading `/`, or the value of the real path defined in the story’s entry configuration with a leading `/`.",
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
						"req": true,
						"short": "Story or folder full slug.",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"short": "Latest update timestamp.",
						"format": "date-time",
					},
					map[string]any{
						"name": "uuid",
						"title": "Uuid",
						"type": "`$STRING`",
						"req": true,
						"short": "Story or folder `uuid`.",
						"format": "uuid",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "link",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v2/cdn/links",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "cdn",
									},
									map[string]any{
										"lit": "links",
									},
								},
								"parts": []any{
									"v2",
									"cdn",
									"links",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.links`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "by_uuid",
											"orig": "by_uuid",
											"type": "`$STRING`",
											"kind": "query",
											"example": "a78b2116-c26d-4d23-9cbe-fec477847b0e",
										},
										map[string]any{
											"name": "cv",
											"orig": "cv",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1541863983,
										},
										map[string]any{
											"name": "include_date",
											"orig": "include_dates",
											"type": "`$STRING`",
											"kind": "query",
											"example": "1",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "paginated",
											"orig": "paginated",
											"type": "`$STRING`",
											"kind": "query",
											"example": "0",
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 25,
										},
										map[string]any{
											"name": "starts_with",
											"orig": "starts_with",
											"type": "`$STRING`",
											"kind": "query",
											"example": "de/beitraege",
										},
										map[string]any{
											"name": "token",
											"orig": "token",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "ask9soUkv02QqbZgmZdeDAtt",
										},
										map[string]any{
											"name": "version",
											"orig": "version",
											"type": "`$STRING`",
											"kind": "query",
											"example": "published",
										},
										map[string]any{
											"name": "with_parent",
											"orig": "with_parent",
											"type": "`$STRING`",
											"kind": "query",
											"example": "0",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"by_uuid",
										"cv",
										"include_date",
										"page",
										"paginated",
										"per_page",
										"starts_with",
										"token",
										"version",
										"with_parent",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v2/cdn/links/{id}",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "cdn",
									},
									map[string]any{
										"lit": "links",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"v2",
									"cdn",
									"links",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.link`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "a78b2116-c26d-4d23-9cbe-fec477847b0e",
										},
									},
									"query": []any{
										map[string]any{
											"name": "cv",
											"orig": "cv",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1541863983,
										},
										map[string]any{
											"name": "include_date",
											"orig": "include_dates",
											"type": "`$STRING`",
											"kind": "query",
											"example": "1",
										},
										map[string]any{
											"name": "token",
											"orig": "token",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "ask9soUkv02QqbZgmZdeDAtt",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cv",
										"id",
										"include_date",
										"token",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"space": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "domain",
						"title": "Domain",
						"type": "`$STRING`",
						"req": true,
						"short": "Domain associated with the space (configured under **Visual Editor** → **Location**).",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Space ID.",
					},
					map[string]any{
						"name": "language_codes",
						"title": "Language Codes",
						"type": "`$ARRAY`",
						"req": true,
						"short": "An array of language codes configured in the space.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Space name.",
					},
					map[string]any{
						"name": "version",
						"title": "Version",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Cached version Unix timestamp.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "space",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v2/cdn/spaces/me",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "cdn",
									},
									map[string]any{
										"lit": "spaces",
									},
									map[string]any{
										"lit": "me",
									},
								},
								"parts": []any{
									"v2",
									"cdn",
									"spaces",
									"me",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.space`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "token",
											"orig": "token",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "ask9soUkv02QqbZgmZdeDAtt",
										},
										map[string]any{
											"name": "version",
											"orig": "version",
											"type": "`$STRING`",
											"kind": "query",
											"example": "published",
										},
									},
								},
								"select": map[string]any{
									"$action": "me",
									"exist": []any{
										"token",
										"version",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"story": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cv",
						"title": "Cv",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Cached version Unix timestamp.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "link_uuids",
						"title": "Link Uuids",
						"type": "`$ARRAY`",
						"short": "An array of all linked stories’ UUIDs.",
					},
					map[string]any{
						"name": "links",
						"title": "Links",
						"type": "`$ARRAY`",
						"short": "An array of resolved links.",
					},
					map[string]any{
						"name": "rel_uuids",
						"title": "Rel Uuids",
						"type": "`$ARRAY`",
						"short": "An array of all referenced stories’ UUIDs.",
					},
					map[string]any{
						"name": "rels",
						"title": "Rels",
						"type": "`$ARRAY`",
						"short": "An array of resolved stories.",
					},
					map[string]any{
						"name": "stories",
						"title": "Stories",
						"type": "`$ARRAY`",
						"req": true,
						"short": "An array of story objects.",
					},
					map[string]any{
						"name": "story",
						"title": "Story",
						"type": "`$ANY`",
						"req": true,
						"short": "The complete story object.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "story",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v2/cdn/stories",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "cdn",
									},
									map[string]any{
										"lit": "stories",
									},
								},
								"parts": []any{
									"v2",
									"cdn",
									"stories",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "by_id",
											"orig": "by_ids",
											"type": "`$STRING`",
											"kind": "query",
											"example": "335015953,335015954",
										},
										map[string]any{
											"name": "by_slug",
											"orig": "by_slugs",
											"type": "`$STRING`",
											"kind": "query",
											"example": "posts/my-third-post,posts/my-second-post",
										},
										map[string]any{
											"name": "by_uuid",
											"orig": "by_uuids",
											"type": "`$STRING`",
											"kind": "query",
											"example": "a78b2116-c26d-4d23-9cbe-fec477847b0e,9683820e-fc17-429e-ba23-eb41f26c0776",
										},
										map[string]any{
											"name": "by_uuids_ordered",
											"orig": "by_uuids_ordered",
											"type": "`$STRING`",
											"kind": "query",
											"example": "a78b2116-c26d-4d23-9cbe-fec477847b0e,9683820e-fc17-429e-ba23-eb41f26c0776",
										},
										map[string]any{
											"name": "content_type",
											"orig": "content_type",
											"type": "`$STRING`",
											"kind": "query",
											"example": "page",
										},
										map[string]any{
											"name": "cv",
											"orig": "cv",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1234,
										},
										map[string]any{
											"name": "excluding_field",
											"orig": "excluding_fields",
											"type": "`$STRING`",
											"kind": "query",
											"example": "title,body",
										},
										map[string]any{
											"name": "excluding_id",
											"orig": "excluding_ids",
											"type": "`$STRING`",
											"kind": "query",
											"example": "335015953,335015954",
										},
										map[string]any{
											"name": "excluding_slug",
											"orig": "excluding_slugs",
											"type": "`$STRING`",
											"kind": "query",
											"example": "homepage",
										},
										map[string]any{
											"name": "excluding_story_field",
											"orig": "excluding_story_fields",
											"type": "`$STRING`",
											"kind": "query",
											"example": "alternates,translated_slugs",
										},
										map[string]any{
											"name": "fallback_lang",
											"orig": "fallback_lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "de",
										},
										map[string]any{
											"name": "filter_query",
											"orig": "filter_query",
											"type": "`$OBJECT`",
											"kind": "query",
											"example": map[string]any{
												"role": map[string]any{
													"in_array": []any{
														"marketer",
														"developer",
													},
												},
											},
										},
										map[string]any{
											"name": "first_published_at_gt",
											"orig": "first_published_at_gt",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2025-07-16T08:00:00Z",
										},
										map[string]any{
											"name": "first_published_at_gte",
											"orig": "first_published_at_gte",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2025-07-16T08:00:00Z",
										},
										map[string]any{
											"name": "first_published_at_lt",
											"orig": "first_published_at_lt",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2025-07-16T08:00:00Z",
										},
										map[string]any{
											"name": "first_published_at_lte",
											"orig": "first_published_at_lte",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2025-07-16T08:00:00Z",
										},
										map[string]any{
											"name": "from_release",
											"orig": "from_release",
											"type": "`$STRING`",
											"kind": "query",
											"example": "1",
										},
										map[string]any{
											"name": "in_workflow_stage",
											"orig": "in_workflow_stages",
											"type": "`$STRING`",
											"kind": "query",
											"example": "325604,325605",
										},
										map[string]any{
											"name": "is_startpage",
											"orig": "is_startpage",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "language",
											"orig": "language",
											"type": "`$STRING`",
											"kind": "query",
											"example": "de",
										},
										map[string]any{
											"name": "level",
											"orig": "level",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "only_variant",
											"orig": "only_variants",
											"type": "`$STRING`",
											"kind": "query",
											"example": "true",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 25,
										},
										map[string]any{
											"name": "published_at_gt",
											"orig": "published_at_gt",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2025-07-16T08:00:00Z",
										},
										map[string]any{
											"name": "published_at_gte",
											"orig": "published_at_gte",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2025-07-16T08:00:00Z",
										},
										map[string]any{
											"name": "published_at_lt",
											"orig": "published_at_lt",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2025-07-16T08:00:00Z",
										},
										map[string]any{
											"name": "published_at_lte",
											"orig": "published_at_lte",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2025-07-16T08:00:00Z",
										},
										map[string]any{
											"name": "resolve_asset",
											"orig": "resolve_assets",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "resolve_level",
											"orig": "resolve_level",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 2,
										},
										map[string]any{
											"name": "resolve_link",
											"orig": "resolve_links",
											"type": "`$STRING`",
											"kind": "query",
											"example": "story",
										},
										map[string]any{
											"name": "resolve_links_level",
											"orig": "resolve_links_level",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "resolve_relation",
											"orig": "resolve_relations",
											"type": "`$STRING`",
											"kind": "query",
											"example": "page.author,page.categories",
										},
										map[string]any{
											"name": "search_term",
											"orig": "search_term",
											"type": "`$STRING`",
											"kind": "query",
											"example": "name",
										},
										map[string]any{
											"name": "sort_by",
											"orig": "sort_by",
											"type": "`$STRING`",
											"kind": "query",
											"example": "created_at:desc",
										},
										map[string]any{
											"name": "starts_with",
											"orig": "starts_with",
											"type": "`$STRING`",
											"kind": "query",
											"example": "blog/posts",
										},
										map[string]any{
											"name": "token",
											"orig": "token",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "ask9soUkv02QqbZgmZdeDAtt",
										},
										map[string]any{
											"name": "updated_at_gt",
											"orig": "updated_at_gt",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2025-07-16T08:00:00Z",
										},
										map[string]any{
											"name": "updated_at_gte",
											"orig": "updated_at_gte",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2025-07-16T08:00:00Z",
										},
										map[string]any{
											"name": "updated_at_lt",
											"orig": "updated_at_lt",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2025-07-16T08:00:00Z",
										},
										map[string]any{
											"name": "updated_at_lte",
											"orig": "updated_at_lte",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2025-07-16T08:00:00Z",
										},
										map[string]any{
											"name": "version",
											"orig": "version",
											"type": "`$STRING`",
											"kind": "query",
											"example": "published",
										},
										map[string]any{
											"name": "with_tag",
											"orig": "with_tag",
											"type": "`$STRING`",
											"kind": "query",
											"example": "featured",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"by_id",
										"by_slug",
										"by_uuid",
										"by_uuids_ordered",
										"content_type",
										"cv",
										"excluding_field",
										"excluding_id",
										"excluding_slug",
										"excluding_story_field",
										"fallback_lang",
										"filter_query",
										"first_published_at_gt",
										"first_published_at_gte",
										"first_published_at_lt",
										"first_published_at_lte",
										"from_release",
										"in_workflow_stage",
										"is_startpage",
										"language",
										"level",
										"only_variant",
										"page",
										"per_page",
										"published_at_gt",
										"published_at_gte",
										"published_at_lt",
										"published_at_lte",
										"resolve_asset",
										"resolve_level",
										"resolve_link",
										"resolve_links_level",
										"resolve_relation",
										"search_term",
										"sort_by",
										"starts_with",
										"token",
										"updated_at_gt",
										"updated_at_gte",
										"updated_at_lt",
										"updated_at_lte",
										"version",
										"with_tag",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v2/cdn/stories/{id}",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "cdn",
									},
									map[string]any{
										"lit": "stories",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"v2",
									"cdn",
									"stories",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.story`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "home",
										},
									},
									"query": []any{
										map[string]any{
											"name": "content_type",
											"orig": "content_type",
											"type": "`$STRING`",
											"kind": "query",
											"example": "page",
										},
										map[string]any{
											"name": "cv",
											"orig": "cv",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1121,
										},
										map[string]any{
											"name": "excluding_field",
											"orig": "excluding_fields",
											"type": "`$STRING`",
											"kind": "query",
											"example": "title,body",
										},
										map[string]any{
											"name": "excluding_story_field",
											"orig": "excluding_story_fields",
											"type": "`$STRING`",
											"kind": "query",
											"example": "alternates,translated_slugs",
										},
										map[string]any{
											"name": "fallback_lang",
											"orig": "fallback_lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "de",
										},
										map[string]any{
											"name": "find_by",
											"orig": "find_by",
											"type": "`$STRING`",
											"kind": "query",
											"example": "uuid",
										},
										map[string]any{
											"name": "from_release",
											"orig": "from_release",
											"type": "`$STRING`",
											"kind": "query",
											"example": "1",
										},
										map[string]any{
											"name": "language",
											"orig": "language",
											"type": "`$STRING`",
											"kind": "query",
											"example": "de",
										},
										map[string]any{
											"name": "resolve_asset",
											"orig": "resolve_assets",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "resolve_level",
											"orig": "resolve_level",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 2,
										},
										map[string]any{
											"name": "resolve_link",
											"orig": "resolve_links",
											"type": "`$STRING`",
											"kind": "query",
											"example": "story",
										},
										map[string]any{
											"name": "resolve_links_level",
											"orig": "resolve_links_level",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "resolve_relation",
											"orig": "resolve_relations",
											"type": "`$STRING`",
											"kind": "query",
											"example": "page.author,page.categories",
										},
										map[string]any{
											"name": "token",
											"orig": "token",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "ask9soUkv02QqbZgmZdeDAtt",
										},
										map[string]any{
											"name": "version",
											"orig": "version",
											"type": "`$STRING`",
											"kind": "query",
											"example": "published",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"content_type",
										"cv",
										"excluding_field",
										"excluding_story_field",
										"fallback_lang",
										"find_by",
										"from_release",
										"id",
										"language",
										"resolve_asset",
										"resolve_level",
										"resolve_link",
										"resolve_links_level",
										"resolve_relation",
										"token",
										"version",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"tag": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The tag name.",
					},
					map[string]any{
						"name": "tag_on_stories",
						"title": "Tag On Stories",
						"type": "`$INTEGER`",
						"short": "The number of distinct stories this tag appears on (only present when all_tags parameter is true).",
					},
					map[string]any{
						"name": "taggings_count",
						"title": "Taggings Count",
						"type": "`$INTEGER`",
						"short": "The number of stories that include this tag.",
					},
				},
				"name": "tag",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v2/cdn/tags",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "cdn",
									},
									map[string]any{
										"lit": "tags",
									},
								},
								"parts": []any{
									"v2",
									"cdn",
									"tags",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.tags`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "filter_query",
											"orig": "filter_query",
											"type": "`$OBJECT`",
											"kind": "query",
										},
										map[string]any{
											"name": "starts_with",
											"orig": "starts_with",
											"type": "`$STRING`",
											"kind": "query",
											"example": "blog/posts",
										},
										map[string]any{
											"name": "token",
											"orig": "token",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "ask9soUkv02QqbZgmZdeDAtt",
										},
										map[string]any{
											"name": "version",
											"orig": "version",
											"type": "`$STRING`",
											"kind": "query",
											"example": "published",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"filter_query",
										"starts_with",
										"token",
										"version",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"taxonomy": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "associated_content",
						"title": "Associated Content",
						"type": "`$ARRAY`",
						"short": "An array of story objects associated with the taxonomy.",
					},
					map[string]any{
						"name": "children",
						"title": "Children",
						"type": "`$ARRAY`",
						"short": "An array of sub-terms objects.",
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
						"short": "Creation timestamp.",
						"format": "date-time",
					},
					map[string]any{
						"name": "cv",
						"title": "Cv",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "The taxonomy’s description.",
					},
					map[string]any{
						"name": "display_name",
						"title": "Display Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The taxonomy’s name.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "The taxonomy’s ID.",
					},
					map[string]any{
						"name": "last_activity_at",
						"title": "Last Activity At",
						"type": "`$STRING`",
						"short": "Latest update timestamp.",
						"format": "date-time",
					},
					map[string]any{
						"name": "last_author",
						"title": "Last Author",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$OBJECT`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "An object that contains the details of user who created the term.",
					},
					map[string]any{
						"name": "last_author_id",
						"title": "Last Author Id",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "The user’s ID.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "The taxonomy’s technical name.",
					},
					map[string]any{
						"name": "parent_id",
						"title": "Parent Id",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$STRING`",
								"`$NULL`",
							},
						},
						"req": true,
						"short": "The top-level term’s ID.",
					},
					map[string]any{
						"name": "taxonomy",
						"title": "Taxonomy",
						"type": "`$OBJECT`",
						"req": true,
						"short": "An object that contains a taxonomy.",
					},
					map[string]any{
						"name": "terms_count",
						"title": "Terms Count",
						"type": "`$INTEGER`",
						"short": "The number sub-terms (at any depth).",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"req": true,
						"short": "Latest update timestamp.",
						"format": "date-time",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "taxonomy",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v2/cdn/taxonomies",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "cdn",
									},
									map[string]any{
										"lit": "taxonomies",
									},
								},
								"parts": []any{
									"v2",
									"cdn",
									"taxonomies",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.taxonomies`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "token",
											"orig": "token",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "ask9soUkv02QqbZgmZdeDAtt",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"token",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v2/cdn/taxonomies/{id}",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "cdn",
									},
									map[string]any{
										"lit": "taxonomies",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"v2",
									"cdn",
									"taxonomies",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.taxonomy`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "products",
										},
									},
									"query": []any{
										map[string]any{
											"name": "token",
											"orig": "token",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "ask9soUkv02QqbZgmZdeDAtt",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"token",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"taxonomy_term": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cv",
						"title": "Cv",
						"type": []any{
							"`$ONE`",
							[]any{
								"`$INTEGER`",
								"`$NULL`",
							},
						},
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "taxonomy_term",
						"title": "Taxonomy Term",
						"type": "`$OBJECT`",
						"req": true,
						"short": "An object that contains a taxonomy.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "taxonomy_term",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v2/cdn/taxonomy_terms/{id}",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "cdn",
									},
									map[string]any{
										"lit": "taxonomy_terms",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"v2",
									"cdn",
									"taxonomy_terms",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.taxonomy_term`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "200948619272229",
										},
									},
									"query": []any{
										map[string]any{
											"name": "token",
											"orig": "token",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "ask9soUkv02QqbZgmZdeDAtt",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"token",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
