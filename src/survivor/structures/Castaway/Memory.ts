
import { Castaway } from "./Castaway";

export type OnMemoryExpire = (player: Castaway) => void;

export class Memory {
    name: string
    expiresAt: Array<number>
    stacks: boolean
    private scheduleId?: number
    instances: number
    castaway: Castaway
    moodBoost: number
    constructor(player: Castaway, data: MemoryData) {
        this.castaway = player;
        this.name = data.name;
        this.expiresAt = data.expiresAt;
        this.stacks = data.stacks ?? false;
        this.moodBoost = data.moodBoost ?? 0;
        this.instances = 0;
    }

    schedule() : void {
        this.castaway.mood += this.moodBoost;
        this.instances++;
        this.scheduleId = this.castaway.engine.clock.schedule(() => {
            this.castaway.mood -= this.moodBoost;
            if (this.instances === 1) this.castaway.memory.delete(this.name);
            else this.instances--;
        }, this.expiresAt[0], this.expiresAt[1] ?? 1);
    }

    cancel() : void {
        if (!this.scheduleId) return;
        this.castaway.engine.clock.cancelSchedule(this.scheduleId, this.expiresAt[0], this.expiresAt[1] ?? 1);
    }

    stack(mem: MemoryData) : void {
        this.expiresAt = mem.expiresAt;
        this.schedule();
    } 
}

export interface MemoryData {
    name: string,
    expiresAt: Array<number>,
    stacks?: boolean,
    moodBoost?: number
}