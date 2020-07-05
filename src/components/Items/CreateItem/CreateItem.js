import React from "react";

import Input from "../../UI/Input/Input";
import IconPlus from "../../UI/Icons/IconPlus/IconPlus";
import IconCancel from "../../UI/Icons/IconCancel/IconCancel";

import styles from "./CreateItem.module.scss";

const createItem = props => {

    const createItem = (
        <div className={styles.CreateItem}>
            <span>Add an item</span>
            <IconPlus 
                onClick={props.modeChanged} 
                style={{ fill: "#3498db", marginLeft: "1rem"}}
            />
        </div>
    );

    const createItemActive = (
        <div className={[styles.CreateItem, styles.CreateItemActive].join(" ")}>
            <Input 
                value={props.itemName} 
                onChange={event => props.itemNameChanged(event)} 
                onKeyDown={event => {
                    switch(event.key) {
                        case "Enter":
                            props.itemCreated();
                            break;
                        case "Escape":
                            props.modeChanged();
                            break;
                        default:
                            break;
                    }
                }}
                autoFocus
            />
            <IconCancel onClick={props.modeChanged} />
        </div>
    );

    return props.isItemCreating ? createItemActive : createItem;
};

export default createItem;