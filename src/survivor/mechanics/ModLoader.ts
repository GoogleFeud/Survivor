

import { Engine } from "../Engine";
import { Collection } from "../util/Collection";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Random from "../util/Random";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Utils from "../util/Utils";

export interface Mod {
    name: string,
    load: (engine: Engine) => void,
    unload: (engine: Engine) => void,
    conflicts: Array<string>
}

export class ModLoader extends Collection<Mod> {
    engine: Engine
    constructor(engine: Engine) {
        super();
        this.engine = engine;
    }

    load(script: string|Mod) : string|null {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let src: any = script;
        if (typeof script === "string") {
            try {
                src = eval(script);
                if (typeof src !== "function") return "Script must return a function";
                src = src(Utils, Random);
            }catch(err) {
                return "Mod wasn't parsed correctly. " + err;
            }
        }
        if (!src  
                || !src.load 
                || !src.unload 
                || !src.name
                || typeof src.load !== "function"
                || typeof src.unload !== "function"
                || typeof src.name !== "string"
        ) return "Mod is not configured properly.";
        if (this.has(src.name)) return "Mod with the same name is already loaded.";
        if (src.conflicts instanceof Array && src.conflicts.includes("cycle") && this.some(m => m.conflicts.includes("cycle"))) {
            return `Mod has conflicts with ${this.find(m => m.conflicts.includes("cycle"))?.name}`;
        }
        this.set(src.name, src);
        src.load(this.engine);
        return null;
    }

    unload(name: string) : void {
        const mod = this.get(name);
        if (!mod) return;
        mod.unload(this.engine);
    }

}