
import React from "react";
import {Container, Row} from "react-bootstrap";
import {Menu, MenuProps} from "../components/Menu/Menu";


export interface MenuHandlerProps {
    menus: Array<MenuProps>
}

export interface MenuHandlerState {
    active?: string
}

export class MenuHandler extends React.Component<MenuHandlerProps, MenuHandlerState> {
    constructor(props: MenuHandlerProps) {
        super(props);
        this.state = {};
    }

    render() : React.ReactElement {
        return(
            <Container className="menu" fluid>
                <Row>
                    {this.props.menus.length && this.props.menus.map((m, i) => 
                        <Menu {...m} key={i} onClick={this.onClick.bind(this)} active={this.state.active === m.displayName}></Menu>
                    )}
                </Row>
            </Container>
        );
    }

    onClick(name: string) : void {
        if (this.state.active === name) this.setState({active: undefined});
        else this.setState({active: name});
    }

}