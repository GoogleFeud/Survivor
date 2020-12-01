

import { StrategyClass } from "../structures/Castaway/Strategy";
import {Collection, CollectionConstructor} from "../util/Collection";


export class StrategyCollector extends Collection<StrategyClass> {
    constructor(obj?: CollectionConstructor<StrategyClass>) {
        super(obj);
    }

    add(...strategies: Array<StrategyClass>) : void {
        for (const strat of strategies) this.set(strat._name, strat);
    } 

    remove(...strategyNames: Array<string>) : void {
        for (const name of strategyNames) this.delete(name);
    }

}