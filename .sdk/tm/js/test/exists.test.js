
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { StoryblokSdkSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await StoryblokSdkSDK.test()
    equal(null !== testsdk, true)
  })

})
