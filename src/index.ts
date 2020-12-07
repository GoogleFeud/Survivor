
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
            name: {type: "string", default: "Test!", friendlyName: "AI Name:", details: "Choose a name for the AI!"},
            number: {type: "number", default: 5, from: 1, to: 100, friendlyName: "Magic Number:"},
            dropdown: {type: "slider", from: 1, to: 10, friendlyName: "Random range:", category: "Category 2"},
            dropdown2: {type: "slider", from: 1, to: 1000, friendlyName: "Random range 2:", category: "Category 2"},
            dropdown3: {type: "slider", from: 1, to: 100000, friendlyName: "Random range 3:", category: "Category 3"},
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
        name: "More strats",
        conflicts: [],
        settings: {
            amountOfStrats: {
                type: "slider",
                from: 1,
                to: 25,
                friendlyName: "Amount of strategies:",
                details: "The strategies to add to the core game."
            }
        },

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