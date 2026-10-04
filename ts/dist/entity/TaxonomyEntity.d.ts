import { StoryblokSdkEntityBase } from '../StoryblokSdkEntityBase';
import type { StoryblokSdkSDK } from '../StoryblokSdkSDK';
import type { Control } from '../types';
import type { Taxonomy, TaxonomyLoadMatch, TaxonomyListMatch } from '../StoryblokSdkTypes';
declare class TaxonomyEntity extends StoryblokSdkEntityBase<Taxonomy> {
    constructor(client: StoryblokSdkSDK, entopts: any);
    make(this: TaxonomyEntity): TaxonomyEntity;
    load(this: any, reqmatch?: TaxonomyLoadMatch, ctrl?: Control): Promise<TaxonomyEntity>;
    list(this: any, reqmatch?: TaxonomyListMatch, ctrl?: Control): Promise<TaxonomyEntity[]>;
}
export { TaxonomyEntity };
