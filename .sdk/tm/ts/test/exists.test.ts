
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { StoryblokSdkSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = StoryblokSdkSDK.test()
    equal(testsdk instanceof StoryblokSdkSDK, true,
      'StoryblokSdkSDK.test() must return a client synchronously')
  })

})
