

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


describe('DataSourceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when STORYBLOK_SDK_TEST_LIVE=TRUE.
  afterEach(liveDelay('STORYBLOK_SDK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = StoryblokSdkSDK.test()
    const ent = testsdk.DataSource()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.STORYBLOK_SDK_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'data_source.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Creation timestamp.","t":"`$STRING`","key$":"created_at","index$":0},"cv":{"a":true,"h":"Cv","n":"cv","r":true,"sh":"Cached version Unix timestamp.","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"cv","index$":1},"datasource":{"a":true,"h":"Datasource","n":"datasource","r":true,"sh":"A single data source object.","t":"`$OBJECT`","key$":"datasource","index$":2},"dimensions":{"a":true,"h":"Dimensions","n":"dimensions","r":true,"sh":"An array listing the dimensions defined for the data source.","t":"`$ARRAY`","key$":"dimensions","index$":3},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Data source ID.","t":"`$INTEGER`","key$":"id","index$":4},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"Data source name.","t":"`$STRING`","key$":"name","index$":5},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"sh":"Data source `slug`.","t":"`$STRING`","key$":"slug","index$":6},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"sh":"Latest update timestamp.","t":"`$STRING`","key$":"updated_at","index$":7}},"id":{"field":"id","name":"id"},"name":"data_source","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/cdn/datasources","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"12312,234234","k":"query","n":"by_id","or":"by_ids","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":1541863983,"k":"query","n":"cv","or":"cv","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":25,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"ex":"labels","k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":"ask9soUkv02QqbZgmZdeDAtt","k":"query","n":"token","or":"token","r":true,"t":"`$STRING`","index$":5},{"a":true,"ex":"published","k":"query","n":"version","or":"version","r":false,"t":"`$STRING`","index$":6}]},"k":"http","m":"GET","o":"/v2/cdn/datasources","q":{"exist":["by_id","cv","page","per_page","search","token","version"]},"r":{},"s":[{"lit":"v2"},{"lit":"cdn"},{"lit":"datasources"}],"t":{"req":"`reqdata`","res":"`body.datasources`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/cdn/datasources/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"labels","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":1541863983,"k":"query","n":"cv","or":"cv","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":"ask9soUkv02QqbZgmZdeDAtt","k":"query","n":"token","or":"token","r":true,"t":"`$STRING`","index$":1},{"a":true,"ex":"published","k":"query","n":"version","or":"version","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/v2/cdn/datasources/{id}","q":{"exist":["cv","id","token","version"]},"r":{},"s":[{"lit":"v2"},{"lit":"cdn"},{"lit":"datasources"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"data_source","name__orig":"data_source","Name":"DataSource","name_":"data_source","name-":"data-source","NAME":"DATA_SOURCE","index$":1}, {"active":true,"entity":"data_source","key$":"BasicDataSourceFlow","kind":"basic","name":"BasicDataSourceFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"data_source_ref01"}}]},{"a":true,"d":{},"i":{"ref":"data_source_ref01","srcdatavar":"data_source_ref01_data","suffix":"_dt0"},"m":{"id":"data_source01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-data_source_ref01"}}]}]}, 'DataSource', {"GET /v2/cdn/datasources":{"protocol":"http","parameters":[{"name":"version","in":"query","required":false,"description":"Filter by the story’s publication status.","schema":{"type":"string","enum":["draft","published"],"default":"published","example":"published"},"index$":0},{"name":"cv","in":"query","required":false,"schema":{"type":"integer","example":1541863983},"description":"Cached version Unix timestamp. Learn more in the [Caching concept](https://www.storyblok.com/docs/concepts/caching).","index$":1},{"name":"search","in":"query","required":false,"schema":{"type":"string","example":"labels"},"description":"Search string.","index$":2},{"name":"by_ids","in":"query","required":false,"schema":{"type":"string","example":"12312,234234"},"description":"Retrieve items by `id`. Supports a comma-separated string.","index$":3},{"name":"page","in":"query","required":false,"schema":{"type":"integer","default":1,"example":1},"description":"Page number in a [paginated](https://www.storyblok.com/docs/api/content-delivery/v2#pagination) response.","index$":4},{"name":"per_page","in":"query","required":false,"schema":{"type":"integer","default":25,"minimum":1,"maximum":1000,"example":25},"description":"The number of items per page in a [paginated](https://www.storyblok.com/docs/api/content-delivery/v2#pagination) response.","index$":5},{"name":"token","in":"query","required":true,"x-speakeasy-ignore":true,"description":"A preview or public [access token](https://www.storyblok.com/docs/concepts/access-tokens) configured in a space.","schema":{"type":"string","example":"ask9soUkv02QqbZgmZdeDAtt"},"index$":6}]},"GET /v2/cdn/datasources/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"description":"The data source’s ID.","schema":{"type":"string","example":"labels"},"examples":{"slug":{"summary":"Full slug","value":"labels"},"id":{"summary":"Numeric ID","value":"66252740648132"}},"index$":0},{"name":"version","in":"query","required":false,"description":"Filter by the story’s publication status.","schema":{"type":"string","enum":["draft","published"],"default":"published","example":"published"},"index$":1},{"name":"cv","in":"query","required":false,"schema":{"type":"integer","example":1541863983},"description":"Cached version Unix timestamp. Learn more in the [Caching concept](https://www.storyblok.com/docs/concepts/caching).","index$":2},{"name":"token","in":"query","required":true,"x-speakeasy-ignore":true,"description":"A preview or public [access token](https://www.storyblok.com/docs/concepts/access-tokens) configured in a space.","schema":{"type":"string","example":"ask9soUkv02QqbZgmZdeDAtt"},"index$":3}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let data_source_ref01_data = Object.values(setup.data.existing.data_source)[0] as any

    // LIST
    const data_source_ref01_ent = client.DataSource()
    const data_source_ref01_match: any = {}

    const data_source_ref01_list = (await data_source_ref01_ent.list(data_source_ref01_match)).map((e: any) => e.data())


    // LOAD
    const data_source_ref01_match_dt0: any = {}
    data_source_ref01_match_dt0.id = data_source_ref01_data.id
    const data_source_ref01_data_dt0 = (await data_source_ref01_ent.load(data_source_ref01_match_dt0)).data()
    assert(data_source_ref01_data_dt0.id === data_source_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/data_source/DataSourceTestData.json')

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
    ['data_source01','data_source02','data_source03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'STORYBLOK_SDK_TEST_DATA_SOURCE_ENTID': idmap,
    'STORYBLOK_SDK_TEST_LIVE': 'FALSE',
    'STORYBLOK_SDK_TEST_EXPLAIN': 'FALSE',
    'STORYBLOK_SDK_APIKEY': '',
  })

  idmap = env['STORYBLOK_SDK_TEST_DATA_SOURCE_ENTID']

  const live = 'TRUE' === env.STORYBLOK_SDK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['STORYBLOK_SDK_TEST_DATA_SOURCE_ENTID']
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
  
