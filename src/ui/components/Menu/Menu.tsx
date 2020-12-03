
import React from "react";
import {Col} from "react-bootstrap";
import { Engine } from "../../../survivor/Engine";

export interface MenuProps {
    engine: Engine
    displayName: string,
    active?: boolean,
    onClick?: (menuName: string) => void,
    component?: typeof React.Component
}

export class Menu extends React.Component<MenuProps> {
    constructor(props: MenuProps) {
        super(props);
    }

    onHide() : void {
        this.props.onClick?.(this.props.displayName);
    }

    render() : React.ReactElement {
        return(
            <>
                <Col className="menu-item" onClick={() => {
                    this.props.onClick?.(this.props.displayName);
                }}>
                    {this.props.displayName}
                </Col>
                {this.props.active && this.props.component ? (<this.props.component engine={this.props.engine} onHide={this.onHide.bind(this)}></this.props.component>):null}
            </>

        );
    }
}