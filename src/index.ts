
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
        settings: {
            name: {type: "string", default: "Test!"},
            number: {type: "number", default: "5", from: 1, to: 100},
            dropdown: {type: "slider", from: 1, to: 10},
        },

        load: (engine, settings) => {
            console.log("HAI!", settings);
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


ReactDOM.render(React.createElement(Main, {engine: game}), document.getElementById("main"));