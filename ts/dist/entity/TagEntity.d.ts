import { StoryblokSdkEntityBase } from '../StoryblokSdkEntityBase';
import type { StoryblokSdkSDK } from '../StoryblokSdkSDK';
import type { Control } from '../types';
import type { Tag, TagListMatch } from '../StoryblokSdkTypes';
declare class TagEntity extends StoryblokSdkEntityBase<Tag> {
    constructor(client: StoryblokSdkSDK, entopts: any);
    make(this: TagEntity): TagEntity;
    list(this: any, reqmatch?: TagListMatch, ctrl?: Control): Promise<TagEntity[]>;
}
export { TagEntity };
