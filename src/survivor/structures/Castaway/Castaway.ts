import { Engine } from "../../Engine";
import {Trait} from "./Trait";
import { Collection } from "../../util/Collection";
import * as Random from "../../util/Random";
import { Strategy, StrategyClass } from "./Strategy";

export class Castaway {
    engine: Engine
    firstName: string
    lastName: string
    gender: string
    job: string
    mood: number
    traits: Collection<Trait>
    strategy: Strategy
    constructor(engine: Engine, data: CastawayData) {
        this.engine = engine;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.gender = data.gender || Random.arr(["male", "female"])[0];
        this.job = data.job || "unemployed";
        this.mood = data.mood ?? 0;
        if (data.traits instanceof Collection) this.traits = data.traits;
        else if (data.traits instanceof Array) this.traits = this.engine.traits.filter(trait => (data.traits as Array<string> || []).includes(trait.name));
        else this.traits = Collection.fromArray(this.engine.traits.randomValUniqueConflicts(Random.btw(this.engine.settings.minTraits, this.engine.settings.maxTraits) as number));
        if (data.strategy) this.strategy = new data.strategy(this);
        else this.strategy = new (engine.strategies.randomVal()[0])(this);
    }

}


export interface CastawayData {
    firstName: string,
    lastName: string,
    gender?: string,
    job?: string,
    mood?: number,
    traits?: Array<string>|Collection<Trait>
    strategy?: StrategyClass
}