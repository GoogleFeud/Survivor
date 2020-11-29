

import { start } from "repl";
import {Engine} from "./survivor/Engine";
import { Castaway } from "./survivor/structures/Castaway/Castaway";
import {Strategy, StrategyClass} from "./survivor/structures/Castaway/Strategy";
import * as Random from "./survivor/util/Random";

const game = new Engine({
    minTraits: 0,
    maxTraits: 3
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
    class FirstStrat extends Strategy { 
        constructor(player: Castaway) {
            super(player);
            this.name = "A";
        }
        static _name = "A"; 
        static weight = 5; 
    },
    class SecondStrat extends Strategy { 
        constructor(player: Castaway) {
            super(player);
            this.name = "B";
        }
        static _name = "B"; 
        static weight = 3; 
    },
    class ThirdStrat extends Strategy { 
        constructor(player: Castaway) {
            super(player);
            this.name = "C";
        }
        static _name = "C"; 
        static weight = 1; 
    }
);


game.castaways.add(
    {firstName: "Google", lastName: "Feud"},
    {firstName: "Hidden", lastName: "Something"},
    {firstName: "C", lastName: "Something"},
    {firstName: "D", lastName: "Something"},
    {firstName: "E", lastName: "Something"},
);

console.log(game.castaways.map(c => c.strategy.name));