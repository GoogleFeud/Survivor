

export class Trait {
    name: string
    conflicts: Array<string>
    description: string
    constructor(data: TraitData) {
        this.name = data.name;
        this.conflicts = data.conflicts || [];
        this.description = data.description;
    }
}

export interface TraitData {
    name: string,
    conflicts?: Array<string>,
    description: string
}