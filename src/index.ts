

import {Engine} from "./survivor/Engine";
import {Strategy} from "./survivor/structures/Castaway/Strategy";
import {Castaway} from "./survivor/structures/Castaway/Castaway";

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
    class FirstStrat extends Strategy { static _name = "Hello"},
    class SecondStrat extends Strategy { static _name = "Hello2"},
    class ThirdStrat extends Strategy { static _name = "Hello3"}
);

const me = new Castaway(game, {
    firstName: "Google",
    lastName: "Feud"
});

console.log(me);