
import React from "react";


export interface MainState {
    menus: Array<typeof React.Component>
    castawayContext: Array<typeof React.Component>
}

export class Main extends React.Component<unknown, MainState> {
    constructor(props: unknown) {
        super(props);
        this.state = {
            menus: [],
            castawayContext: []
        };
    }

    
}