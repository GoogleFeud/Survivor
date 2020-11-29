

export type CollectionCallback<T> = (val: T, key: string) => boolean|void

export type CollectionConstructor<T> = Iterable<readonly [string, T]>;

export interface Collectable {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}


export class Collection<T> extends Map<string, T> {
    private valArrayCache?: Array<T>
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(iterator?: CollectionConstructor<T>) {
        if (!iterator) super();
        else super(iterator);
    } 
 
    set(key: string, value: T) : this {
        delete this.valArrayCache;
        return super.set(key, value);
    }
 
    delete(key: string) : boolean {
        delete this.valArrayCache;
        return super.delete(key);
    }
 
    clear() : void {
        delete this.valArrayCache;
        super.clear();
    }
 
    has(key: string) : boolean {
        return super.has(key);
    }
 
    filter(fn: CollectionCallback<T>) : Collection<T> {
        const res = new Collection<T>();
        for (const [key, val] of this) {
            if (fn(val, key)) res.set(key, val);
        }
        return res;
    }
 
    find(fn: CollectionCallback<T>) : T|null {
        for (const [key, val] of this) {
            if (fn(val, key)) return val;
        }
        return null;
    }
 
    some(fn: CollectionCallback<T>) : boolean {
        for (const [key, val] of this) {
            if (fn(val, key)) return true;
        }
        return false;
    }
 
    every(fn: CollectionCallback<T>) : boolean {
        for (const [key, val] of this) {
            if (!fn(val, key)) return false;
        }
        return true;
    }
 
    map<A>(fn: (val: T, key: string) => A) : Array<A> {
        const res = [];
        for (const [key, val] of this) {
            res.push(fn(val, key));
        }
        return res;
    }
 
    keyArray() : Array<string> {
        return [...this.keys()];
    }
 
    valArray() : Array<T> {
        if (!this.valArrayCache) this.valArrayCache = [...this.values()];
        return this.valArrayCache;
    }
 
    randomValUnique(amount = 1, filter?: (val: T, index: number) => boolean) : Array<T> {
        let arr = this.valArray();
        if (arr.length === 0 || !amount) return [];
        if (filter) arr = arr.filter(filter);
        else arr = arr.slice();
        return Array.from({ length: amount }, () => arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
    }

    randomVal(amount = 1, filter?: (val: T, index: number) => boolean) : Array<T> {
        let arr = this.valArray();
        if (arr.length === 0 || !amount) return [];
        if (filter) arr = arr.filter(filter);
        return Array.from({length: amount}, () => arr[Math.floor(Math.random() * arr.length)]);
    }
 
    partition(fn: CollectionCallback<T>) : Array<Collection<T>> {
        const res = [new Collection<T>(), new Collection<T>()];
        for (const [key, val] of this) {
            if (fn(val, key)) res[0].set(key, val);
            else res[1].set(key, val);
        }
        return res;
    }
 
    sweep(fn: CollectionCallback<T>) : void {
        for (const [key, val] of this) {
            if (fn(val, key)) this.delete(key);
        }
    }

    static fromArray<V extends Collectable>(arr: Array<V|undefined>, arg = "name") : Collection<V> {
        const col = new Collection<V>();
        for (const item of arr) {
            if (item) col.set(item[arg], item);
        }
        return col;
    }
 
    clone() : Collection<T> {
        return new Collection(this);
    }
 
    first() : T {
        return this.valArray()[0];
    }
 
    last() : T {
        return this.valArray()[this.size - 1];
    }
 
}