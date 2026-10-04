import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "asset",
    "accessor": "Asset",
    "op": "load",
    "method": "GET",
    "path": "/v2/cdn/assets/me",
    "action": "me",
    "args": [],
    "select": {
      "filename": "filename",
      "token": "ask9soUkv02QqbZgmZdeDAtt"
    },
    "headers": [],
    "query": [
      "filename",
      "token"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "asset": {
        "alt": "Laser cutting machine in action",
        "asset_folder_id": 456,
        "content_length": 245760,
        "content_type": "image/jpeg",
        "copyright": null,
        "created_at": "2025-02-10T08:12:00.000Z",
        "updated_at": "2025-02-10T08:12:00.000Z",
        "expire_at": "2044-04-20T16:01:26.000Z",
        "filename": "https://a.storyblok.com/f/10/100x100/b482c4d749/laser-image.jpg",
        "focus": null,
        "is_private": false,
        "signed_url": null,
        "title": "Laser Image"
      }
    },
    "idField": "id"
  },
  {
    "entity": "data_source",
    "accessor": "DataSource",
    "op": "list",
    "method": "GET",
    "path": "/v2/cdn/datasources",
    "args": [],
    "select": {
      "by_id": "v1",
      "cv": 1541863983,
      "page": 1,
      "per_page": 25,
      "search": "labels",
      "token": "ask9soUkv02QqbZgmZdeDAtt",
      "version": "published"
    },
    "headers": [],
    "query": [
      "version",
      "cv",
      "search",
      "by_ids",
      "page",
      "per_page",
      "token"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "datasources": [
        {
          "id": 1123,
          "name": "Labels",
          "slug": "labels",
          "dimensions": [
            {
              "id": 1,
              "name": "en",
              "entry_value": "en",
              "datasource_id": 1123
            }
          ],
          "created_at": "2025-02-10T08:12:00.000Z",
          "updated_at": "2025-02-10T08:12:00.000Z"
        },
        {
          "id": 1124,
          "name": "Colors",
          "slug": "colors",
          "dimensions": [],
          "created_at": "2025-02-11T09:00:00.000Z",
          "updated_at": "2025-02-11T09:00:00.000Z"
        }
      ],
      "cv": 1541863983
    },
    "idField": "id"
  },
  {
    "entity": "data_source",
    "accessor": "DataSource",
    "op": "load",
    "method": "GET",
    "path": "/v2/cdn/datasources/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "labels"
      }
    ],
    "select": {
      "cv": 1541863983,
      "token": "ask9soUkv02QqbZgmZdeDAtt",
      "version": "published"
    },
    "headers": [],
    "query": [
      "version",
      "cv",
      "token"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "datasource": {
        "id": 1123,
        "name": "Labels",
        "slug": "labels",
        "dimensions": [
          {
            "id": 1,
            "name": "en",
            "entry_value": "en",
            "datasource_id": 1123
          }
        ],
        "created_at": "2025-02-10T08:12:00.000Z",
        "updated_at": "2025-02-10T08:12:00.000Z"
      },
      "cv": 1541863983
    },
    "idField": "id"
  },
  {
    "entity": "data_source_entry",
    "accessor": "DataSourceEntry",
    "op": "list",
    "method": "GET",
    "path": "/v2/cdn/datasource_entries",
    "args": [],
    "select": {
      "cv": 1541863983,
      "datasource": "labels",
      "dimension": "en",
      "page": 1,
      "per_page": 25,
      "token": "ask9soUkv02QqbZgmZdeDAtt"
    },
    "headers": [],
    "query": [
      "datasource",
      "dimension",
      "cv",
      "page",
      "per_page",
      "token"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "datasource_entries": [
        {
          "id": 1001,
          "name": "de",
          "value": "de",
          "dimension_value": "en"
        },
        {
          "id": 1002,
          "name": "fr",
          "value": "fr",
          "dimension_value": null
        }
      ],
      "cv": 1541863983
    },
    "idField": "id"
  },
  {
    "entity": "experiment",
    "accessor": "Experiment",
    "op": "list",
    "method": "GET",
    "path": "/v2/cdn/experiments",
    "args": [],
    "select": {
      "cv": 1541863983,
      "token": "ask9soUkv02QqbZgmZdeDAtt"
    },
    "headers": [],
    "query": [
      "cv",
      "token"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "experiments": [
        {
          "id": 501,
          "name": "homepage_hero_test",
          "display_name": "Homepage Hero Test",
          "story_ids": [
            371891025
          ],
          "variants": [
            {
              "name": "control",
              "display_name": "Control",
              "public_id": "var_abc123def456",
              "weight": 50,
              "is_control": true,
              "story_mappings": [
                {
                  "original_story_id": 371891025,
                  "original_slug": "home",
                  "variant_story_id": null,
                  "variant_slug": null
                }
              ]
            },
            {
              "name": "variant_a",
              "display_name": "Variant A",
              "public_id": "var_789ghi012jkl",
              "weight": 50,
              "is_control": false,
              "story_mappings": [
                {
                  "original_story_id": 371891025,
                  "original_slug": "home",
                  "variant_story_id": 371891777,
                  "variant_slug": "home-variant-a"
                }
              ]
            }
          ]
        }
      ],
      "cv": 1709500000
    },
    "idField": "id"
  },
  {
    "entity": "link",
    "accessor": "Link",
    "op": "load",
    "method": "GET",
    "path": "/v2/cdn/links",
    "args": [],
    "select": {
      "by_uuid": "a78b2116-c26d-4d23-9cbe-fec477847b0e",
      "cv": 1541863983,
      "include_date": "v1",
      "page": 1,
      "paginated": "0",
      "per_page": 25,
      "starts_with": "de/beitraege",
      "token": "ask9soUkv02QqbZgmZdeDAtt",
      "version": "published",
      "with_parent": "0"
    },
    "headers": [],
    "query": [
      "starts_with",
      "version",
      "cv",
      "include_dates",
      "by_uuid",
      "with_parent",
      "paginated",
      "page",
      "per_page",
      "token"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "links": {
        "a78b2116-c26d-4d23-9cbe-fec477847b0e": {
          "id": 371891025,
          "uuid": "a78b2116-c26d-4d23-9cbe-fec477847b0e",
          "slug": "home",
          "path": null,
          "real_path": "/home",
          "name": "Home",
          "published": true,
          "parent_id": 0,
          "is_folder": false,
          "is_startpage": true,
          "position": 0,
          "published_at": "2025-01-15T09:32:10.000Z",
          "created_at": "2025-01-15T09:30:00.000Z",
          "updated_at": "2025-06-02T14:12:05.000Z",
          "alternates": []
        },
        "de": {
          "id": 371890998,
          "uuid": "2c6b9a4a-2b9c-4d3f-9e21-2a6b6a2f0b3d",
          "slug": "de",
          "path": null,
          "real_path": "/de",
          "name": "de",
          "published": false,
          "parent_id": 0,
          "is_folder": true,
          "is_startpage": false,
          "position": 1,
          "published_at": null,
          "created_at": "2025-01-15T09:30:00.000Z",
          "updated_at": "2025-01-15T09:30:00.000Z",
          "alternates": []
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "link",
    "accessor": "Link",
    "op": "load",
    "method": "GET",
    "path": "/v2/cdn/links/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "a78b2116-c26d-4d23-9cbe-fec477847b0e"
      }
    ],
    "select": {
      "cv": 1541863983,
      "include_date": "v1",
      "token": "ask9soUkv02QqbZgmZdeDAtt"
    },
    "headers": [],
    "query": [
      "cv",
      "include_dates",
      "token"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "link": {
        "id": 371891025,
        "uuid": "a78b2116-c26d-4d23-9cbe-fec477847b0e",
        "slug": "home",
        "path": null,
        "real_path": "/home",
        "name": "Home",
        "published": true,
        "parent_id": 0,
        "is_folder": false,
        "is_startpage": true,
        "position": 0,
        "published_at": "2025-01-15T09:32:10.000Z",
        "created_at": "2025-01-15T09:30:00.000Z",
        "updated_at": "2025-06-02T14:12:05.000Z",
        "alternates": []
      }
    },
    "idField": "id"
  },
  {
    "entity": "space",
    "accessor": "Space",
    "op": "load",
    "method": "GET",
    "path": "/v2/cdn/spaces/me",
    "action": "me",
    "args": [],
    "select": {
      "token": "ask9soUkv02QqbZgmZdeDAtt",
      "version": "published"
    },
    "headers": [],
    "query": [
      "version",
      "token"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "space": {
        "id": 12345,
        "name": "Space A",
        "domain": "http://example.storyblok.com",
        "version": 1717516800,
        "language_codes": [
          "de",
          "fr"
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "story",
    "accessor": "Story",
    "op": "list",
    "method": "GET",
    "path": "/v2/cdn/stories",
    "args": [],
    "select": {
      "by_id": "v1",
      "by_slug": "v1",
      "by_uuid": "v1",
      "by_uuids_ordered": "a78b2116-c26d-4d23-9cbe-fec477847b0e,9683820e-fc17-429e-ba23-eb41f26c0776",
      "content_type": "page",
      "cv": 1234,
      "excluding_field": "v1",
      "excluding_id": "v1",
      "excluding_slug": "v1",
      "excluding_story_field": "v1",
      "fallback_lang": "de",
      "filter_query": "v1",
      "first_published_at_gt": "2025-07-16T08:00:00Z",
      "first_published_at_gte": "2025-07-16T08:00:00Z",
      "first_published_at_lt": "2025-07-16T08:00:00Z",
      "first_published_at_lte": "2025-07-16T08:00:00Z",
      "from_release": "1",
      "in_workflow_stage": "v1",
      "is_startpage": 1,
      "language": "de",
      "level": 1,
      "only_variant": "v1",
      "page": 1,
      "per_page": 25,
      "published_at_gt": "2025-07-16T08:00:00Z",
      "published_at_gte": "2025-07-16T08:00:00Z",
      "published_at_lt": "2025-07-16T08:00:00Z",
      "published_at_lte": "2025-07-16T08:00:00Z",
      "resolve_asset": "v1",
      "resolve_level": 2,
      "resolve_link": "v1",
      "resolve_links_level": 1,
      "resolve_relation": "v1",
      "search_term": "name",
      "sort_by": "created_at:desc",
      "starts_with": "blog/posts",
      "token": "ask9soUkv02QqbZgmZdeDAtt",
      "updated_at_gt": "2025-07-16T08:00:00Z",
      "updated_at_gte": "2025-07-16T08:00:00Z",
      "updated_at_lt": "2025-07-16T08:00:00Z",
      "updated_at_lte": "2025-07-16T08:00:00Z",
      "version": "published",
      "with_tag": "featured"
    },
    "headers": [],
    "query": [
      "version",
      "cv",
      "starts_with",
      "search_term",
      "sort_by",
      "per_page",
      "page",
      "by_slugs",
      "excluding_slugs",
      "published_at_gt",
      "published_at_gte",
      "published_at_lt",
      "published_at_lte",
      "first_published_at_gt",
      "first_published_at_gte",
      "first_published_at_lt",
      "first_published_at_lte",
      "updated_at_gt",
      "updated_at_gte",
      "updated_at_lt",
      "updated_at_lte",
      "in_workflow_stages",
      "content_type",
      "level",
      "resolve_relations",
      "excluding_ids",
      "by_uuids",
      "by_uuids_ordered",
      "by_ids",
      "with_tag",
      "is_startpage",
      "resolve_links",
      "resolve_links_level",
      "from_release",
      "fallback_lang",
      "language",
      "filter_query",
      "excluding_fields",
      "excluding_story_fields",
      "resolve_assets",
      "resolve_level",
      "only_variants",
      "token"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "stories": [
        {
          "name": "Homepage",
          "created_at": "2025-01-15T09:30:00.000Z",
          "updated_at": "2025-06-02T14:12:05.000Z",
          "published_at": "2025-01-15T09:32:10.000Z",
          "id": 371891025,
          "uuid": "8f14e45f-ceea-467e-adc1-5c1b1a3a7b3b",
          "content": {
            "_uid": "b1f8c9a2-3d44-4c2e-9a1e-6e7d2f5c9a10",
            "component": "page",
            "body": [
              {
                "_uid": "1a2b3c4d-5e6f-4a1b-8c2d-9e0f1a2b3c4d",
                "component": "teaser",
                "headline": "Welcome to Storyblok"
              }
            ]
          },
          "slug": "home",
          "full_slug": "home",
          "sort_by_date": null,
          "position": 0,
          "tag_list": [
            "marketing",
            "featured"
          ],
          "is_startpage": true,
          "parent_id": 0,
          "meta_data": null,
          "group_id": "57350688-5a28-49d1-b5a9-086ae0d4c0d2",
          "first_published_at": "2025-01-15T09:32:10.000Z",
          "release_id": null,
          "lang": "default",
          "path": null,
          "alternates": [],
          "default_full_slug": null,
          "translated_slugs": null
        },
        {
          "name": "Blog: Announcing our Q2 release",
          "created_at": "2025-04-02T11:05:00.000Z",
          "updated_at": "2025-04-02T11:20:00.000Z",
          "published_at": "2025-04-02T11:20:00.000Z",
          "id": 371891412,
          "uuid": "2c6b9a4a-2b9c-4d3f-9e21-2a6b6a2f0b3d",
          "content": {
            "_uid": "d2a9c1b0-4e55-4d3f-8b2a-7f6d3e5c9b21",
            "component": "blog_post",
            "headline": "Announcing our Q2 release"
          },
          "slug": "announcing-our-q2-release",
          "full_slug": "blog/announcing-our-q2-release",
          "sort_by_date": null,
          "position": 1,
          "tag_list": [
            "product-updates"
          ],
          "is_startpage": false,
          "parent_id": 371890998,
          "meta_data": null,
          "group_id": "9d1a6c3e-1f2b-4a5d-9c3e-6a2b1d4f0e7a",
          "first_published_at": "2025-04-02T11:20:00.000Z",
          "release_id": null,
          "lang": "default",
          "path": null,
          "alternates": [],
          "default_full_slug": null,
          "translated_slugs": null
        }
      ],
      "cv": 1717516800
    },
    "idField": "id"
  },
  {
    "entity": "story",
    "accessor": "Story",
    "op": "load",
    "method": "GET",
    "path": "/v2/cdn/stories/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "startpage"
      }
    ],
    "select": {
      "content_type": "page",
      "cv": 1121,
      "excluding_field": "v1",
      "excluding_story_field": "v1",
      "fallback_lang": "de",
      "find_by": "uuid",
      "from_release": "1",
      "language": "de",
      "resolve_asset": "v1",
      "resolve_level": 2,
      "resolve_link": "v1",
      "resolve_links_level": 1,
      "resolve_relation": "v1",
      "token": "ask9soUkv02QqbZgmZdeDAtt",
      "version": "published"
    },
    "headers": [],
    "query": [
      "find_by",
      "version",
      "resolve_links",
      "resolve_links_level",
      "resolve_relations",
      "from_release",
      "content_type",
      "cv",
      "excluding_fields",
      "excluding_story_fields",
      "language",
      "fallback_lang",
      "resolve_assets",
      "resolve_level",
      "token"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "story": {
        "name": "Homepage",
        "created_at": "2025-01-15T09:30:00.000Z",
        "updated_at": "2025-06-02T14:12:05.000Z",
        "published_at": "2025-01-15T09:32:10.000Z",
        "id": 371891025,
        "uuid": "8f14e45f-ceea-467e-adc1-5c1b1a3a7b3b",
        "content": {
          "_uid": "b1f8c9a2-3d44-4c2e-9a1e-6e7d2f5c9a10",
          "component": "page",
          "body": [
            {
              "_uid": "1a2b3c4d-5e6f-4a1b-8c2d-9e0f1a2b3c4d",
              "component": "teaser",
              "headline": "Welcome to Storyblok"
            }
          ]
        },
        "slug": "home",
        "full_slug": "home",
        "sort_by_date": null,
        "position": 0,
        "tag_list": [
          "marketing",
          "featured"
        ],
        "is_startpage": true,
        "parent_id": 0,
        "meta_data": null,
        "group_id": "57350688-5a28-49d1-b5a9-086ae0d4c0d2",
        "first_published_at": "2025-01-15T09:32:10.000Z",
        "release_id": null,
        "lang": "default",
        "path": null,
        "alternates": [],
        "default_full_slug": null,
        "translated_slugs": null
      },
      "cv": 1717516800
    },
    "idField": "id"
  },
  {
    "entity": "tag",
    "accessor": "Tag",
    "op": "list",
    "method": "GET",
    "path": "/v2/cdn/tags",
    "args": [],
    "select": {
      "filter_query": "v1",
      "starts_with": "blog/posts",
      "token": "ask9soUkv02QqbZgmZdeDAtt",
      "version": "published"
    },
    "headers": [],
    "query": [
      "starts_with",
      "version",
      "filter_query",
      "token"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "tags": [
        {
          "name": "spicy",
          "taggings_count": 5
        },
        {
          "name": "red",
          "taggings_count": 3
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "taxonomy",
    "accessor": "Taxonomy",
    "op": "list",
    "method": "GET",
    "path": "/v2/cdn/taxonomies",
    "args": [],
    "select": {
      "token": "ask9soUkv02QqbZgmZdeDAtt"
    },
    "headers": [],
    "query": [
      "token"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "taxonomies": [
        {
          "associated_content": [
            {
              "full_slug": "home",
              "id": "398000444555666",
              "name": "Homepage",
              "type": "Story",
              "updated_at": "2026-01-01T00:00:00Z"
            }
          ],
          "children": [
            {}
          ],
          "created_at": "2026-01-01T00:00:00Z",
          "description": "x",
          "display_name": "Electronics",
          "id": "200948619034658",
          "last_activity_at": "2026-01-01T00:00:00Z",
          "last_author": {
            "avatar": null,
            "friendly_name": "John Doe",
            "id": 123,
            "userid": "info@storyblok.com"
          },
          "last_author_id": "200948619034658",
          "name": "electronics",
          "parent_id": "200948619034657",
          "terms_count": 3,
          "updated_at": "2026-01-01T00:00:00Z"
        }
      ],
      "cv": 1541863983
    },
    "idField": "id"
  },
  {
    "entity": "taxonomy",
    "accessor": "Taxonomy",
    "op": "load",
    "method": "GET",
    "path": "/v2/cdn/taxonomies/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "products"
      }
    ],
    "select": {
      "token": "ask9soUkv02QqbZgmZdeDAtt"
    },
    "headers": [],
    "query": [
      "token"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "taxonomy": {
        "id": "200948619034658",
        "display_name": "Electronics",
        "name": "electronics",
        "description": "x",
        "parent_id": "200948619034657",
        "last_author": {
          "avatar": null,
          "friendly_name": "John Doe",
          "id": 123,
          "userid": "info@storyblok.com"
        },
        "last_author_id": "200948619034658",
        "created_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z",
        "children": [
          {}
        ],
        "terms_count": 3,
        "last_activity_at": "2026-01-01T00:00:00Z",
        "associated_content": [
          {
            "full_slug": "home",
            "id": "398000444555666",
            "name": "Homepage",
            "type": "Story",
            "updated_at": "2026-01-01T00:00:00Z"
          }
        ]
      },
      "cv": 1541863983
    },
    "idField": "id"
  },
  {
    "entity": "taxonomy_term",
    "accessor": "TaxonomyTerm",
    "op": "load",
    "method": "GET",
    "path": "/v2/cdn/taxonomy_terms/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "200948619272229"
      }
    ],
    "select": {
      "token": "ask9soUkv02QqbZgmZdeDAtt"
    },
    "headers": [],
    "query": [
      "token"
    ],
    "auth": [
      [
        {
          "in": "query",
          "name": "token"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "taxonomy_term": {
        "id": "200948619034658",
        "display_name": "Electronics",
        "name": "electronics",
        "description": "x",
        "parent_id": "200948619034657",
        "last_author": {
          "avatar": null,
          "friendly_name": "John Doe",
          "id": 123,
          "userid": "info@storyblok.com"
        },
        "last_author_id": "200948619034658",
        "created_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z",
        "children": [
          {}
        ],
        "terms_count": 3,
        "last_activity_at": "2026-01-01T00:00:00Z",
        "associated_content": [
          {
            "full_slug": "home",
            "id": "398000444555666",
            "name": "Homepage",
            "type": "Story",
            "updated_at": "2026-01-01T00:00:00Z"
          }
        ]
      },
      "cv": 1541863983
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
