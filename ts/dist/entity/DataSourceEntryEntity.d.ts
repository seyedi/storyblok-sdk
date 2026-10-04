import { StoryblokSdkEntityBase } from '../StoryblokSdkEntityBase';
import type { StoryblokSdkSDK } from '../StoryblokSdkSDK';
import type { Control } from '../types';
import type { DataSourceEntry, DataSourceEntryListMatch } from '../StoryblokSdkTypes';
declare class DataSourceEntryEntity extends StoryblokSdkEntityBase<DataSourceEntry> {
    constructor(client: StoryblokSdkSDK, entopts: any);
    make(this: DataSourceEntryEntity): DataSourceEntryEntity;
    list(this: any, reqmatch?: DataSourceEntryListMatch, ctrl?: Control): Promise<DataSourceEntryEntity[]>;
}
export { DataSourceEntryEntity };
