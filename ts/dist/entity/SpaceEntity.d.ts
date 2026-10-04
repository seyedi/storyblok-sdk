import { StoryblokSdkEntityBase } from '../StoryblokSdkEntityBase';
import type { StoryblokSdkSDK } from '../StoryblokSdkSDK';
import type { Control } from '../types';
import type { Space, SpaceLoadMatch } from '../StoryblokSdkTypes';
declare class SpaceEntity extends StoryblokSdkEntityBase<Space> {
    constructor(client: StoryblokSdkSDK, entopts: any);
    make(this: SpaceEntity): SpaceEntity;
    load(this: any, reqmatch?: SpaceLoadMatch, ctrl?: Control): Promise<SpaceEntity>;
}
export { SpaceEntity };
