
import React from "react";
import {MenuHandler} from "./handlers/MenuHandler";
import {MenuProps} from "./components/Menu/Menu";
import { Engine } from "../survivor/Engine";

export interface MainState {
    menus: Array<MenuProps>
}

export interface MainProps {
    engine: Engine
}

export class Main extends React.Component<MainProps, MainState> {
    constructor(props: MainProps) {
        super(props);
        this.state = {
            menus: [],
        };

        this.state.menus.push({
            displayName: "Settings",
            component: Main
        });
    }

    render() : React.ReactElement {
        return(
            <div>
                <MenuHandler menus={this.state.menus}></MenuHandler>
            </div>
        );
    }

    
}