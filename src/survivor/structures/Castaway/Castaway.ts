import { Engine } from "../../Engine";
import {Trait} from "./Trait";
import { Collection } from "../../util/Collection";
import * as Random from "../../util/Random";

export class Castaway {
    engine: Engine
    firstName: string
    lastName: string
    gender: string
    job: string
    mood: number
    traits: Collection<Trait>
    constructor(engine: Engine, data: CastawayData) {
        this.engine = engine;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.gender = data.gender || Random.arr(["male", "female"]) as unknown as string;
        this.job = data.job || "unemployed";
        this.mood = data.mood ?? 0;
        if (data.traits instanceof Collection) this.traits = data.traits;
        else if (data.traits instanceof Array) this.traits = this.engine.traits.filter(trait => (data.traits as Array<string> || []).includes(trait.name));
        else this.traits = new Collection();
    }
}


export interface CastawayData {
    firstName: string,
    lastName: string,
    gender?: string,
    job?: string,
    mood?: number,
    traits?: Array<string>|Collection<Trait>

}