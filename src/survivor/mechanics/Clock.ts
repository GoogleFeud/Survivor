import { Engine } from "../Engine";
import EventEmitter from "eventemitter3";

export interface EpisodePhaseCount {
    [key: number]: number
}

export type ScheduledFunction = (engine: Engine) => void;

interface ScheduledFunctions {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: number]: any
}

export class Clock extends EventEmitter {
    engine: Engine
    episode: number
    phase: number
    phaseCount: number
    private scheduledFunctions: ScheduledFunctions;
    constructor(engine: Engine) {
        super();
        this.phaseCount = engine.settings.phaseCountPerEpisode;
        this.engine = engine;
        this.episode = 1;
        this.phase = -1;
        this.scheduledFunctions = {};
    }

    progress() : void {
        if (this.phase === this.phaseCount) {
            this.callSchedule(this.episode);
            this.emit("episode", ++this.episode);
            this.phaseCount = this.engine.settings.phaseCountPerEpisode;
            this.callSchedule(this.episode, 0);
            this.emit("phase", this.phase = 0);
        } else {
            this.phase += 1;
            this.callSchedule(this.episode, this.phase);
            this.emit("phase", this.phase);
        }
    }

    setPhaseCount(count: number) : void {
        this.phaseCount = count;
    } 

    speedTo(episode: number, phase = 0, phaseCounts: EpisodePhaseCount = {}) : void {
        if (episode <= this.episode || phase > this.phaseCount || phase < 0) return;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            this.phaseCount = phaseCounts[this.episode] ? phaseCounts[this.episode]:this.phaseCount;
            this.progress();
            if (this.episode === episode && this.phase === phase) return;
        }
    }

    schedule(fn: ScheduledFunction, episode: number, phase = 0) : void {
        if (!this.scheduledFunctions[episode]) this.scheduledFunctions[episode] = {[phase]: [fn]};
        else if (!this.scheduledFunctions[episode][phase]) this.scheduledFunctions[episode][phase] = [fn];
        else this.scheduledFunctions[episode][phase].push(fn);
    }

    private callSchedule(episode: number, phase?: number) : void {
        if (phase === undefined) delete this.scheduledFunctions[episode];
        else {
            if (!this.scheduledFunctions[episode] || !this.scheduledFunctions[episode][phase]) return;
            for (const fn of this.scheduledFunctions[episode][phase]) fn(this.engine);
            delete this.scheduledFunctions[episode][phase];
        }
    }

}