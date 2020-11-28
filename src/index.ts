

import {Engine} from "./survivor/Engine";
import {Strategy} from "./survivor/structures/Castaway/Strategy";
import {Castaway} from "./survivor/structures/Castaway/Castaway";
import * as Random from "./survivor/util/Random";

const game = new Engine({
    minTraits: 2,
    maxTraits: 5
});

game.traits.add(
    {name: "A", description: ""},
    {name: "B", description: ""},
    {name: "D", description: ""},
    {name: "E", description: ""},
    {name: "F", description: ""},
    {name: "C", description: "", conflicts: ["A", "B"]}
);

game.strategies.add(
    class FirstStrat extends Strategy { static _name = "A"; static weight = 3; },
    class SecondStrat extends Strategy { static _name = "B"; static weight = 5; },
    class ThirdStrat extends Strategy { static _name = "C"; static weight = 1; }
);

const me = new Castaway(game, {
    firstName: "Google",
    lastName: "Feud"
});

console.log(me);

const rng = Random.arrWeighted(game.strategies.valArray(), 100);
let one = 0;
let two = 0;
let three = 0;

for (const el of rng) {
    if (el) {
        if (el._name === "A") one++;
        else if (el._name === "B") two++;
        else if (el._name === "C") three++;
    }
}

console.log(one, two, three);
