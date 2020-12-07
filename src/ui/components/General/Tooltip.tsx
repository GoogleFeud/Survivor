

import React from "react";
import {Popover, OverlayTrigger} from "react-bootstrap";

export interface TooltipProps {
    title: string,
    description: string,
}

export function Tooltip(props: React.PropsWithChildren<TooltipProps>) : React.ReactElement {
    return(
        <OverlayTrigger trigger="hover" placement="right" overlay={
            <Popover id="popover-basic">
                <Popover.Title as="h4">{props.title}</Popover.Title>
                <Popover.Content>
                    {props.description}
                </Popover.Content>
            </Popover>
        }>
            <span>
                {props.children}
            </span>
        </OverlayTrigger>
    );
}
