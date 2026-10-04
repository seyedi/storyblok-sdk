import { AssetEntity } from './entity/AssetEntity';
import { DataSourceEntity } from './entity/DataSourceEntity';
import { DataSourceEntryEntity } from './entity/DataSourceEntryEntity';
import { ExperimentEntity } from './entity/ExperimentEntity';
import { LinkEntity } from './entity/LinkEntity';
import { SpaceEntity } from './entity/SpaceEntity';
import { StoryEntity } from './entity/StoryEntity';
import { TagEntity } from './entity/TagEntity';
import { TaxonomyEntity } from './entity/TaxonomyEntity';
import { TaxonomyTermEntity } from './entity/TaxonomyTermEntity';
export type * from './StoryblokSdkTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { StoryblokSdkEntityBase } from './StoryblokSdkEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class StoryblokSdkSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    } | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    } | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Asset(entopts?: Record<string, any>): AssetEntity;
    DataSource(entopts?: Record<string, any>): DataSourceEntity;
    DataSourceEntry(entopts?: Record<string, any>): DataSourceEntryEntity;
    Experiment(entopts?: Record<string, any>): ExperimentEntity;
    Link(entopts?: Record<string, any>): LinkEntity;
    Space(entopts?: Record<string, any>): SpaceEntity;
    Story(entopts?: Record<string, any>): StoryEntity;
    Tag(entopts?: Record<string, any>): TagEntity;
    Taxonomy(entopts?: Record<string, any>): TaxonomyEntity;
    TaxonomyTerm(entopts?: Record<string, any>): TaxonomyTermEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): StoryblokSdkSDK;
    tester(testopts?: any, sdkopts?: any): StoryblokSdkSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof StoryblokSdkSDK;
export { stdutil, config, BaseFeature, StoryblokSdkEntityBase, StoryblokSdkSDK, SDK, };
