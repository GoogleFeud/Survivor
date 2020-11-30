import { Engine } from "../Engine";
import EventEmitter from "eventemitter3";

export interface EpisodePhaseCount {
    [key: number]: number
}

export class Clock extends EventEmitter {
    engine: Engine
    episode: number
    phase: number
    phaseCount: number
    constructor(engine: Engine) {
        super();
        this.phaseCount = engine.settings.phaseCountPerEpisode;
        this.engine = engine;
        this.episode = 1;
        this.phase = -1;
    }

    progress() : void {
        if (this.phase === this.phaseCount) {
            this.emit("episode", ++this.episode);
            this.phaseCount = this.engine.settings.phaseCountPerEpisode;
            this.emit("phase", this.phase = 0);
        } else this.emit("phase", ++this.phase);
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

}