
import {Trait, TraitData} from "../structures/Castaway/Trait";
import {Collection, CollectionConstructor, CollectionCallback} from "../util/Collection";


export class TraitCollector extends Collection<Trait> {
    constructor(obj?: CollectionConstructor<Trait> | Array<TraitData>) {
        if (obj instanceof Array) super(obj.map<[string, Trait]>(data => [data.name, new Trait(data)]));
        else super(obj);
    }

    add(...items: Array<TraitData|Trait>) : void {
        for (const item of items) {
            if (item instanceof Trait) this.set(item.name, item);
            else this.set(item.name, new Trait(item));
        }
    }

    remove(...traitNames: Array<string>) : void {
        for (const name of traitNames) this.delete(name);
    }

    randomValUniqueConflicts(amount = 1, filter?: CollectionCallback<Trait>) : Array<Trait|undefined> {
        let col: Collection<Trait>;
        if (!this.size || !amount) return [];
        if (filter) col = this.filter(filter);
        else col = this.clone();
        return Array.from({length: amount}, () => {
            const item: Trait = col.randomVal()[0];
            if (!item) return undefined;
            if (item.conflicts.length) {
                for (const conflict of item.conflicts) col.delete(conflict);
            }
            if (col.some(trait => trait.conflicts.includes(item.name))) {
                for (const [, val] of col.filter(trait => trait.conflicts.includes(item.name))) col.delete(val.name);
            }
            col.delete(item.name);
            return item;
        });
    }

    randomValConflicts(amount = 1, filter?: CollectionCallback<Trait>) : Array<Trait|undefined> {
        let col: Collection<Trait>;
        if (!this.size || !amount) return [];
        if (filter) col = this.filter(filter);
        else col = this.clone();
        return Array.from({length: amount}, () => {
            const item: Trait = col.randomVal()[0];
            if (!item) return undefined;
            if (item.conflicts.length) {
                for (const conflict of item.conflicts) col.delete(conflict);
            }
            if (col.some(trait => trait.conflicts.includes(item.name))) {
                for (const [, val] of col.filter(trait => trait.conflicts.includes(item.name))) col.delete(val.name);
            }
            return item;
        });
    }

    

}

