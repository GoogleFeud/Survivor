

import {Collection} from "./survivor/util/Collection";

const col = new Collection<number>();

col.set("A", 1);
col.set("B", 2);
col.set("C", 3);
col.set("D", 4);

console.log(col.randomVal(1));