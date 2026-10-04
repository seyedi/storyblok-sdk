import { StoryblokSdkEntityBase } from '../StoryblokSdkEntityBase';
import type { StoryblokSdkSDK } from '../StoryblokSdkSDK';
import type { Control } from '../types';
import type { Asset, AssetLoadMatch } from '../StoryblokSdkTypes';
declare class AssetEntity extends StoryblokSdkEntityBase<Asset> {
    constructor(client: StoryblokSdkSDK, entopts: any);
    make(this: AssetEntity): AssetEntity;
    load(this: any, reqmatch?: AssetLoadMatch, ctrl?: Control): Promise<AssetEntity>;
}
export { AssetEntity };
