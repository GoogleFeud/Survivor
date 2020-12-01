/* eslint-disable @typescript-eslint/explicit-module-boundary-types */


export function reducePhases(phase: number, phaseCount: number, eps = 0) : Array<number> {
    if (phase < 0) return [eps, phaseCount - phase];
    while (phase > phaseCount) {
        eps++;
        phase -= phaseCount;
    }
    return [eps, phase];
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any 
export function cloneObject(obj: any, ...keys: Array<string>) : any {
    const clone = {...obj};
    for (const key of keys) delete clone[key];
    return clone;
}

