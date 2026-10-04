import { StoryblokSdkEntityBase } from '../StoryblokSdkEntityBase';
import type { StoryblokSdkSDK } from '../StoryblokSdkSDK';
import type { Control } from '../types';
import type { Link, LinkLoadMatch } from '../StoryblokSdkTypes';
declare class LinkEntity extends StoryblokSdkEntityBase<Link> {
    constructor(client: StoryblokSdkSDK, entopts: any);
    make(this: LinkEntity): LinkEntity;
    load(this: any, reqmatch?: LinkLoadMatch, ctrl?: Control): Promise<LinkEntity>;
}
export { LinkEntity };
