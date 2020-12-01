
import { TraitCollector } from "./collectors/TraitCollector";
import { StrategyCollector } from "./collectors/StrategyCollector"; 
import { CastawayCollector } from "./collectors/CastawayCollector"; 
import { TribeCollector } from "./collectors/TribeCollector";
import { AllianceList } from "./collectors/AllianceList";
import { EventList } from "./collectors/EventList";
import { Clock } from "./mechanics/Clock";
import { ModLoader } from "./mechanics/ModLoader";

export interface EngineSettings {
    maxTraits: number,
    minTraits: number,
    phaseCountPerEpisode: number
}

export const DEFAULT_ENGINE_SETTINGS: EngineSettings = {
    maxTraits: 3,
    minTraits: 0,
    phaseCountPerEpisode: 3
};

export type Mod = (engine: Engine) => void;

export class Engine {
    settings: EngineSettings
    traits: TraitCollector
    strategies: StrategyCollector
    castaways: CastawayCollector
    tribes: TribeCollector
    alliances: AllianceList
    events: EventList
    clock: Clock
    mods: ModLoader
    constructor(settings: Partial<EngineSettings> = {}) {
        this.settings = Object.assign(DEFAULT_ENGINE_SETTINGS, settings);
        this.traits = new TraitCollector();
        this.strategies = new StrategyCollector();
        this.castaways = new CastawayCollector(this);
        this.tribes = new TribeCollector(this);
        this.alliances = new AllianceList();
        this.events = new EventList();
        this.clock = new Clock(this);
        this.mods = new ModLoader(this);
    }
 

}