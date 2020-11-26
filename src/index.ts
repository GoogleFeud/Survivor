

import {Collection} from "./survivor/util/Collection";
import * as Rng from "./survivor/util/Random";

const col = new Collection<number>();

col.set("A", 1);
col.set("B", 2);
col.set("C", 3);
col.set("D", 4);


const before = Date.now();
console.log(Rng.btw(1, 10, 1000));
console.log(`Took me ${Date.now() - before} ms!`);