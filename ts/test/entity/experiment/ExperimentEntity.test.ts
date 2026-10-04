

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


describe('ExperimentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when STORYBLOK_SDK_TEST_LIVE=TRUE.
  afterEach(liveDelay('STORYBLOK_SDK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = StoryblokSdkSDK.test()
    const ent = testsdk.Experiment()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.STORYBLOK_SDK_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'experiment.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"display_name":{"a":true,"h":"Display Name","n":"display_name","r":true,"sh":"Human-readable display name.","t":"`$STRING`","key$":"display_name","index$":0},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Numeric ID of the experiment.","t":"`$INTEGER`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"Internal name (lowercase letters, numbers, and underscores).","t":"`$STRING`","key$":"name","index$":2},"story_ids":{"a":true,"h":"Story Ids","n":"story_ids","r":true,"sh":"IDs of [stories](https://www.storyblok.com/docs/api/content-delivery/v2/stories/the-story-object) assigned to the experiment.","t":"`$ARRAY`","key$":"story_ids","index$":3},"variants":{"a":true,"h":"Variants","n":"variants","r":true,"sh":"Variants belonging to the experiment.","t":"`$ARRAY`","key$":"variants","index$":4}},"id":{"field":"id","name":"id"},"name":"experiment","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/cdn/experiments","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1541863983,"k":"query","n":"cv","or":"cv","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":"ask9soUkv02QqbZgmZdeDAtt","k":"query","n":"token","or":"token","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v2/cdn/experiments","q":{"exist":["cv","token"]},"r":{},"s":[{"lit":"v2"},{"lit":"cdn"},{"lit":"experiments"}],"t":{"req":"`reqdata`","res":"`body.experiments`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"experiment","name__orig":"experiment","Name":"Experiment","name_":"experiment","name-":"experiment","NAME":"EXPERIMENT","index$":3}, {"active":true,"entity":"experiment","key$":"BasicExperimentFlow","kind":"basic","name":"BasicExperimentFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"experiment_ref01"}}]}]}, 'Experiment', {"GET /v2/cdn/experiments":{"protocol":"http","parameters":[{"name":"cv","in":"query","required":false,"schema":{"type":"integer","example":1541863983},"description":"Cached version Unix timestamp. Learn more in the [Caching concept](https://www.storyblok.com/docs/concepts/caching).","index$":0},{"name":"token","in":"query","required":true,"x-speakeasy-ignore":true,"description":"A preview or public [access token](https://www.storyblok.com/docs/concepts/access-tokens) configured in a space.","schema":{"type":"string","example":"ask9soUkv02QqbZgmZdeDAtt"},"index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let experiment_ref01_data = Object.values(setup.data.existing.experiment)[0] as any

    // LIST
    const experiment_ref01_ent = client.Experiment()
    const experiment_ref01_match: any = {}

    const experiment_ref01_list = (await experiment_ref01_ent.list(experiment_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/experiment/ExperimentTestData.json')

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
    ['experiment01','experiment02','experiment03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'STORYBLOK_SDK_TEST_EXPERIMENT_ENTID': idmap,
    'STORYBLOK_SDK_TEST_LIVE': 'FALSE',
    'STORYBLOK_SDK_TEST_EXPLAIN': 'FALSE',
    'STORYBLOK_SDK_APIKEY': '',
  })

  idmap = env['STORYBLOK_SDK_TEST_EXPERIMENT_ENTID']

  const live = 'TRUE' === env.STORYBLOK_SDK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['STORYBLOK_SDK_TEST_EXPERIMENT_ENTID']
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
  
