

export interface WeightedValue {   
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any,
    weight: number
}

export function btw(min: number, max: number, amount = 1) : number | Array<number> {
    if (amount === 1) return Math.floor(Math.random() * (max - min) + min);
    return Array.from({length: amount}, () => Math.floor(Math.random() * (max - min) + min));
}

export function bool(amount = 1) : boolean | Array<boolean> {
    if (amount === 1) return Math.round(Math.random()) > 0.5 ? true:false;
    return Array.from({length: amount}, () => Math.round(Math.random()) > 0.5 ? true:false);
}
 
export function arrUnique<T>(array: Array<T>, amount = 1, filter?: (val: T, index: number) => boolean) : Array<T> {
    let arr = array;
    if (arr.length === 0 || !amount) return [];
    if (filter) arr = array.filter(filter);
    else arr = array.slice();
    return Array.from({ length: amount }, () => arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
}

export function arr<T>(array: Array<T>, amount = 1, filter?: (val: T, index: number) => boolean) : Array<T> {
    if (array.length === 0 || !amount) return [];
    if (filter) array = array.filter(filter);
    return Array.from({ length: amount }, () => array[Math.floor(Math.random() * array.length)]);
}

export function arrUniqueWeighted<T extends WeightedValue>(array: Array<T>, amount = 1, filter?: (val: T, index: number) => boolean) : Array<T|undefined> {
    let arr = array;
    if (arr.length === 0 || !amount) return [];
    if (filter) arr = array.filter(filter);
    else arr = array.slice();
    return Array.from({length: amount}, () => {
        const weightSum = array.reduce((acc, val) => acc + val.weight, 1);
        const target = Math.floor(Math.random() * weightSum);
        const arrayLength = arr.length;
        let total = 0;
        for (let i=0; i < arrayLength; i++) {
            const el = arr[i];
            total += el.weight;
            if (total >= target) {
                arr.splice(i, 1);
                return el;
            }
        }
    });
}

export function arrWeighted<T extends WeightedValue>(array: Array<T>, amount = 1, filter?: (val: T, index: number) => boolean) : Array<T|undefined> {
    if (arr.length === 0 || !amount) return [];
    if (filter) array = array.filter(filter);
    const weightSum = array.reduce((acc, val) => acc + val.weight, 1);
    return Array.from({length: amount}, () => {
        const target = Math.floor(Math.random() * weightSum);
        let total = 0;
        for (const el of array) {
            total += el.weight;
            if (total >= target) return el;
        }
    });
}