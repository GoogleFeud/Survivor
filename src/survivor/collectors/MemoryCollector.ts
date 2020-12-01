

import { Castaway } from "../structures/Castaway/Castaway";
import { Memory, MemoryData } from "../structures/Castaway/Memory";
import {Collection, CollectionConstructor} from "../util/Collection";


export class MemoryCollector extends Collection<Memory> {
    castaway: Castaway
    constructor(player: Castaway, obj?: CollectionConstructor<Memory>) {
        super(obj);
        this.castaway = player;
    }

    add(...memories: Array<MemoryData>) : void {
        for (const memory of memories) {
            if (this.has(memory.name)) {
                const mem = this.get(memory.name) as Memory;
                if (memory.stacks && mem.stacks) mem.stack(memory); 
            } else {
                const mem = new Memory(this.castaway, memory);
                mem.schedule();
                this.set(mem.name, mem);
            }
        }
    }
}