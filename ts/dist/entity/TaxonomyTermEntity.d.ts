import { StoryblokSdkEntityBase } from '../StoryblokSdkEntityBase';
import type { StoryblokSdkSDK } from '../StoryblokSdkSDK';
import type { Control } from '../types';
import type { TaxonomyTerm, TaxonomyTermLoadMatch } from '../StoryblokSdkTypes';
declare class TaxonomyTermEntity extends StoryblokSdkEntityBase<TaxonomyTerm> {
    constructor(client: StoryblokSdkSDK, entopts: any);
    make(this: TaxonomyTermEntity): TaxonomyTermEntity;
    load(this: any, reqmatch?: TaxonomyTermLoadMatch, ctrl?: Control): Promise<TaxonomyTermEntity>;
}
export { TaxonomyTermEntity };
