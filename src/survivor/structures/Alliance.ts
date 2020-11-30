import { Collection } from "../util/Collection";
import { Castaway } from "./Castaway/Castaway";


export class Alliance {
    members: Collection<Castaway>
    creator?: Castaway
    friendlyName?: string
    power: number
    active: boolean
    constructor(members: Array<Castaway>|Collection<Castaway>, creator?: Castaway, friendlyName?: string) {
        if (members instanceof Collection) this.members = members;
        else this.members = Collection.fromArray<Castaway>(members, "firstName");
        this.creator = creator;
        this.friendlyName = friendlyName;
        this.power = 0;
        this.active = true;
    }
}