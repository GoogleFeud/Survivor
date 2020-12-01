

import {Engine} from "./survivor/Engine";

const game = new Engine({
    minTraits: 0,
    maxTraits: 3
});

console.log(game.mods.load(
    `
    ({
        name: "Core",
        conflicts: ["cycle"],

        load: (engine) => {
            console.log("HAI!");
        },
        unload: (engine) => {
            console.log("BAI!");
        }
    })
`
));

console.log(game.mods.load(
    `
    ({
        name: "Core2",
        conflicts: [],

        load: (engine) => {
            console.log("HAI!");
        },
        unload: (engine) => {
            console.log("BAI!");
        }
    })
`
));