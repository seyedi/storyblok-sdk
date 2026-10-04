import { StoryblokSdkEntityBase } from '../StoryblokSdkEntityBase';
import type { StoryblokSdkSDK } from '../StoryblokSdkSDK';
import type { Control } from '../types';
import type { DataSource, DataSourceLoadMatch, DataSourceListMatch } from '../StoryblokSdkTypes';
declare class DataSourceEntity extends StoryblokSdkEntityBase<DataSource> {
    constructor(client: StoryblokSdkSDK, entopts: any);
    make(this: DataSourceEntity): DataSourceEntity;
    load(this: any, reqmatch?: DataSourceLoadMatch, ctrl?: Control): Promise<DataSourceEntity>;
    list(this: any, reqmatch?: DataSourceListMatch, ctrl?: Control): Promise<DataSourceEntity[]>;
}
export { DataSourceEntity };
