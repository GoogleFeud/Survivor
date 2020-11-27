

import {Engine} from "./survivor/Engine";

const game = new Engine();

game.traits.add(
    {name: "A", description: ""},
    {name: "B", description: ""},
    {name: "C", description: "", conflicts: ["A", "B"]}
);

console.log(game.traits.randomValConflicts(2));