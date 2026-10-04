package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAssetEntityFunc func(client *StoryblokSdkSDK, entopts map[string]any) StoryblokSdkEntity

var NewDataSourceEntityFunc func(client *StoryblokSdkSDK, entopts map[string]any) StoryblokSdkEntity

var NewDataSourceEntryEntityFunc func(client *StoryblokSdkSDK, entopts map[string]any) StoryblokSdkEntity

var NewExperimentEntityFunc func(client *StoryblokSdkSDK, entopts map[string]any) StoryblokSdkEntity

var NewLinkEntityFunc func(client *StoryblokSdkSDK, entopts map[string]any) StoryblokSdkEntity

var NewSpaceEntityFunc func(client *StoryblokSdkSDK, entopts map[string]any) StoryblokSdkEntity

var NewStoryEntityFunc func(client *StoryblokSdkSDK, entopts map[string]any) StoryblokSdkEntity

var NewTagEntityFunc func(client *StoryblokSdkSDK, entopts map[string]any) StoryblokSdkEntity

var NewTaxonomyEntityFunc func(client *StoryblokSdkSDK, entopts map[string]any) StoryblokSdkEntity

var NewTaxonomyTermEntityFunc func(client *StoryblokSdkSDK, entopts map[string]any) StoryblokSdkEntity

