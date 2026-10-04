"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('LinkEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when STORYBLOK_SDK_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('STORYBLOK_SDK_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.StoryblokSdkSDK.test();
        const ent = testsdk.Link();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.STORYBLOK_SDK_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'link.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "alternates": { "a": true, "h": "Alternates", "n": "alternates", "r": false, "sh": "An array that contains objects correlating to the language versions defined using [field-level translation](https://www.storyblok.com/docs/concepts/internationalization#field-level-translation).", "t": "`$ARRAY`", "key$": "alternates", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "Creation timestamp.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "created_at", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Story or folder `id`.", "t": "`$INTEGER`", "key$": "id", "index$": 2 }, "is_folder": { "a": true, "h": "Is Folder", "n": "is_folder", "r": true, "sh": "Returns `true` if the item is a folder.", "t": "`$BOOLEAN`", "key$": "is_folder", "index$": 3 }, "is_startpage": { "a": true, "h": "Is Startpage", "n": "is_startpage", "r": true, "sh": "Returns `true` if the story is the folder’s root.", "t": "`$BOOLEAN`", "key$": "is_startpage", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "Story or folder name.", "t": "`$STRING`", "key$": "name", "index$": 5 }, "parent_id": { "a": true, "h": "Parent Id", "n": "parent_id", "r": true, "sh": "Parent folder ID.", "t": "`$INTEGER`", "key$": "parent_id", "index$": 6 }, "path": { "a": true, "h": "Path", "n": "path", "r": false, "sh": "Real path defined in the story’s entry configuration.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "path", "index$": 7 }, "position": { "a": true, "h": "Position", "n": "position", "r": true, "sh": "Numeric representation of the story’s position in the folder.", "t": "`$INTEGER`", "key$": "position", "index$": 8 }, "published": { "a": true, "h": "Published", "n": "published", "r": true, "sh": "Returns `true` if the story is currently published.", "t": "`$BOOLEAN`", "key$": "published", "index$": 9 }, "published_at": { "a": true, "fo": "date-time", "h": "Published At", "n": "published_at", "r": false, "sh": "Latest publication timestamp.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "published_at", "index$": 10 }, "real_path": { "a": true, "h": "Real Path", "n": "real_path", "r": false, "sh": "Either the full slug of the story or folder with a leading `/`, or the value of the real path defined in the story’s entry configuration with a leading `/`.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "real_path", "index$": 11 }, "slug": { "a": true, "h": "Slug", "n": "slug", "r": true, "sh": "Story or folder full slug.", "t": "`$STRING`", "key$": "slug", "index$": 12 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "sh": "Latest update timestamp.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "updated_at", "index$": 13 }, "uuid": { "a": true, "fo": "uuid", "h": "Uuid", "n": "uuid", "r": true, "sh": "Story or folder `uuid`.", "t": "`$STRING`", "key$": "uuid", "index$": 14 } }, "id": { "field": "id", "name": "id" }, "name": "link", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/cdn/links", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "a78b2116-c26d-4d23-9cbe-fec477847b0e", "k": "query", "n": "by_uuid", "or": "by_uuid", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 1541863983, "k": "query", "n": "cv", "or": "cv", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "1", "k": "query", "n": "include_date", "or": "include_dates", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "ex": "0", "k": "query", "n": "paginated", "or": "paginated", "r": false, "t": "`$STRING`", "index$": 4 }, { "a": true, "ex": 25, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 5 }, { "a": true, "ex": "de/beitraege", "k": "query", "n": "starts_with", "or": "starts_with", "r": false, "t": "`$STRING`", "index$": 6 }, { "a": true, "ex": "ask9soUkv02QqbZgmZdeDAtt", "k": "query", "n": "token", "or": "token", "r": true, "t": "`$STRING`", "index$": 7 }, { "a": true, "ex": "published", "k": "query", "n": "version", "or": "version", "r": false, "t": "`$STRING`", "index$": 8 }, { "a": true, "ex": "0", "k": "query", "n": "with_parent", "or": "with_parent", "r": false, "t": "`$STRING`", "index$": 9 }] }, "k": "http", "m": "GET", "o": "/v2/cdn/links", "q": { "exist": ["by_uuid", "cv", "include_date", "page", "paginated", "per_page", "starts_with", "token", "version", "with_parent"] }, "r": {}, "s": [{ "lit": "v2" }, { "lit": "cdn" }, { "lit": "links" }], "t": { "req": "`reqdata`", "res": "`body.links`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v2/cdn/links/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "a78b2116-c26d-4d23-9cbe-fec477847b0e", "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 1541863983, "k": "query", "n": "cv", "or": "cv", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": "1", "k": "query", "n": "include_date", "or": "include_dates", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "ask9soUkv02QqbZgmZdeDAtt", "k": "query", "n": "token", "or": "token", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/v2/cdn/links/{id}", "q": { "exist": ["cv", "id", "include_date", "token"] }, "r": {}, "s": [{ "lit": "v2" }, { "lit": "cdn" }, { "lit": "links" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.link`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "link", "name__orig": "link", "Name": "Link", "name_": "link", "name-": "link", "NAME": "LINK", "index$": 4 }, { "active": true, "entity": "link", "key$": "BasicLinkFlow", "kind": "basic", "name": "BasicLinkFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "link_ref01", "srcdatavar": "link_ref01_data", "suffix": "_dt0" }, "m": { "id": "link01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-link_ref01" } }] }] }, 'Link', { "GET /v2/cdn/links": { "protocol": "http", "parameters": [{ "name": "starts_with", "in": "query", "required": false, "schema": { "type": "string", "example": "de/beitraege" }, "description": "Filter by the story’s `full_slug` to return items starting with the given value.", "index$": 0 }, { "name": "version", "in": "query", "required": false, "description": "Filter by the story’s publication status.", "schema": { "type": "string", "enum": ["draft", "published"], "default": "published", "example": "published" }, "index$": 1 }, { "name": "cv", "in": "query", "required": false, "schema": { "type": "integer", "example": 1541863983 }, "description": "Cached version Unix timestamp. Learn more in the [Caching concept](https://www.storyblok.com/docs/concepts/caching).", "index$": 2 }, { "name": "include_dates", "in": "query", "required": false, "schema": { "type": "string", "example": "1" }, "description": "Include or exclude the `created_at`, `updated_at` and `published_at` fields. To include these date fields in the response, set to `1`. To exclude them, set to `0` or omit the parameter.", "index$": 3 }, { "name": "by_uuid", "in": "query", "required": false, "schema": { "type": "string", "example": "a78b2116-c26d-4d23-9cbe-fec477847b0e" }, "description": "Filter links by `uuid`.", "index$": 4 }, { "name": "with_parent", "in": "query", "required": false, "schema": { "type": "string", "example": "0" }, "description": "To return links from a specific folder, filter by folder `id`. To return stories outside a folder, set to `0`.", "index$": 5 }, { "name": "paginated", "in": "query", "required": false, "schema": { "type": "string", "example": "0" }, "description": "To enable a [paginated](https://www.storyblok.com/docs/api/content-delivery/v2#pagination) response, set to `1`.", "index$": 6 }, { "name": "page", "in": "query", "required": false, "schema": { "type": "integer", "default": 1, "example": 1 }, "description": "Page number in a [paginated](https://www.storyblok.com/docs/api/content-delivery/v2#pagination) response.", "index$": 7 }, { "name": "per_page", "in": "query", "required": false, "schema": { "type": "integer", "default": 25, "minimum": 1, "maximum": 1000, "example": 25 }, "description": "The number of items per page in a [paginated](https://www.storyblok.com/docs/api/content-delivery/v2#pagination) response.", "index$": 8 }, { "name": "token", "in": "query", "required": true, "x-speakeasy-ignore": true, "description": "A preview or public [access token](https://www.storyblok.com/docs/concepts/access-tokens) configured in a space.", "schema": { "type": "string", "example": "ask9soUkv02QqbZgmZdeDAtt" }, "index$": 9 }] }, "GET /v2/cdn/links/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "description": "The link’s ID.", "schema": { "type": "string", "example": "a78b2116-c26d-4d23-9cbe-fec477847b0e" }, "index$": 0 }, { "name": "cv", "in": "query", "required": false, "schema": { "type": "integer", "example": 1541863983 }, "description": "Cached version Unix timestamp. Learn more in the [Caching concept](https://www.storyblok.com/docs/concepts/caching).", "index$": 1 }, { "name": "include_dates", "in": "query", "required": false, "schema": { "type": "string", "example": "1" }, "description": "Include or exclude the `created_at`, `updated_at` and `published_at` fields. To include these date fields in the response, set to `1`. To exclude them, set to `0` or omit the parameter.", "index$": 2 }, { "name": "token", "in": "query", "required": true, "x-speakeasy-ignore": true, "description": "A preview or public [access token](https://www.storyblok.com/docs/concepts/access-tokens) configured in a space.", "schema": { "type": "string", "example": "ask9soUkv02QqbZgmZdeDAtt" }, "index$": 3 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let link_ref01_data = Object.values(setup.data.existing.link)[0];
        // LOAD
        const link_ref01_ent = client.Link();
        const link_ref01_match_dt0 = {};
        link_ref01_match_dt0.id = link_ref01_data.id;
        const link_ref01_data_dt0 = (await link_ref01_ent.load(link_ref01_match_dt0)).data();
        (0, node_assert_1.default)(link_ref01_data_dt0.id === link_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/link/LinkTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.StoryblokSdkSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['link01', 'link02', 'link03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'STORYBLOK_SDK_TEST_LINK_ENTID': idmap,
        'STORYBLOK_SDK_TEST_LIVE': 'FALSE',
        'STORYBLOK_SDK_TEST_EXPLAIN': 'FALSE',
        'STORYBLOK_SDK_APIKEY': '',
    });
    idmap = env['STORYBLOK_SDK_TEST_LINK_ENTID'];
    const live = 'TRUE' === env.STORYBLOK_SDK_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['STORYBLOK_SDK_TEST_LINK_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.StoryblokSdkSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.STORYBLOK_SDK_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.STORYBLOK_SDK_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=LinkEntity.test.js.map