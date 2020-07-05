import React from "react";

import styles from "./Input.module.scss";

const input = props => {
    return (
        <input
            className={styles.Input} 
            {...props}
        />
    );
};

export default input;