
import React from "react";
import {MenuHandler} from "./handlers/MenuHandler";
import {MenuProps} from "./components/Menu/Menu";
import { Engine } from "../survivor/Engine";
import {Settings} from "./components/Menu/Modals/Settings";

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
            component: Settings,
            engine: props.engine
        });
        
    }

    render() : React.ReactElement {
        return(
            <div>
                <MenuHandler menus={this.state.menus} engine={this.props.engine}></MenuHandler>
            </div>
        );
    }


    addMenu(menu: Partial<MenuProps>) : void {
        this.setState(state => {
            state.menus.push({
                displayName: menu.displayName || "Menu",
                component: menu.component,
                engine: this.props.engine
            });
            return {menus: state.menus};
        });
    }
}

