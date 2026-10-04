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
(0, node_test_1.describe)('DataSourceEntryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when STORYBLOK_SDK_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('STORYBLOK_SDK_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.StoryblokSdkSDK.test();
        const ent = testsdk.DataSourceEntry();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.STORYBLOK_SDK_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'data_source_entry.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "dimension_value": { "a": true, "h": "Dimension Value", "n": "dimension_value", "r": true, "sh": "Entry value (requested dimension).", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "dimension_value", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Entry ID.", "t": "`$INTEGER`", "key$": "id", "index$": 1 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "Entry name.", "t": "`$STRING`", "key$": "name", "index$": 2 }, "value": { "a": true, "h": "Value", "n": "value", "r": true, "sh": "Entry value (default dimension).", "t": "`$STRING`", "key$": "value", "index$": 3 } }, "id": { "field": "id", "name": "id" }, "name": "data_source_entry", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/cdn/datasource_entries", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1541863983, "k": "query", "n": "cv", "or": "cv", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": "labels", "k": "query", "n": "datasource", "or": "datasource", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "en", "k": "query", "n": "dimension", "or": "dimension", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "ex": 25, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 4 }, { "a": true, "ex": "ask9soUkv02QqbZgmZdeDAtt", "k": "query", "n": "token", "or": "token", "r": true, "t": "`$STRING`", "index$": 5 }] }, "k": "http", "m": "GET", "o": "/v2/cdn/datasource_entries", "q": { "exist": ["cv", "datasource", "dimension", "page", "per_page", "token"] }, "r": {}, "s": [{ "lit": "v2" }, { "lit": "cdn" }, { "lit": "datasource_entries" }], "t": { "req": "`reqdata`", "res": "`body.datasource_entries`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "data_source_entry", "name__orig": "data_source_entry", "Name": "DataSourceEntry", "name_": "data_source_entry", "name-": "data-source-entry", "NAME": "DATA_SOURCE_ENTRY", "index$": 2 }, { "active": true, "entity": "data_source_entry", "key$": "BasicDataSourceEntryFlow", "kind": "basic", "name": "BasicDataSourceEntryFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "data_source_entry_ref01" } }] }] }, 'DataSourceEntry', { "GET /v2/cdn/datasource_entries": { "protocol": "http", "parameters": [{ "name": "datasource", "in": "query", "required": false, "schema": { "type": "string", "example": "labels" }, "description": "Data source `slug`.", "index$": 0 }, { "name": "dimension", "in": "query", "required": false, "schema": { "type": "string", "example": "en" }, "description": "A datasource dimension.", "index$": 1 }, { "name": "cv", "in": "query", "required": false, "schema": { "type": "integer", "example": 1541863983 }, "description": "Cached version Unix timestamp. Learn more in the [Caching concept](https://www.storyblok.com/docs/concepts/caching).", "index$": 2 }, { "name": "page", "in": "query", "required": false, "schema": { "type": "integer", "default": 1, "example": 1 }, "description": "Page number in a [paginated](https://www.storyblok.com/docs/api/content-delivery/v2#pagination) response.", "index$": 3 }, { "name": "per_page", "in": "query", "required": false, "schema": { "type": "integer", "default": 25, "minimum": 1, "maximum": 1000, "example": 25 }, "description": "The number of items per page in a [paginated](https://www.storyblok.com/docs/api/content-delivery/v2#pagination) response.", "index$": 4 }, { "name": "token", "in": "query", "required": true, "x-speakeasy-ignore": true, "description": "A preview or public [access token](https://www.storyblok.com/docs/concepts/access-tokens) configured in a space.", "schema": { "type": "string", "example": "ask9soUkv02QqbZgmZdeDAtt" }, "index$": 5 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let data_source_entry_ref01_data = Object.values(setup.data.existing.data_source_entry)[0];
        // LIST
        const data_source_entry_ref01_ent = client.DataSourceEntry();
        const data_source_entry_ref01_match = {};
        const data_source_entry_ref01_list = (await data_source_entry_ref01_ent.list(data_source_entry_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/data_source_entry/DataSourceEntryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.StoryblokSdkSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['data_source_entry01', 'data_source_entry02', 'data_source_entry03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'STORYBLOK_SDK_TEST_DATA_SOURCE_ENTRY_ENTID': idmap,
        'STORYBLOK_SDK_TEST_LIVE': 'FALSE',
        'STORYBLOK_SDK_TEST_EXPLAIN': 'FALSE',
        'STORYBLOK_SDK_APIKEY': '',
    });
    idmap = env['STORYBLOK_SDK_TEST_DATA_SOURCE_ENTRY_ENTID'];
    const live = 'TRUE' === env.STORYBLOK_SDK_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['STORYBLOK_SDK_TEST_DATA_SOURCE_ENTRY_ENTID'];
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
//# sourceMappingURL=DataSourceEntryEntity.test.js.map