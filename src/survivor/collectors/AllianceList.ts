import { Alliance } from "../structures/Alliance";
import { Castaway } from "../structures/Castaway/Castaway";
import { Collection } from "../util/Collection";


export class AllianceList extends Array<Alliance> {
    constructor(els?: Array<Alliance>) {
        if (els) super(...els);
        else super();
    }

    create(members: Array<Castaway>|Collection<Castaway>, creator?: Castaway, friendlyName?: string) : Alliance {
        const al = new Alliance(members, creator, friendlyName);
        this.push(al);
        return al;
    }

    with(player: Castaway) : AllianceList {
        return new AllianceList(this.filter(al => al.members.has(player.firstName)));
    }

    createdBy(player: Castaway) : AllianceList {
        return new AllianceList(this.filter(al => al.creator && al.creator.firstName === player.firstName));
    }

    

}