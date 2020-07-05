import React from "react";

import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

import styles from "./CreateBoard.module.scss";

const createBoard = props => {

    const CreateBoardNormal = (
        <div className={styles.CreateBoard} onClick={props.clicked}>
            Create a new board
        </div>
    );

    let warning = null;
    if (props.hasTheSameName) {
        warning = <span className={styles.warning}>Such board already exists</span>;
    }

    const CreateBoardActive = (
        <div className={styles.CreateBoard}>
            <h2>Creating a new board</h2>
            <p>How should we call the board?</p>
            <Input
                type="text"
                value={props.boardName}
                onChange={event => props.nameChanged(event)}
                onKeyDown={event => {
                    switch(event.key) {
                        case "Enter":
                            props.created();
                            break;
                        case "Escape":
                            props.clicked();
                            break;
                        default:
                            break;
                    }
                }}
                autoFocus
            />
            {warning}
            <div className={styles.buttons}>
                <Button clicked={props.clicked} type="Cancel">Cancel</Button>
                <Button clicked={props.created} disabled={props.hasTheSameName} type="Submit">Create</Button>
            </div>
        </div>
    );

    return (
        <div>
            {props.isBoardCreating ? CreateBoardActive : CreateBoardNormal}
        </div>
    );
};

export default createBoard;