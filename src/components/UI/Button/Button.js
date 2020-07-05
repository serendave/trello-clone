import React from "react";

import styles from "./Button.module.scss";

const button = props => {

    const stylesArr = [styles.Button];
    
    if (props.type === "Submit") 
        stylesArr.push(styles.Submit);
    else if (props.type === "Cancel")
        stylesArr.push(styles.Cancel);

    return (
        <button
            className={stylesArr.join(" ")}
            onClick={props.clicked}
            disabled={props.disabled ?? false}>
            {props.children}
        </button>
    );
};

export default button;