
import React from "react";
import ReactDOM from "react-dom";
import {Main} from "./ui/index";
import {Engine} from "./survivor/Engine";

const game = new Engine({
    minTraits: 0,
    maxTraits: 3
});

console.log(game.mods.load(
    `
    (() => ({
        name: "Core",
        conflicts: ["cycle"],

        load: (engine) => {
            console.log("HAI!");
        },
        unload: (engine) => {
            console.log("BAI!");
        }
    })
    )
`
));

console.log(game.mods.load(
    `
    ((Util, Random) => ({
        name: "Core2",
        conflicts: [],

        load: (engine) => {
            console.log("HAI!", Random.btw(1, 10, 50));
        },
        unload: (engine) => {
            console.log("BAI!");
        }
    })
    )
`
));


ReactDOM.render(React.createElement(Main), document.getElementById("main"));