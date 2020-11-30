import { Castaway } from "./Castaway";

export const NO_SUCH_EVENT = Symbol("No such event");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StrategyEvent = (...args: Array<unknown>) => any

export type StrategyClass = typeof Strategy;

export class Strategy {
    [key: string]: unknown
    player: Castaway
    events: Map<string, StrategyEvent>
    constructor(player: Castaway) {
        this.player = player;
        this.events = new Map();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    call(name: string, ...params: Array<unknown>) : any {
        if (this.events.has(name)) return this.events.get(name)?.(...params);
        // eslint-disable-next-line no-prototype-builtins
        if (typeof this[name] === "function") return (this[name] as StrategyEvent)(...params);
        return NO_SUCH_EVENT;
    }

    static _name = "Default";
    static weight = 1;

}
