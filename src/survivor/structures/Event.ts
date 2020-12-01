import { Engine } from "../Engine";

export type EventFunction = (engine: Engine) => void;
export type EventChecker = (engine: Engine) => boolean;

export class Event {
    name: string
    description?: string
    fn: EventFunction
    checker?: EventChecker
    weight: number
    constructor(data: EventData) {
        this.name = data.name;
        this.description = data.description;
        this.fn = data.fn;
        this.checker = data.checker;
        this.weight = data.weight || 1;
    }
}


export interface EventData {
    name: string,
    description?: string,
    fn: EventFunction,
    checker?: EventChecker,
    weight?: number
}