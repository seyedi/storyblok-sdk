

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


describe('AssetEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when STORYBLOK_SDK_TEST_LIVE=TRUE.
  afterEach(liveDelay('STORYBLOK_SDK_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = StoryblokSdkSDK.test()
    const ent = testsdk.Asset()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.STORYBLOK_SDK_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'asset.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"alt":{"a":true,"h":"Alt","n":"alt","r":true,"sh":"Alt text for the asset (default language).","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"alt","index$":0},"asset_folder_id":{"a":true,"h":"Asset Folder Id","n":"asset_folder_id","r":true,"sh":"Id of the folder that contains this asset.","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"asset_folder_id","index$":1},"content_length":{"a":true,"h":"Content Length","n":"content_length","r":true,"sh":"The content length in bytes.","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"content_length","index$":2},"content_type":{"a":true,"h":"Content Type","n":"content_type","r":true,"sh":"The asset’s MIME type.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"content_type","index$":3},"copyright":{"a":true,"h":"Copyright","n":"copyright","r":true,"sh":"Copyright text.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"copyright","index$":4},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":true,"sh":"Creation timestamp.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"created_at","index$":5},"expire_at":{"a":true,"fo":"date-time","h":"Expire At","n":"expire_at","r":true,"sh":"Expiration timestamp.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"expire_at","index$":6},"filename":{"a":true,"h":"Filename","n":"filename","r":true,"sh":"Full path of the asset, including the file name.","t":"`$STRING`","key$":"filename","index$":7},"focus":{"a":true,"h":"Focus","n":"focus","r":true,"sh":"Focus.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"focus","index$":8},"is_private":{"a":true,"h":"Is Private","n":"is_private","r":true,"sh":"Defines if the asset should be inaccessible to the public.","t":"`$BOOLEAN`","key$":"is_private","index$":9},"signed_url":{"a":true,"h":"Signed Url","n":"signed_url","r":false,"sh":"The signed URL for the asset.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"signed_url","index$":10},"title":{"a":true,"h":"Title","n":"title","r":true,"sh":"Title of the asset.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"title","index$":11},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"sh":"Latest update timestamp.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"updated_at","index$":12}},"name":"asset","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/cdn/assets/me","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"filename","k":"query","n":"filename","or":"filename","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"ask9soUkv02QqbZgmZdeDAtt","k":"query","n":"token","or":"token","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v2/cdn/assets/me","q":{"$action":"me","exist":["filename","token"]},"r":{},"s":[{"lit":"v2"},{"lit":"cdn"},{"lit":"assets"},{"lit":"me"}],"t":{"req":"`reqdata`","res":"`body.asset`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"asset","name__orig":"asset","Name":"Asset","name_":"asset","name-":"asset","NAME":"ASSET","index$":0}, {"active":true,"entity":"asset","key$":"BasicAssetFlow","kind":"basic","name":"BasicAssetFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"asset_ref01","srcdatavar":"asset_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-asset_ref01"}}],"index$":0}]}, 'Asset', {"GET /v2/cdn/assets/me":{"protocol":"http","parameters":[{"name":"filename","in":"query","schema":{"type":"string","example":"filename"},"description":"Complete URL of the asset.","required":true,"index$":0},{"name":"token","in":"query","required":true,"x-speakeasy-ignore":true,"description":"A preview or public [access token](https://www.storyblok.com/docs/concepts/access-tokens) configured in a space.","schema":{"type":"string","example":"ask9soUkv02QqbZgmZdeDAtt"},"index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let asset_ref01_data = Object.values(setup.data.existing.asset)[0] as any

    // LOAD
    const asset_ref01_ent = client.Asset()
    const asset_ref01_match_dt0: any = {}
    const asset_ref01_data_dt0 = (await asset_ref01_ent.load(asset_ref01_match_dt0)).data()
    assert(null != asset_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/asset/AssetTestData.json')

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
    ['asset01','asset02','asset03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'STORYBLOK_SDK_TEST_ASSET_ENTID': idmap,
    'STORYBLOK_SDK_TEST_LIVE': 'FALSE',
    'STORYBLOK_SDK_TEST_EXPLAIN': 'FALSE',
    'STORYBLOK_SDK_APIKEY': '',
  })

  idmap = env['STORYBLOK_SDK_TEST_ASSET_ENTID']

  const live = 'TRUE' === env.STORYBLOK_SDK_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['STORYBLOK_SDK_TEST_ASSET_ENTID']
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
  
