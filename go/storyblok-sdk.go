package voxgigstorybloksdksdk

import (
	"github.com/voxgig-sdk/storyblok-sdk/go/core"
	"github.com/voxgig-sdk/storyblok-sdk/go/entity"
	"github.com/voxgig-sdk/storyblok-sdk/go/feature"
	_ "github.com/voxgig-sdk/storyblok-sdk/go/utility"
)

// Type aliases preserve external API.
type StoryblokSdkSDK = core.StoryblokSdkSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type StoryblokSdkEntity = core.StoryblokSdkEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type StoryblokSdkError = core.StoryblokSdkError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAssetEntityFunc = func(client *core.StoryblokSdkSDK, entopts map[string]any) core.StoryblokSdkEntity {
		return entity.NewAssetEntity(client, entopts)
	}
	core.NewDataSourceEntityFunc = func(client *core.StoryblokSdkSDK, entopts map[string]any) core.StoryblokSdkEntity {
		return entity.NewDataSourceEntity(client, entopts)
	}
	core.NewDataSourceEntryEntityFunc = func(client *core.StoryblokSdkSDK, entopts map[string]any) core.StoryblokSdkEntity {
		return entity.NewDataSourceEntryEntity(client, entopts)
	}
	core.NewExperimentEntityFunc = func(client *core.StoryblokSdkSDK, entopts map[string]any) core.StoryblokSdkEntity {
		return entity.NewExperimentEntity(client, entopts)
	}
	core.NewLinkEntityFunc = func(client *core.StoryblokSdkSDK, entopts map[string]any) core.StoryblokSdkEntity {
		return entity.NewLinkEntity(client, entopts)
	}
	core.NewSpaceEntityFunc = func(client *core.StoryblokSdkSDK, entopts map[string]any) core.StoryblokSdkEntity {
		return entity.NewSpaceEntity(client, entopts)
	}
	core.NewStoryEntityFunc = func(client *core.StoryblokSdkSDK, entopts map[string]any) core.StoryblokSdkEntity {
		return entity.NewStoryEntity(client, entopts)
	}
	core.NewTagEntityFunc = func(client *core.StoryblokSdkSDK, entopts map[string]any) core.StoryblokSdkEntity {
		return entity.NewTagEntity(client, entopts)
	}
	core.NewTaxonomyEntityFunc = func(client *core.StoryblokSdkSDK, entopts map[string]any) core.StoryblokSdkEntity {
		return entity.NewTaxonomyEntity(client, entopts)
	}
	core.NewTaxonomyTermEntityFunc = func(client *core.StoryblokSdkSDK, entopts map[string]any) core.StoryblokSdkEntity {
		return entity.NewTaxonomyTermEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewStoryblokSdkSDK = core.NewStoryblokSdkSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewStoryblokSdkSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *StoryblokSdkSDK  { return NewStoryblokSdkSDK(nil) }
func Test() *StoryblokSdkSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
