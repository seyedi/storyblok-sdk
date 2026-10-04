
const { BaseFeature } = require('./feature/base/BaseFeature')
const { TestFeature } = require('./feature/test/TestFeature')



const FEATURE_CLASS = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named requires above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
//
// Read by SecretsFeature through a DEFERRED require of this module: the
// requires above make the pair circular, and this file replaces
// module.exports at the end of its body, so anything reading the map at
// module load would get undefined. See tm/js/src/feature/secrets.
const FEATURE_PLUGINS = {
  
}


class Config {

  makeFeature(fn) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(fn) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'StoryblokSdk',
        slug: "storyblok-sdk",
    version: "0.0.1",
    target: "js",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },

  }


  options = {
    base: "https://api.storyblok.com",

    auth: {
      prefix: '',
      in: 'query',
      name: 'token',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        asset: {
        },
  
        data_source: {
        },
  
        data_source_entry: {
        },
  
        experiment: {
        },
  
        link: {
        },
  
        space: {
        },
  
        story: {
        },
  
        tag: {
        },
  
        taxonomy: {
        },
  
        taxonomy_term: {
        },
  
    }
  }


  entity = {
    "asset": {
      "fields": [
        {
          "name": "alt",
          "title": "Alt",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "Alt text for the asset (default language)."
        },
        {
          "name": "asset_folder_id",
          "title": "Asset Folder Id",
          "type": [
            "`$ONE`",
            [
              "`$INTEGER`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "Id of the folder that contains this asset."
        },
        {
          "name": "content_length",
          "title": "Content Length",
          "type": [
            "`$ONE`",
            [
              "`$INTEGER`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "The content length in bytes."
        },
        {
          "name": "content_type",
          "title": "Content Type",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "The asset’s MIME type."
        },
        {
          "name": "copyright",
          "title": "Copyright",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "Copyright text."
        },
        {
          "name": "created_at",
          "title": "Created At",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "Creation timestamp.",
          "format": "date-time"
        },
        {
          "name": "expire_at",
          "title": "Expire At",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "Expiration timestamp.",
          "format": "date-time"
        },
        {
          "name": "filename",
          "title": "Filename",
          "type": "`$STRING`",
          "req": true,
          "short": "Full path of the asset, including the file name."
        },
        {
          "name": "focus",
          "title": "Focus",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "Focus."
        },
        {
          "name": "is_private",
          "title": "Is Private",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "Defines if the asset should be inaccessible to the public."
        },
        {
          "name": "signed_url",
          "title": "Signed Url",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "short": "The signed URL for the asset."
        },
        {
          "name": "title",
          "title": "Title",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "Title of the asset."
        },
        {
          "name": "updated_at",
          "title": "Updated At",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "Latest update timestamp.",
          "format": "date-time"
        }
      ],
      "name": "asset",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v2/cdn/assets/me",
              "segments": [
                {
                  "lit": "v2"
                },
                {
                  "lit": "cdn"
                },
                {
                  "lit": "assets"
                },
                {
                  "lit": "me"
                }
              ],
              "parts": [
                "v2",
                "cdn",
                "assets",
                "me"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.asset`"
              },
              "args": {
                "query": [
                  {
                    "name": "filename",
                    "orig": "filename",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "filename"
                  },
                  {
                    "name": "token",
                    "orig": "token",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "ask9soUkv02QqbZgmZdeDAtt"
                  }
                ]
              },
              "select": {
                "$action": "me",
                "exist": [
                  "filename",
                  "token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "data_source": {
      "fields": [
        {
          "name": "created_at",
          "title": "Created At",
          "type": "`$STRING`",
          "short": "Creation timestamp.",
          "format": "date-time"
        },
        {
          "name": "cv",
          "title": "Cv",
          "type": [
            "`$ONE`",
            [
              "`$INTEGER`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "Cached version Unix timestamp."
        },
        {
          "name": "datasource",
          "title": "Datasource",
          "type": "`$OBJECT`",
          "req": true,
          "short": "A single data source object."
        },
        {
          "name": "dimensions",
          "title": "Dimensions",
          "type": "`$ARRAY`",
          "req": true,
          "short": "An array listing the dimensions defined for the data source."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Data source ID."
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "short": "Data source name."
        },
        {
          "name": "slug",
          "title": "Slug",
          "type": "`$STRING`",
          "req": true,
          "short": "Data source `slug`."
        },
        {
          "name": "updated_at",
          "title": "Updated At",
          "type": "`$STRING`",
          "short": "Latest update timestamp.",
          "format": "date-time"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "data_source",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v2/cdn/datasources",
              "segments": [
                {
                  "lit": "v2"
                },
                {
                  "lit": "cdn"
                },
                {
                  "lit": "datasources"
                }
              ],
              "parts": [
                "v2",
                "cdn",
                "datasources"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.datasources`"
              },
              "args": {
                "query": [
                  {
                    "name": "by_id",
                    "orig": "by_ids",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "12312,234234"
                  },
                  {
                    "name": "cv",
                    "orig": "cv",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1541863983
                  },
                  {
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1
                  },
                  {
                    "name": "per_page",
                    "orig": "per_page",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 25
                  },
                  {
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "labels"
                  },
                  {
                    "name": "token",
                    "orig": "token",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "ask9soUkv02QqbZgmZdeDAtt"
                  },
                  {
                    "name": "version",
                    "orig": "version",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "published"
                  }
                ]
              },
              "select": {
                "exist": [
                  "by_id",
                  "cv",
                  "page",
                  "per_page",
                  "search",
                  "token",
                  "version"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v2/cdn/datasources/{id}",
              "segments": [
                {
                  "lit": "v2"
                },
                {
                  "lit": "cdn"
                },
                {
                  "lit": "datasources"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "v2",
                "cdn",
                "datasources",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "labels"
                  }
                ],
                "query": [
                  {
                    "name": "cv",
                    "orig": "cv",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1541863983
                  },
                  {
                    "name": "token",
                    "orig": "token",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "ask9soUkv02QqbZgmZdeDAtt"
                  },
                  {
                    "name": "version",
                    "orig": "version",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "published"
                  }
                ]
              },
              "select": {
                "exist": [
                  "cv",
                  "id",
                  "token",
                  "version"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "data_source_entry": {
      "fields": [
        {
          "name": "dimension_value",
          "title": "Dimension Value",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "Entry value (requested dimension)."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Entry ID."
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "short": "Entry name."
        },
        {
          "name": "value",
          "title": "Value",
          "type": "`$STRING`",
          "req": true,
          "short": "Entry value (default dimension)."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "data_source_entry",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v2/cdn/datasource_entries",
              "segments": [
                {
                  "lit": "v2"
                },
                {
                  "lit": "cdn"
                },
                {
                  "lit": "datasource_entries"
                }
              ],
              "parts": [
                "v2",
                "cdn",
                "datasource_entries"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.datasource_entries`"
              },
              "args": {
                "query": [
                  {
                    "name": "cv",
                    "orig": "cv",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1541863983
                  },
                  {
                    "name": "datasource",
                    "orig": "datasource",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "labels"
                  },
                  {
                    "name": "dimension",
                    "orig": "dimension",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "en"
                  },
                  {
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1
                  },
                  {
                    "name": "per_page",
                    "orig": "per_page",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 25
                  },
                  {
                    "name": "token",
                    "orig": "token",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "ask9soUkv02QqbZgmZdeDAtt"
                  }
                ]
              },
              "select": {
                "exist": [
                  "cv",
                  "datasource",
                  "dimension",
                  "page",
                  "per_page",
                  "token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "experiment": {
      "fields": [
        {
          "name": "display_name",
          "title": "Display Name",
          "type": "`$STRING`",
          "req": true,
          "short": "Human-readable display name."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Numeric ID of the experiment."
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "short": "Internal name (lowercase letters, numbers, and underscores)."
        },
        {
          "name": "story_ids",
          "title": "Story Ids",
          "type": "`$ARRAY`",
          "req": true,
          "short": "IDs of [stories](https://www.storyblok.com/docs/api/content-delivery/v2/stories/the-story-object) assigned to the experiment."
        },
        {
          "name": "variants",
          "title": "Variants",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Variants belonging to the experiment."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "experiment",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v2/cdn/experiments",
              "segments": [
                {
                  "lit": "v2"
                },
                {
                  "lit": "cdn"
                },
                {
                  "lit": "experiments"
                }
              ],
              "parts": [
                "v2",
                "cdn",
                "experiments"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.experiments`"
              },
              "args": {
                "query": [
                  {
                    "name": "cv",
                    "orig": "cv",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1541863983
                  },
                  {
                    "name": "token",
                    "orig": "token",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "ask9soUkv02QqbZgmZdeDAtt"
                  }
                ]
              },
              "select": {
                "exist": [
                  "cv",
                  "token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "link": {
      "fields": [
        {
          "name": "alternates",
          "title": "Alternates",
          "type": "`$ARRAY`",
          "short": "An array that contains objects correlating to the language versions defined using [field-level translation](https://www.storyblok.com/docs/concepts/internationalization#field-level-translation)."
        },
        {
          "name": "created_at",
          "title": "Created At",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "short": "Creation timestamp.",
          "format": "date-time"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Story or folder `id`."
        },
        {
          "name": "is_folder",
          "title": "Is Folder",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "Returns `true` if the item is a folder."
        },
        {
          "name": "is_startpage",
          "title": "Is Startpage",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "Returns `true` if the story is the folder’s root."
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "short": "Story or folder name."
        },
        {
          "name": "parent_id",
          "title": "Parent Id",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Parent folder ID."
        },
        {
          "name": "path",
          "title": "Path",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "short": "Real path defined in the story’s entry configuration."
        },
        {
          "name": "position",
          "title": "Position",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Numeric representation of the story’s position in the folder."
        },
        {
          "name": "published",
          "title": "Published",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "Returns `true` if the story is currently published."
        },
        {
          "name": "published_at",
          "title": "Published At",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "short": "Latest publication timestamp.",
          "format": "date-time"
        },
        {
          "name": "real_path",
          "title": "Real Path",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "short": "Either the full slug of the story or folder with a leading `/`, or the value of the real path defined in the story’s entry configuration with a leading `/`."
        },
        {
          "name": "slug",
          "title": "Slug",
          "type": "`$STRING`",
          "req": true,
          "short": "Story or folder full slug."
        },
        {
          "name": "updated_at",
          "title": "Updated At",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "short": "Latest update timestamp.",
          "format": "date-time"
        },
        {
          "name": "uuid",
          "title": "Uuid",
          "type": "`$STRING`",
          "req": true,
          "short": "Story or folder `uuid`.",
          "format": "uuid"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "link",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v2/cdn/links",
              "segments": [
                {
                  "lit": "v2"
                },
                {
                  "lit": "cdn"
                },
                {
                  "lit": "links"
                }
              ],
              "parts": [
                "v2",
                "cdn",
                "links"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.links`"
              },
              "args": {
                "query": [
                  {
                    "name": "by_uuid",
                    "orig": "by_uuid",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "a78b2116-c26d-4d23-9cbe-fec477847b0e"
                  },
                  {
                    "name": "cv",
                    "orig": "cv",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1541863983
                  },
                  {
                    "name": "include_date",
                    "orig": "include_dates",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "1"
                  },
                  {
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1
                  },
                  {
                    "name": "paginated",
                    "orig": "paginated",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "0"
                  },
                  {
                    "name": "per_page",
                    "orig": "per_page",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 25
                  },
                  {
                    "name": "starts_with",
                    "orig": "starts_with",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "de/beitraege"
                  },
                  {
                    "name": "token",
                    "orig": "token",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "ask9soUkv02QqbZgmZdeDAtt"
                  },
                  {
                    "name": "version",
                    "orig": "version",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "published"
                  },
                  {
                    "name": "with_parent",
                    "orig": "with_parent",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "0"
                  }
                ]
              },
              "select": {
                "exist": [
                  "by_uuid",
                  "cv",
                  "include_date",
                  "page",
                  "paginated",
                  "per_page",
                  "starts_with",
                  "token",
                  "version",
                  "with_parent"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v2/cdn/links/{id}",
              "segments": [
                {
                  "lit": "v2"
                },
                {
                  "lit": "cdn"
                },
                {
                  "lit": "links"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "v2",
                "cdn",
                "links",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.link`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "a78b2116-c26d-4d23-9cbe-fec477847b0e"
                  }
                ],
                "query": [
                  {
                    "name": "cv",
                    "orig": "cv",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1541863983
                  },
                  {
                    "name": "include_date",
                    "orig": "include_dates",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "1"
                  },
                  {
                    "name": "token",
                    "orig": "token",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "ask9soUkv02QqbZgmZdeDAtt"
                  }
                ]
              },
              "select": {
                "exist": [
                  "cv",
                  "id",
                  "include_date",
                  "token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "space": {
      "fields": [
        {
          "name": "domain",
          "title": "Domain",
          "type": "`$STRING`",
          "req": true,
          "short": "Domain associated with the space (configured under **Visual Editor** → **Location**)."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Space ID."
        },
        {
          "name": "language_codes",
          "title": "Language Codes",
          "type": "`$ARRAY`",
          "req": true,
          "short": "An array of language codes configured in the space."
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "short": "Space name."
        },
        {
          "name": "version",
          "title": "Version",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Cached version Unix timestamp."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "space",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v2/cdn/spaces/me",
              "segments": [
                {
                  "lit": "v2"
                },
                {
                  "lit": "cdn"
                },
                {
                  "lit": "spaces"
                },
                {
                  "lit": "me"
                }
              ],
              "parts": [
                "v2",
                "cdn",
                "spaces",
                "me"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.space`"
              },
              "args": {
                "query": [
                  {
                    "name": "token",
                    "orig": "token",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "ask9soUkv02QqbZgmZdeDAtt"
                  },
                  {
                    "name": "version",
                    "orig": "version",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "published"
                  }
                ]
              },
              "select": {
                "$action": "me",
                "exist": [
                  "token",
                  "version"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "story": {
      "fields": [
        {
          "name": "cv",
          "title": "Cv",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Cached version Unix timestamp."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "link_uuids",
          "title": "Link Uuids",
          "type": "`$ARRAY`",
          "short": "An array of all linked stories’ UUIDs."
        },
        {
          "name": "links",
          "title": "Links",
          "type": "`$ARRAY`",
          "short": "An array of resolved links."
        },
        {
          "name": "rel_uuids",
          "title": "Rel Uuids",
          "type": "`$ARRAY`",
          "short": "An array of all referenced stories’ UUIDs."
        },
        {
          "name": "rels",
          "title": "Rels",
          "type": "`$ARRAY`",
          "short": "An array of resolved stories."
        },
        {
          "name": "stories",
          "title": "Stories",
          "type": "`$ARRAY`",
          "req": true,
          "short": "An array of story objects."
        },
        {
          "name": "story",
          "title": "Story",
          "type": "`$ANY`",
          "req": true,
          "short": "The complete story object."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "story",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v2/cdn/stories",
              "segments": [
                {
                  "lit": "v2"
                },
                {
                  "lit": "cdn"
                },
                {
                  "lit": "stories"
                }
              ],
              "parts": [
                "v2",
                "cdn",
                "stories"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "by_id",
                    "orig": "by_ids",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "335015953,335015954"
                  },
                  {
                    "name": "by_slug",
                    "orig": "by_slugs",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "posts/my-third-post,posts/my-second-post"
                  },
                  {
                    "name": "by_uuid",
                    "orig": "by_uuids",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "a78b2116-c26d-4d23-9cbe-fec477847b0e,9683820e-fc17-429e-ba23-eb41f26c0776"
                  },
                  {
                    "name": "by_uuids_ordered",
                    "orig": "by_uuids_ordered",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "a78b2116-c26d-4d23-9cbe-fec477847b0e,9683820e-fc17-429e-ba23-eb41f26c0776"
                  },
                  {
                    "name": "content_type",
                    "orig": "content_type",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "page"
                  },
                  {
                    "name": "cv",
                    "orig": "cv",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1234
                  },
                  {
                    "name": "excluding_field",
                    "orig": "excluding_fields",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "title,body"
                  },
                  {
                    "name": "excluding_id",
                    "orig": "excluding_ids",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "335015953,335015954"
                  },
                  {
                    "name": "excluding_slug",
                    "orig": "excluding_slugs",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "homepage"
                  },
                  {
                    "name": "excluding_story_field",
                    "orig": "excluding_story_fields",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "alternates,translated_slugs"
                  },
                  {
                    "name": "fallback_lang",
                    "orig": "fallback_lang",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "de"
                  },
                  {
                    "name": "filter_query",
                    "orig": "filter_query",
                    "type": "`$OBJECT`",
                    "kind": "query",
                    "example": {
                      "role": {
                        "in_array": [
                          "marketer",
                          "developer"
                        ]
                      }
                    }
                  },
                  {
                    "name": "first_published_at_gt",
                    "orig": "first_published_at_gt",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "2025-07-16T08:00:00Z"
                  },
                  {
                    "name": "first_published_at_gte",
                    "orig": "first_published_at_gte",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "2025-07-16T08:00:00Z"
                  },
                  {
                    "name": "first_published_at_lt",
                    "orig": "first_published_at_lt",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "2025-07-16T08:00:00Z"
                  },
                  {
                    "name": "first_published_at_lte",
                    "orig": "first_published_at_lte",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "2025-07-16T08:00:00Z"
                  },
                  {
                    "name": "from_release",
                    "orig": "from_release",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "1"
                  },
                  {
                    "name": "in_workflow_stage",
                    "orig": "in_workflow_stages",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "325604,325605"
                  },
                  {
                    "name": "is_startpage",
                    "orig": "is_startpage",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1
                  },
                  {
                    "name": "language",
                    "orig": "language",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "de"
                  },
                  {
                    "name": "level",
                    "orig": "level",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1
                  },
                  {
                    "name": "only_variant",
                    "orig": "only_variants",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "true"
                  },
                  {
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1
                  },
                  {
                    "name": "per_page",
                    "orig": "per_page",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 25
                  },
                  {
                    "name": "published_at_gt",
                    "orig": "published_at_gt",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "2025-07-16T08:00:00Z"
                  },
                  {
                    "name": "published_at_gte",
                    "orig": "published_at_gte",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "2025-07-16T08:00:00Z"
                  },
                  {
                    "name": "published_at_lt",
                    "orig": "published_at_lt",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "2025-07-16T08:00:00Z"
                  },
                  {
                    "name": "published_at_lte",
                    "orig": "published_at_lte",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "2025-07-16T08:00:00Z"
                  },
                  {
                    "name": "resolve_asset",
                    "orig": "resolve_assets",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1
                  },
                  {
                    "name": "resolve_level",
                    "orig": "resolve_level",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 2
                  },
                  {
                    "name": "resolve_link",
                    "orig": "resolve_links",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "story"
                  },
                  {
                    "name": "resolve_links_level",
                    "orig": "resolve_links_level",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1
                  },
                  {
                    "name": "resolve_relation",
                    "orig": "resolve_relations",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "page.author,page.categories"
                  },
                  {
                    "name": "search_term",
                    "orig": "search_term",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "name"
                  },
                  {
                    "name": "sort_by",
                    "orig": "sort_by",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "created_at:desc"
                  },
                  {
                    "name": "starts_with",
                    "orig": "starts_with",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "blog/posts"
                  },
                  {
                    "name": "token",
                    "orig": "token",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "ask9soUkv02QqbZgmZdeDAtt"
                  },
                  {
                    "name": "updated_at_gt",
                    "orig": "updated_at_gt",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "2025-07-16T08:00:00Z"
                  },
                  {
                    "name": "updated_at_gte",
                    "orig": "updated_at_gte",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "2025-07-16T08:00:00Z"
                  },
                  {
                    "name": "updated_at_lt",
                    "orig": "updated_at_lt",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "2025-07-16T08:00:00Z"
                  },
                  {
                    "name": "updated_at_lte",
                    "orig": "updated_at_lte",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "2025-07-16T08:00:00Z"
                  },
                  {
                    "name": "version",
                    "orig": "version",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "published"
                  },
                  {
                    "name": "with_tag",
                    "orig": "with_tag",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "featured"
                  }
                ]
              },
              "select": {
                "exist": [
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
                  "with_tag"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v2/cdn/stories/{id}",
              "segments": [
                {
                  "lit": "v2"
                },
                {
                  "lit": "cdn"
                },
                {
                  "lit": "stories"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "v2",
                "cdn",
                "stories",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.story`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "home"
                  }
                ],
                "query": [
                  {
                    "name": "content_type",
                    "orig": "content_type",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "page"
                  },
                  {
                    "name": "cv",
                    "orig": "cv",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1121
                  },
                  {
                    "name": "excluding_field",
                    "orig": "excluding_fields",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "title,body"
                  },
                  {
                    "name": "excluding_story_field",
                    "orig": "excluding_story_fields",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "alternates,translated_slugs"
                  },
                  {
                    "name": "fallback_lang",
                    "orig": "fallback_lang",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "de"
                  },
                  {
                    "name": "find_by",
                    "orig": "find_by",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "uuid"
                  },
                  {
                    "name": "from_release",
                    "orig": "from_release",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "1"
                  },
                  {
                    "name": "language",
                    "orig": "language",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "de"
                  },
                  {
                    "name": "resolve_asset",
                    "orig": "resolve_assets",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1
                  },
                  {
                    "name": "resolve_level",
                    "orig": "resolve_level",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 2
                  },
                  {
                    "name": "resolve_link",
                    "orig": "resolve_links",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "story"
                  },
                  {
                    "name": "resolve_links_level",
                    "orig": "resolve_links_level",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1
                  },
                  {
                    "name": "resolve_relation",
                    "orig": "resolve_relations",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "page.author,page.categories"
                  },
                  {
                    "name": "token",
                    "orig": "token",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "ask9soUkv02QqbZgmZdeDAtt"
                  },
                  {
                    "name": "version",
                    "orig": "version",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "published"
                  }
                ]
              },
              "select": {
                "exist": [
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
                  "version"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "tag": {
      "fields": [
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "short": "The tag name."
        },
        {
          "name": "tag_on_stories",
          "title": "Tag On Stories",
          "type": "`$INTEGER`",
          "short": "The number of distinct stories this tag appears on (only present when all_tags parameter is true)."
        },
        {
          "name": "taggings_count",
          "title": "Taggings Count",
          "type": "`$INTEGER`",
          "short": "The number of stories that include this tag."
        }
      ],
      "name": "tag",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v2/cdn/tags",
              "segments": [
                {
                  "lit": "v2"
                },
                {
                  "lit": "cdn"
                },
                {
                  "lit": "tags"
                }
              ],
              "parts": [
                "v2",
                "cdn",
                "tags"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.tags`"
              },
              "args": {
                "query": [
                  {
                    "name": "filter_query",
                    "orig": "filter_query",
                    "type": "`$OBJECT`",
                    "kind": "query"
                  },
                  {
                    "name": "starts_with",
                    "orig": "starts_with",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "blog/posts"
                  },
                  {
                    "name": "token",
                    "orig": "token",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "ask9soUkv02QqbZgmZdeDAtt"
                  },
                  {
                    "name": "version",
                    "orig": "version",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "published"
                  }
                ]
              },
              "select": {
                "exist": [
                  "filter_query",
                  "starts_with",
                  "token",
                  "version"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "taxonomy": {
      "fields": [
        {
          "name": "associated_content",
          "title": "Associated Content",
          "type": "`$ARRAY`",
          "short": "An array of story objects associated with the taxonomy."
        },
        {
          "name": "children",
          "title": "Children",
          "type": "`$ARRAY`",
          "short": "An array of sub-terms objects."
        },
        {
          "name": "created_at",
          "title": "Created At",
          "type": "`$STRING`",
          "req": true,
          "short": "Creation timestamp.",
          "format": "date-time"
        },
        {
          "name": "cv",
          "title": "Cv",
          "type": [
            "`$ONE`",
            [
              "`$INTEGER`",
              "`$NULL`"
            ]
          ],
          "req": true
        },
        {
          "name": "description",
          "title": "Description",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "The taxonomy’s description."
        },
        {
          "name": "display_name",
          "title": "Display Name",
          "type": "`$STRING`",
          "req": true,
          "short": "The taxonomy’s name."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The taxonomy’s ID."
        },
        {
          "name": "last_activity_at",
          "title": "Last Activity At",
          "type": "`$STRING`",
          "short": "Latest update timestamp.",
          "format": "date-time"
        },
        {
          "name": "last_author",
          "title": "Last Author",
          "type": [
            "`$ONE`",
            [
              "`$OBJECT`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "An object that contains the details of user who created the term."
        },
        {
          "name": "last_author_id",
          "title": "Last Author Id",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "The user’s ID."
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "short": "The taxonomy’s technical name."
        },
        {
          "name": "parent_id",
          "title": "Parent Id",
          "type": [
            "`$ONE`",
            [
              "`$STRING`",
              "`$NULL`"
            ]
          ],
          "req": true,
          "short": "The top-level term’s ID."
        },
        {
          "name": "taxonomy",
          "title": "Taxonomy",
          "type": "`$OBJECT`",
          "req": true,
          "short": "An object that contains a taxonomy."
        },
        {
          "name": "terms_count",
          "title": "Terms Count",
          "type": "`$INTEGER`",
          "short": "The number sub-terms (at any depth)."
        },
        {
          "name": "updated_at",
          "title": "Updated At",
          "type": "`$STRING`",
          "req": true,
          "short": "Latest update timestamp.",
          "format": "date-time"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "taxonomy",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v2/cdn/taxonomies",
              "segments": [
                {
                  "lit": "v2"
                },
                {
                  "lit": "cdn"
                },
                {
                  "lit": "taxonomies"
                }
              ],
              "parts": [
                "v2",
                "cdn",
                "taxonomies"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.taxonomies`"
              },
              "args": {
                "query": [
                  {
                    "name": "token",
                    "orig": "token",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "ask9soUkv02QqbZgmZdeDAtt"
                  }
                ]
              },
              "select": {
                "exist": [
                  "token"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v2/cdn/taxonomies/{id}",
              "segments": [
                {
                  "lit": "v2"
                },
                {
                  "lit": "cdn"
                },
                {
                  "lit": "taxonomies"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "v2",
                "cdn",
                "taxonomies",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.taxonomy`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "products"
                  }
                ],
                "query": [
                  {
                    "name": "token",
                    "orig": "token",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "ask9soUkv02QqbZgmZdeDAtt"
                  }
                ]
              },
              "select": {
                "exist": [
                  "id",
                  "token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "taxonomy_term": {
      "fields": [
        {
          "name": "cv",
          "title": "Cv",
          "type": [
            "`$ONE`",
            [
              "`$INTEGER`",
              "`$NULL`"
            ]
          ],
          "req": true
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "taxonomy_term",
          "title": "Taxonomy Term",
          "type": "`$OBJECT`",
          "req": true,
          "short": "An object that contains a taxonomy."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "taxonomy_term",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v2/cdn/taxonomy_terms/{id}",
              "segments": [
                {
                  "lit": "v2"
                },
                {
                  "lit": "cdn"
                },
                {
                  "lit": "taxonomy_terms"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "v2",
                "cdn",
                "taxonomy_terms",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.taxonomy_term`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "200948619272229"
                  }
                ],
                "query": [
                  {
                    "name": "token",
                    "orig": "token",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "ask9soUkv02QqbZgmZdeDAtt"
                  }
                ]
              },
              "select": {
                "exist": [
                  "id",
                  "token"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

module.exports = {
  config,
  FEATURE_PLUGINS,
}

