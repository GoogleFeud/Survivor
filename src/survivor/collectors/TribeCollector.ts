
import { Engine } from "../Engine";
import {Tribe, TribeData} from "../structures/Tribe";
import {Collection, CollectionConstructor} from "../util/Collection";


export class TribeCollector extends Collection<Tribe> {
    engine: Engine
    constructor(engine: Engine, objs?: CollectionConstructor<Tribe>) {
        super(objs);
        this.engine = engine;
    }

    add(...tribes: Array<Tribe|TribeData>) : void {
        for (const tribe of tribes) {
            if (tribe instanceof Tribe) this.set(tribe.name, tribe);
            else this.set(tribe.name, new Tribe(this.engine, tribe));
        }
    }

    remove(...tribeNames: Array<string>) : void {
        for (const name of tribeNames) this.delete(name);
    } 
    
}