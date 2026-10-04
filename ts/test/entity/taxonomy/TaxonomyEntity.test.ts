

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { StoryblokSdkSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('TaxonomyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when STORYBLOK_SDK_TEST_LIVE=TRUE.
  afterEach(liveDelay('STORYBLOK_SDK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = StoryblokSdkSDK.test()
    const ent = testsdk.Taxonomy()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.STORYBLOK_SDK_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'taxonomy.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"associated_content":{"a":true,"h":"Associated Content","n":"associated_content","r":false,"sh":"An array of story objects associated with the taxonomy.","t":"`$ARRAY`","key$":"associated_content","index$":0},"children":{"a":true,"h":"Children","n":"children","r":false,"sh":"An array of sub-terms objects.","t":"`$ARRAY`","key$":"children","index$":1},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"sh":"Creation timestamp.","t":"`$STRING`","key$":"created_at","index$":2},"cv":{"a":true,"h":"Cv","n":"cv","r":true,"t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"cv","index$":3},"description":{"a":true,"h":"Description","n":"description","r":true,"sh":"The taxonomy’s description.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"description","index$":4},"display_name":{"a":true,"h":"Display Name","n":"display_name","r":true,"sh":"The taxonomy’s name.","t":"`$STRING`","key$":"display_name","index$":5},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The taxonomy’s ID.","t":"`$STRING`","key$":"id","index$":6},"last_activity_at":{"a":true,"fo":"date-time","h":"Last Activity At","n":"last_activity_at","r":false,"sh":"Latest update timestamp.","t":"`$STRING`","key$":"last_activity_at","index$":7},"last_author":{"a":true,"h":"Last Author","n":"last_author","r":true,"sh":"An object that contains the details of user who created the term.","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"last_author","index$":8},"last_author_id":{"a":true,"h":"Last Author Id","n":"last_author_id","r":true,"sh":"The user’s ID.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"last_author_id","index$":9},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The taxonomy’s technical name.","t":"`$STRING`","key$":"name","index$":10},"parent_id":{"a":true,"h":"Parent Id","n":"parent_id","r":true,"sh":"The top-level term’s ID.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"parent_id","index$":11},"taxonomy":{"a":true,"h":"Taxonomy","n":"taxonomy","r":true,"sh":"An object that contains a taxonomy.","t":"`$OBJECT`","key$":"taxonomy","index$":12},"terms_count":{"a":true,"h":"Terms Count","n":"terms_count","r":false,"sh":"The number sub-terms (at any depth).","t":"`$INTEGER`","key$":"terms_count","index$":13},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"sh":"Latest update timestamp.","t":"`$STRING`","key$":"updated_at","index$":14}},"id":{"field":"id","name":"id"},"name":"taxonomy","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/cdn/taxonomies","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"ask9soUkv02QqbZgmZdeDAtt","k":"query","n":"token","or":"token","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/cdn/taxonomies","q":{"exist":["token"]},"r":{},"s":[{"lit":"v2"},{"lit":"cdn"},{"lit":"taxonomies"}],"t":{"req":"`reqdata`","res":"`body.taxonomies`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/cdn/taxonomies/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"products","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"ask9soUkv02QqbZgmZdeDAtt","k":"query","n":"token","or":"token","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/cdn/taxonomies/{id}","q":{"exist":["id","token"]},"r":{},"s":[{"lit":"v2"},{"lit":"cdn"},{"lit":"taxonomies"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.taxonomy`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"taxonomy","name__orig":"taxonomy","Name":"Taxonomy","name_":"taxonomy","name-":"taxonomy","NAME":"TAXONOMY","index$":8}, {"active":true,"entity":"taxonomy","key$":"BasicTaxonomyFlow","kind":"basic","name":"BasicTaxonomyFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"taxonomy_ref01"}}]},{"a":true,"d":{},"i":{"ref":"taxonomy_ref01","srcdatavar":"taxonomy_ref01_data","suffix":"_dt0"},"m":{"id":"taxonomy01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-taxonomy_ref01"}}]}]}, 'Taxonomy', {"GET /v2/cdn/taxonomies":{"protocol":"http","parameters":[{"name":"token","in":"query","required":true,"x-speakeasy-ignore":true,"description":"A preview or public [access token](https://www.storyblok.com/docs/concepts/access-tokens) configured in a space.","schema":{"type":"string","example":"ask9soUkv02QqbZgmZdeDAtt"},"index$":0}]},"GET /v2/cdn/taxonomies/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"description":"The taxonomy’s name.","schema":{"type":"string","example":"products"},"index$":0},{"name":"token","in":"query","required":true,"x-speakeasy-ignore":true,"description":"A preview or public [access token](https://www.storyblok.com/docs/concepts/access-tokens) configured in a space.","schema":{"type":"string","example":"ask9soUkv02QqbZgmZdeDAtt"},"index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let taxonomy_ref01_data = Object.values(setup.data.existing.taxonomy)[0] as any

    // LIST
    const taxonomy_ref01_ent = client.Taxonomy()
    const taxonomy_ref01_match: any = {}

    const taxonomy_ref01_list = (await taxonomy_ref01_ent.list(taxonomy_ref01_match)).map((e: any) => e.data())


    // LOAD
    const taxonomy_ref01_match_dt0: any = {}
    taxonomy_ref01_match_dt0.id = taxonomy_ref01_data.id
    const taxonomy_ref01_data_dt0 = (await taxonomy_ref01_ent.load(taxonomy_ref01_match_dt0)).data()
    assert(taxonomy_ref01_data_dt0.id === taxonomy_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/taxonomy/TaxonomyTestData.json')

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
    ['taxonomy01','taxonomy02','taxonomy03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'STORYBLOK_SDK_TEST_TAXONOMY_ENTID': idmap,
    'STORYBLOK_SDK_TEST_LIVE': 'FALSE',
    'STORYBLOK_SDK_TEST_EXPLAIN': 'FALSE',
    'STORYBLOK_SDK_APIKEY': '',
  })

  idmap = env['STORYBLOK_SDK_TEST_TAXONOMY_ENTID']

  const live = 'TRUE' === env.STORYBLOK_SDK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['STORYBLOK_SDK_TEST_TAXONOMY_ENTID']
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
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
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
  
