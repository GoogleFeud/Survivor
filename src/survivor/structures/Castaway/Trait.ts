

export class Trait {
    name: string
    conflicts: Array<string>
    description: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any
    types: Array<string>
    constructor(data: TraitData) {
        this.name = data.name;
        this.conflicts = data.conflicts || [];
        this.description = data.description;
        this.value = data.value;
        this.types = data.types || [];
    }
}

export interface TraitData {
    name: string,
    conflicts?: Array<string>,
    description: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any,
    types?: Array<string>
}