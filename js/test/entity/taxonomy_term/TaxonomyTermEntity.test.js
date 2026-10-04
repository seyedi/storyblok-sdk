
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { StoryblokSdkSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('TaxonomyTermEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when STORYBLOK_SDK_TEST_LIVE=TRUE.
  afterEach(liveDelay('STORYBLOK_SDK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = StoryblokSdkSDK.test()
    const ent = testsdk.TaxonomyTerm()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"cv":{"a":true,"h":"Cv","n":"cv","r":true,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"cv","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"taxonomy_term":{"a":true,"h":"Taxonomy Term","n":"taxonomy_term","r":true,"sh":"An object that contains a taxonomy.","t":"`$OBJECT`","key$":"taxonomy_term","index$":2}},"id":{"field":"id","name":"id"},"name":"taxonomy_term","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/cdn/taxonomy_terms/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"200948619272229","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"ask9soUkv02QqbZgmZdeDAtt","k":"query","n":"token","or":"token","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/cdn/taxonomy_terms/{id}","q":{"exist":["id","token"]},"r":{},"s":[{"lit":"v2"},{"lit":"cdn"},{"lit":"taxonomy_terms"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.taxonomy_term`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"taxonomy_term","name__orig":"taxonomy_term","Name":"TaxonomyTerm","name_":"taxonomy_term","name-":"taxonomy-term","NAME":"TAXONOMY_TERM","index$":9}, {"active":true,"entity":"taxonomy_term","key$":"BasicTaxonomyTermFlow","kind":"basic","name":"BasicTaxonomyTermFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"taxonomy_term_ref01","srcdatavar":"taxonomy_term_ref01_data","suffix":"_dt0"},"m":{"id":"taxonomy_term01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-taxonomy_term_ref01"}}],"index$":0}]}, 'TaxonomyTerm', {"GET /v2/cdn/taxonomy_terms/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"description":"The taxonomy term’s name.","schema":{"type":"string","example":"200948619272229"},"index$":0},{"name":"token","in":"query","required":true,"x-speakeasy-ignore":true,"description":"A preview or public [access token](https://www.storyblok.com/docs/concepts/access-tokens) configured in a space.","schema":{"type":"string","example":"ask9soUkv02QqbZgmZdeDAtt"},"index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let taxonomy_term_ref01_data = Object.values(setup.data.existing.taxonomy_term)[0]

    // LOAD
    const taxonomy_term_ref01_ent = client.TaxonomyTerm()
    const taxonomy_term_ref01_match_dt0 = {}
    taxonomy_term_ref01_match_dt0.id = taxonomy_term_ref01_data.id
    const taxonomy_term_ref01_data_dt0 = (await taxonomy_term_ref01_ent.load(taxonomy_term_ref01_match_dt0)).data()
    assert(taxonomy_term_ref01_data_dt0.id === taxonomy_term_ref01_data.id)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/taxonomy_term/TaxonomyTermTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = StoryblokSdkSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['taxonomy_term01','taxonomy_term02','taxonomy_term03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'STORYBLOK_SDK_TEST_TAXONOMY_TERM_ENTID': idmap,
    'STORYBLOK_SDK_TEST_LIVE': 'FALSE',
    'STORYBLOK_SDK_TEST_EXPLAIN': 'FALSE',
    'STORYBLOK_SDK_APIKEY': '',
  })

  idmap = env['STORYBLOK_SDK_TEST_TAXONOMY_TERM_ENTID']

  const live = 'TRUE' === env.STORYBLOK_SDK_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['STORYBLOK_SDK_TEST_TAXONOMY_TERM_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new StoryblokSdkSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.STORYBLOK_SDK_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
