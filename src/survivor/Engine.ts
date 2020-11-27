
import { TraitCollector } from "./collectors/TraitCollector";


export class Engine {
    traits: TraitCollector
    constructor() {
        this.traits = new TraitCollector();
    }
}