
import React from "react";

export interface MenuProps {
    displayName: string,
    onClick?: (menu: Menu) => typeof React.Component,
    onActivate?: (menu: Menu) => void,
    component?: typeof React.Component
}

export interface MenuState {
    active: boolean
}

export class Menu extends React.Component<MenuProps, MenuState> {
    displayName: string
    constructor(props: MenuProps) {
        super(props);
        this.displayName = props.displayName;
        this.state = {
            active: false
        };
    }

    render() {
        return(
            <div>

            </div>
        );
    }
}