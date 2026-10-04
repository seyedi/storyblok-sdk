

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


describe('TagEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when STORYBLOK_SDK_TEST_LIVE=TRUE.
  afterEach(liveDelay('STORYBLOK_SDK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = StoryblokSdkSDK.test()
    const ent = testsdk.Tag()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.STORYBLOK_SDK_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'tag.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The tag name.","t":"`$STRING`","key$":"name","index$":0},"tag_on_stories":{"a":true,"h":"Tag On Stories","n":"tag_on_stories","r":false,"sh":"The number of distinct stories this tag appears on (only present when all_tags parameter is true).","t":"`$INTEGER`","key$":"tag_on_stories","index$":1},"taggings_count":{"a":true,"h":"Taggings Count","n":"taggings_count","r":false,"sh":"The number of stories that include this tag.","t":"`$INTEGER`","key$":"taggings_count","index$":2}},"name":"tag","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/cdn/tags","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"filter_query","or":"filter_query","r":false,"t":"`$OBJECT`","index$":0},{"a":true,"ex":"blog/posts","k":"query","n":"starts_with","or":"starts_with","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"ask9soUkv02QqbZgmZdeDAtt","k":"query","n":"token","or":"token","r":true,"t":"`$STRING`","index$":2},{"a":true,"ex":"published","k":"query","n":"version","or":"version","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/v2/cdn/tags","q":{"exist":["filter_query","starts_with","token","version"]},"r":{},"s":[{"lit":"v2"},{"lit":"cdn"},{"lit":"tags"}],"t":{"req":"`reqdata`","res":"`body.tags`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"tag","name__orig":"tag","Name":"Tag","name_":"tag","name-":"tag","NAME":"TAG","index$":7}, {"active":true,"entity":"tag","key$":"BasicTagFlow","kind":"basic","name":"BasicTagFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"tag_ref01"}}]}]}, 'Tag', {"GET /v2/cdn/tags":{"protocol":"http","parameters":[{"name":"starts_with","required":false,"in":"query","schema":{"type":"string","example":"blog/posts"},"description":"Filter by the story’s `full_slug` to return items starting with the given value.","index$":0},{"name":"version","in":"query","required":false,"description":"Filter by the story’s publication status.","schema":{"type":"string","enum":["draft","published"],"default":"published","example":"published"},"index$":1},{"name":"filter_query","in":"query","description":"Learn more in [Filter Queries](https://www.storyblok.com/docs/api/content-delivery/v2/filter-queries/).","required":false,"style":"deepObject","explode":true,"schema":{"type":"object","additionalProperties":{"type":"object","properties":{"in":{"type":"string"},"not_in":{"type":"string"},"like":{"type":"string"},"not_like":{"type":"string"}}}},"index$":2},{"name":"token","in":"query","required":true,"x-speakeasy-ignore":true,"description":"A preview or public [access token](https://www.storyblok.com/docs/concepts/access-tokens) configured in a space.","schema":{"type":"string","example":"ask9soUkv02QqbZgmZdeDAtt"},"index$":3}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let tag_ref01_data = Object.values(setup.data.existing.tag)[0] as any

    // LIST
    const tag_ref01_ent = client.Tag()
    const tag_ref01_match: any = {}

    const tag_ref01_list = (await tag_ref01_ent.list(tag_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/tag/TagTestData.json')

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
    ['tag01','tag02','tag03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'STORYBLOK_SDK_TEST_TAG_ENTID': idmap,
    'STORYBLOK_SDK_TEST_LIVE': 'FALSE',
    'STORYBLOK_SDK_TEST_EXPLAIN': 'FALSE',
    'STORYBLOK_SDK_APIKEY': '',
  })

  idmap = env['STORYBLOK_SDK_TEST_TAG_ENTID']

  const live = 'TRUE' === env.STORYBLOK_SDK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['STORYBLOK_SDK_TEST_TAG_ENTID']
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
  
