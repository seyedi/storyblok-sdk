# StoryblokSdk SDK exists test

import pytest
from storybloksdk_sdk import StoryblokSdkSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = StoryblokSdkSDK.test(None, None)
        assert testsdk is not None
