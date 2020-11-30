

import {Engine} from "./survivor/Engine";
import { Castaway } from "./survivor/structures/Castaway/Castaway";
import {Strategy} from "./survivor/structures/Castaway/Strategy";

const game = new Engine({
    minTraits: 0,
    maxTraits: 3
});

game.events.add(
    {
        fn: () => {
            console.log("First event!");
        },
        weight: 10
    },
    {
        fn: () => {
            console.log("Second event!");
        },
        weight: 5
    },
    {
        fn: () => {
            console.log("Third event!");
        },
        weight: 1
    }
);

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

game.events.callRandom(game, 10);

game.clock.on("episode", (count: number) => {
    console.log("Episode: ", count);
});

game.clock.on("phase", (count: number) => {
    console.log("Phase: ", count);
});


document.addEventListener("click", () => {
    game.clock.speedTo(5, 0, {3: 5});
});
