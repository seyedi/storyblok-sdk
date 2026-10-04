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
(0, node_test_1.describe)('SpaceEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when STORYBLOK_SDK_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('STORYBLOK_SDK_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.StoryblokSdkSDK.test();
        const ent = testsdk.Space();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.STORYBLOK_SDK_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'space.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "domain": { "a": true, "h": "Domain", "n": "domain", "r": true, "sh": "Domain associated with the space (configured under **Visual Editor** → **Location**).", "t": "`$STRING`", "key$": "domain", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Space ID.", "t": "`$INTEGER`", "key$": "id", "index$": 1 }, "language_codes": { "a": true, "h": "Language Codes", "n": "language_codes", "r": true, "sh": "An array of language codes configured in the space.", "t": "`$ARRAY`", "key$": "language_codes", "index$": 2 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "Space name.", "t": "`$STRING`", "key$": "name", "index$": 3 }, "version": { "a": true, "h": "Version", "n": "version", "r": true, "sh": "Cached version Unix timestamp.", "t": "`$INTEGER`", "key$": "version", "index$": 4 } }, "id": { "field": "id", "name": "id" }, "name": "space", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v2/cdn/spaces/me", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "ask9soUkv02QqbZgmZdeDAtt", "k": "query", "n": "token", "or": "token", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "published", "k": "query", "n": "version", "or": "version", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v2/cdn/spaces/me", "q": { "$action": "me", "exist": ["token", "version"] }, "r": {}, "s": [{ "lit": "v2" }, { "lit": "cdn" }, { "lit": "spaces" }, { "lit": "me" }], "t": { "req": "`reqdata`", "res": "`body.space`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "space", "name__orig": "space", "Name": "Space", "name_": "space", "name-": "space", "NAME": "SPACE", "index$": 5 }, { "active": true, "entity": "space", "key$": "BasicSpaceFlow", "kind": "basic", "name": "BasicSpaceFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "space_ref01", "srcdatavar": "space_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-space_ref01" } }] }] }, 'Space', { "GET /v2/cdn/spaces/me": { "protocol": "http", "parameters": [{ "name": "version", "in": "query", "required": false, "description": "Filter by the story’s publication status.", "schema": { "type": "string", "enum": ["draft", "published"], "default": "published", "example": "published" }, "index$": 0 }, { "name": "token", "in": "query", "required": true, "x-speakeasy-ignore": true, "description": "A preview or public [access token](https://www.storyblok.com/docs/concepts/access-tokens) configured in a space.", "schema": { "type": "string", "example": "ask9soUkv02QqbZgmZdeDAtt" }, "index$": 1 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let space_ref01_data = Object.values(setup.data.existing.space)[0];
        // LOAD
        const space_ref01_ent = client.Space();
        const space_ref01_match_dt0 = {};
        space_ref01_match_dt0.id = space_ref01_data.id;
        const space_ref01_data_dt0 = (await space_ref01_ent.load(space_ref01_match_dt0)).data();
        (0, node_assert_1.default)(space_ref01_data_dt0.id === space_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/space/SpaceTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.StoryblokSdkSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['space01', 'space02', 'space03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'STORYBLOK_SDK_TEST_SPACE_ENTID': idmap,
        'STORYBLOK_SDK_TEST_LIVE': 'FALSE',
        'STORYBLOK_SDK_TEST_EXPLAIN': 'FALSE',
        'STORYBLOK_SDK_APIKEY': '',
    });
    idmap = env['STORYBLOK_SDK_TEST_SPACE_ENTID'];
    const live = 'TRUE' === env.STORYBLOK_SDK_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['STORYBLOK_SDK_TEST_SPACE_ENTID'];
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
//# sourceMappingURL=SpaceEntity.test.js.map