

export function reducePhases(phase: number, phaseCount: number, eps = 0) : Array<number> {
    if (phase < 0) return [eps, phaseCount - phase];
    while (phase > phaseCount) {
        eps++;
        phase -= phaseCount;
    }
    return [eps, phase];
}

