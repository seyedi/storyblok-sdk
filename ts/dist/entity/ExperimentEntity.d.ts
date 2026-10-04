import { StoryblokSdkEntityBase } from '../StoryblokSdkEntityBase';
import type { StoryblokSdkSDK } from '../StoryblokSdkSDK';
import type { Control } from '../types';
import type { Experiment, ExperimentListMatch } from '../StoryblokSdkTypes';
declare class ExperimentEntity extends StoryblokSdkEntityBase<Experiment> {
    constructor(client: StoryblokSdkSDK, entopts: any);
    make(this: ExperimentEntity): ExperimentEntity;
    list(this: any, reqmatch?: ExperimentListMatch, ctrl?: Control): Promise<ExperimentEntity[]>;
}
export { ExperimentEntity };
