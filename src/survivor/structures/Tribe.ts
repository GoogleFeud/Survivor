import { Engine } from "../Engine";
import { Collection } from "../util/Collection";
import { Castaway } from "./Castaway/Castaway";


export class Tribe {
    engine: Engine
    name: string
    color: string
    constructor(engine: Engine, data: TribeData) {
        this.engine = engine;
        this.name = data.name;
        this.color = data.color || "black";
    }

    castaways(eliminated = false) : Collection<Castaway> {
        return this.engine.castaways.filter(c => c.tribe && c.tribe.name === this.name && c.eliminated === eliminated);
    }

}

export interface TribeData {
    name: string,
    color?: string
}