import React from "react";

import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import IconCancel from "../../UI/Icons/IconCancel/IconCancel";

import styles from "./CreateList.module.scss";

const createList = props => {

    const createList = (
        <div className={styles.CreateList} onClick={props.modeChanged}>
            Create a list
        </div>
    );

    const createListActive = (
        <div className={styles.CreateList}>
            <Input 
                value={props.listName} 
                onChange={event => props.listNameChanged(event)} 
                onKeyDown={event => {
                    switch(event.key) {
                        case "Enter":
                            props.listCreated();
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
            <div className={styles.Buttons}>
                <IconCancel onClick={props.modeChanged} />
                <Button type="Submit" clicked={props.listCreated}>Create</Button>
            </div>
        </div>
    );


    return props.isListCreating ? createListActive : createList;
};

export default createList;