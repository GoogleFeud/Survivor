import React from "react";
import {Modal} from "react-bootstrap";
import { Engine } from "../../../survivor/Engine";

export interface BaseModalState {
    show: boolean
}

export interface BaseModalProps {
    engine: Engine
    onHide: () => void
    onClose?: () => void
    title?: string
}

export class BaseModal extends React.Component<BaseModalProps, BaseModalState> {
    constructor(props: BaseModalProps) {
        super(props);
        this.state = {
            show: true
        };
    }

    handleClose() : void {
        this.setState({show: false});
        this.props.onHide();
        this.props.onClose?.();
    }

    render() : React.ReactElement {
        return(
            <Modal show={this.state.show} onHide={this.handleClose.bind(this)} backdrop={false} scrollable={true} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title || ""}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.children}
                </Modal.Body>
            </Modal>
        );
    }
}

/**
 *   <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Tabs defaultActiveKey="General">
                        <Tab eventKey="General" title="General">
                        aaaaaaaaa
                        </Tab>
                        <Tab eventKey="Mod 1" title="Mod 1">
                       bbbbbbbbbb
                        </Tab>
                        <Tab eventKey="Mod 2" title="Mod 2">
                        ccccccccccccccc
                        </Tab>
                    </Tabs> 
                </Modal.Body>
 */