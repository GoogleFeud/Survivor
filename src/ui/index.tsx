
import React from "react";
import {MenuHandler} from "./handlers/MenuHandler";
import {MenuProps} from "./components/Menu/Menu";

export interface MainState {
    menus: Array<MenuProps>
}

/** 
interface CmpState {
    show: boolean
}

class Cmp extends React.Component {
    state: CmpState
    constructor(props: Record<string, unknown>) {
        super(props);
        this.state = {
            show: true
        };
    }

    handleClose() {
        this.setState({show: false});
    }

    render() {
        return(
            <Modal show={this.state.show} onHide={this.handleClose.bind(this)} className="modal-dialog modal-dialog-centered">
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you are reading this text in a modal!

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose.bind(this)}>
                Close
                    </Button>
                    <Button variant="primary" onClick={this.handleClose.bind(this)}>
                Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

**/

export class Main extends React.Component<unknown, MainState> {
    constructor(props: unknown) {
        super(props);
        this.state = {
            menus: [],
        };

        this.state.menus.push({
            displayName: "Castaways",
            component: Main
        });
        
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