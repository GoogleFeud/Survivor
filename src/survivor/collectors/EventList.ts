
import { Engine } from "../Engine";
import {Event, EventData} from "../structures/Event";
import * as Random from "../util/Random";

export class EventList extends Array<Event> {
    constructor(obj?: Array<Event>) {
        if (obj) super(...obj);
        else super();
    }

    add(...events: Array<Event|EventData>) : void {
        for (const event of events) {
            if (event instanceof Event) this.push(event);
            else this.push(new Event(event));
        }
    }

    callRandom(engine: Engine, amount = 1) : void {
        for (const event of Random.arrWeighted(this, amount, (ev) => !ev.checker || ev.checker(engine) === true)) event?.fn(engine);
    }

    callRandomUnique(engine: Engine, amount = 1) : void {
        for (const event of Random.arrUniqueWeighted(this, amount, (ev) => !ev.checker || ev.checker(engine) === true)) event?.fn(engine);
    }

}