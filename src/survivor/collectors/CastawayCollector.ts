

import {Engine} from "../Engine";
import {Collection, CollectionConstructor} from "../util/Collection";
import {Castaway, CastawayData} from "../structures/Castaway/Castaway";

export class CastawayCollector extends Collection<Castaway> {
    engine: Engine
    constructor(engine: Engine, obj?: CollectionConstructor<Castaway>) {
        super(obj);
        this.engine = engine;
    }

    add(...players: Array<CastawayData|Castaway>) : void {
        for (const player of players) {
            if (player instanceof Castaway) this.set(player.firstName, player);
            else this.set(player.firstName, new Castaway(this.engine, player));
        }
    }

    eliminated() : CastawayCollector {
        return new CastawayCollector(this.engine, this.filter(pl => pl.eliminated));
    }

    notEliminated() : CastawayCollector {
        return new CastawayCollector(this.engine, this.filter(pl => !pl.eliminated));
    }

    callStrategy(name: string, ...params: Array<unknown>) : 

}