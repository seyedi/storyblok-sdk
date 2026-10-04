import { StoryblokSdkEntityBase } from '../StoryblokSdkEntityBase';
import type { StoryblokSdkSDK } from '../StoryblokSdkSDK';
import type { Control } from '../types';
import type { Story, StoryLoadMatch, StoryListMatch } from '../StoryblokSdkTypes';
declare class StoryEntity extends StoryblokSdkEntityBase<Story> {
    constructor(client: StoryblokSdkSDK, entopts: any);
    make(this: StoryEntity): StoryEntity;
    load(this: any, reqmatch?: StoryLoadMatch, ctrl?: Control): Promise<StoryEntity>;
    list(this: any, reqmatch?: StoryListMatch, ctrl?: Control): Promise<StoryEntity[]>;
}
export { StoryEntity };
