import React from "react";
import IconCancel from "../../UI/Icons/IconCancel/IconCancel";

import styles from "./BoardElement.module.scss";

const BoardElement = props => {
    return (
        <div className={styles.BoardElement} onClick={props.clicked}>
            <div className={styles.IconDelete} onClick={event => {
                // prevents bubbling event up and calling parents' events
                event.stopPropagation();

                props.boardDeleted();
            }}>
            <IconCancel style={{
                fill: "#2ecc50",
                width: "2rem",
                height: "2rem",
            }} />
            </div>
            {props.name}
        </div>
    )
};

export default BoardElement;