/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Engine } from "../Engine";
import { Collection } from "../util/Collection";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Random from "../util/Random";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Utils from "../util/Utils";


export interface ModSettings {
    [key: string]: ModSettings|ModSetting|any
}

export interface ModSetting {
    type: string,
    from?: number,
    to?: number,
    items?: Array<string>,
    match?: RegExp,
    default?: any,
    friendlyName?: string,
    details?: string,
    category: string
}


export interface Mod {
    name: string,
    load: (engine: Engine, settings: ModSettings) => void,
    unload: (engine: Engine, settings: ModSettings) => void,
    conflicts: Array<string>,
    settings: ModSettings,
    currentSettings: any
}

export class ModLoader extends Collection<Mod> {
    engine: Engine
    constructor(engine: Engine) {
        super();
        this.engine = engine;
    }

    load(script: string|Mod) : string|null {
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
        src.currentSettings = {};
        if (!src.settings) src.settings = {};
        else for (const settingName in src.settings) {
            const settingValue = src.settings[settingName];
            if (settingValue.default) src.currentSettings[settingName] = settingValue.default;
            if (!settingValue.category) settingValue.category = "General"; 
        }
        this.set(src.name, src);
        src.load(this.engine, src.currentSettings);
        return null;
    }

    unload(name: string) : void {
        const mod = this.get(name);
        if (!mod) return;
        mod.unload(this.engine, mod.currentSettings);
    }

    reload(name: string) : void {
        const mod = this.get(name);
        if (!mod) return;
        mod.unload(this.engine, mod.currentSettings);
        mod.load(this.engine, mod.currentSettings);
    }

    updateSettings(modName: string, settingName: string, settingValue: any) : void {
        const mod = this.get(modName);
        if (!mod) return;
        mod.currentSettings[settingName] = settingValue;
    }



}