import React from "react";
import {Tab, Tabs} from "react-bootstrap";
import {BaseModal, BaseModalProps} from "../BaseModal";


export class Settings extends React.Component<BaseModalProps> {
    constructor(props: BaseModalProps) {
        super(props);
    }

    render() : React.ReactElement {
        return(
            <BaseModal {...this.props} title="Settings">
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
            </BaseModal>
        );
    }
}

