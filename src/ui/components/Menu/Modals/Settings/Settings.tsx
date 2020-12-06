
import React from "react";
import {Tab, Tabs, Dropdown, Row, Col} from "react-bootstrap";
import { Mod, ModSetting} from "../../../../../survivor/mechanics/ModLoader";
import {BaseModal, BaseModalProps} from "../../BaseModal";

export const cachedModSettings = new Map<string, React.ReactElement>();

interface CategoryCollector {
    [key: string]: Array<React.ReactElement>
}

export class Settings extends React.Component<BaseModalProps> {
    changedMods: Set<string>
    constructor(props: BaseModalProps) {
        super(props);
        this.changedMods = new Set();
    }

    render() : React.ReactElement {
        return(
            <BaseModal {...this.props} title="Settings" onClose={() => {
                for (const mod of this.changedMods) {
                    this.props.engine.mods.reload(mod);
                }
                this.changedMods.clear();
            }}>
                <Tabs>
                    {this.props.engine.mods.map(m => this.makeModElement(m))}
                </Tabs> 
            </BaseModal>
        );
    }

    makeModElement(mod: Mod) : React.ReactElement|null {
        if (!Object.keys(mod.settings).length) return null;
        const categories: CategoryCollector = {};
        for (const settingName in mod.settings) {
            const settingValue = mod.settings[settingName] as ModSetting;
            if (!settingValue) continue;
            if (categories[settingValue.category] instanceof Array) categories[settingValue.category].push(this.makeSetting(mod, settingName, settingValue));
            else categories[settingValue.category] = [this.makeSetting(mod, settingName, settingValue)];
        } 
        const mappedCategories = [];
        for (const categoryName in categories) {
            const categoryValue = categories[categoryName];
            mappedCategories.push(<Col>
                <h4>{categoryName}</h4>
                {...categoryValue}
            </Col>);
        }
        return <Tab eventKey={mod.name} title={mod.name}>
            <Row>
            {...mappedCategories}
            </Row>
        </Tab>;
    }

    makeSetting(mod: Mod, name: string, setting: ModSetting) : React.ReactElement {
        switch(setting.type) {
        case "string":
            return <div>
                <p>{setting.friendlyName || name}</p>
                <input type="text" defaultValue={mod.currentSettings[name]} onChange={(el) => {
                    if (!el.target) return;
                    const text = el.target.value;
                    if (setting.from !== undefined && setting.from > text.length) return alert(`Setting ${name} must be at least ${setting.from} characters long!`);
                    if (setting.to !== undefined && setting.to < text.length) return alert(`Setting ${name} must be under ${setting.to} characters long!`);
                    mod.currentSettings[name] = text;
                    this.changedMods.add(mod.name);
                }}></input>
            </div>;
        case "number":
            return <div>
                <p>{setting.friendlyName || name}</p>
                <input type="number" defaultValue={mod.currentSettings[name]} onChange={(el) => {
                    if (!el.target) return;
                    const num = Number(el.target.value);
                    if (!num|| isNaN(num)) return;
                    if (setting.from !== undefined && setting.from > num) return alert(`Setting ${name} must be larger than ${setting.from}!`);
                    if (setting.to !== undefined && setting.to < num) return alert(`Setting ${name} must be lower than ${setting.to}!`);
                    mod.currentSettings[name] = num;
                    this.changedMods.add(mod.name);
                }}></input>
            </div>;
        case "dropdown":
            return <div>
                <p>{setting.friendlyName || name}</p>
                <Dropdown defaultValue={mod.currentSettings[name]} onSelect={(key, el) => {
                    if (!el.target) return;
                    mod.currentSettings[name] = (el.target as HTMLSelectElement).value;
                    this.changedMods.add(mod.name);
                }}>
                    <Dropdown.Menu>
                        {setting.items && setting.items.map((item, i) => <Dropdown.Item key={i}>{item}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
            </div>;
        case "slider":
            return <div>
                <p>{setting.friendlyName || name}</p>
                <input type="range" defaultValue={mod.currentSettings[name]} min={setting.from || 1} max={setting.to || 100} onChange={(el) => {
                    if (!el.target) return;
                    mod.currentSettings[name] = Number(el.target.value);
                    this.changedMods.add(mod.name);
                }}/>
            </div>;
        }
        return <div></div>;
    }
}