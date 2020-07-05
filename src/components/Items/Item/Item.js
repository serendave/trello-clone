import React from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

import IconCancel from "../../UI/Icons/IconCancel/IconCancel";

import styles from "./Item.module.scss";

const item = props => (
    <div 
        className={styles.Item} 
        draggable
        onDragStart={(event) => {
            event.dataTransfer.setData("itemId", props.id);
            event.dataTransfer.setData("itemName", props.name);
            event.dataTransfer.setData("listId", props.listId);
        }}
        onDragEnd={(event) => {
            const listId = event.dataTransfer.getData("listId");

            if (!props.inDropZone && props.listId !== listId) {
                props.itemDeleted();
            }

            props.onSetDropDepth(0);
        }}
    >
        {props.name}
        <IconCancel style={{
            fill: "#fff",
            width: "2rem",
            height: "2rem",
        }} onClick={props.itemDeleted} />
    </div>
);


const mapStateToProps = state => {
   return {
       inDropZone: state.inDropZone
   };
};

const mapDispatchToProps = dispatch => {
   return {
       onSetDropDepth: (dropDepth) => dispatch(actions.setDropDepth(dropDepth))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(item);