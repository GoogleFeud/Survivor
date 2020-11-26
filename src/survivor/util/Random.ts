


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

