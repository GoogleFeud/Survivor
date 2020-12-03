
import React from "react";
import {Col} from "react-bootstrap";

export interface MenuProps {
    displayName: string,
    active?: boolean,
    onClick?: (menuName: string) => void,
    component?: typeof React.Component
}

export class Menu extends React.Component<MenuProps> {
    constructor(props: MenuProps) {
        super(props);
    }

    render() : React.ReactElement {
        return(
            <Col className="menu-item" onClick={() => {
                this.props.onClick?.(this.props.displayName);
            }}>
                {this.props.displayName}
                {this.props.active && this.props.component ? (<this.props.component></this.props.component>):null}
            </Col>
        );
    }
}