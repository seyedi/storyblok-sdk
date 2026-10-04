# StoryblokSdk SDK utility: make_context

from projectname_sdk.core.context import StoryblokSdkContext


def make_context_util(ctxmap, basectx):
    return StoryblokSdkContext(ctxmap, basectx)
