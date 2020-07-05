import React, { Component } from "react";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import { connect } from "react-redux";
import * as action from "../../store/actions";

import CreateItem from "../../components/Items/CreateItem/CreateItem";
import Item from "../../components/Items/Item/Item";
import IconCancel from "../../components/UI/Icons/IconCancel/IconCancel";

import styles from "./List.module.scss";

class List extends Component {

    state = {
        isItemCreating: false,
        itemName: ""
    }

    itemCreatingModHanlder = () => {
        this.setState(prevState => {
            return { isItemCreating: !prevState.isItemCreating };
        });
    }

    changeItemNameHanlder = (event) => {
        this.setState({ itemName: event.target.value });
    }

    createItemHanlder = () => {
        this.props.onAddItem(this.state.itemName, this.props.id, this.props.boardId);
        this.setState({ itemName: "" });
    }

    deleteItemHandler = (itemId) => {
        this.props.onDeleteItem(itemId, this.props.id, this.props.boardId);
    }

    deleteListHandler = () => {
        this.props.onDeleteList(this.props.id, this.props.boardId);
    }

    render() {
        let items = [];
        if (this.props.items) {
            for (let item in this.props.items) {
                items.push(
                    <CSSTransition key={item} classNames={{
                        enterActive: "zoom-enter-active"
                    }} timeout={{enter: 300}}>
                        <Item
                            id={item}
                            listId={this.props.id}
                            name={this.props.items[item].name}
                            itemDeleted={() => this.deleteItemHandler(item)}
                        />
                    </CSSTransition>
                );
            }
        }

        /** Scenarios of dragging an item:
         * 
         *  Make item draggable, then
         *  if the item is dropped:
         * 
         *  a) Within other component:
         *  1. Delete from this component
         *  2. Add to other component
         * 
         *  b) Outside component
         *  1. Delete from this component
         * 
         *  c) Withing the same component:
         *  1. Do nothing 
         * 
         *  */


        return (
            <div
                className={styles.List}
                onDragEnter={(event) => {
                    event.stopPropagation()
                    event.preventDefault();

                    this.props.onSetDropDepth(this.props.dropDepth + 1);
                }}
                onDragLeave={(event) => {
                    event.stopPropagation()
                    event.preventDefault();

                    this.props.onSetDropDepth(this.props.dropDepth - 1);
                }}
                onDragOver={event => {
                    event.preventDefault();
                }}
                onDrop={event => {
                    event.stopPropagation();

                    const itemId = event.dataTransfer.getData("itemId");
                    const itemName = event.dataTransfer.getData("itemName");
                    const listId = event.dataTransfer.getData("listId");

                    if (listId !== this.props.id) {
                        this.props.onAddItem(itemName, this.props.id, this.props.boardId);
                        this.props.onDeleteItem(itemId, listId, this.props.boardId);
                        this.props.onSetDropDepth(0);
                    }
                }}
            >
                <div className={styles.IconDelete} onClick={this.deleteListHandler}>
                    <IconCancel style={{
                        fill: "#3498db",
                        width: "2rem",
                        height: "2rem",
                    }} />
                </div>
                <h3 className={styles.Title}>{this.props.name ?? "List"}</h3>
                <CreateItem
                    isItemCreating={this.state.isItemCreating}
                    itemNameChanged={this.changeItemNameHanlder}
                    itemName={this.state.itemName}
                    modeChanged={this.itemCreatingModHanlder}
                    itemCreated={this.createItemHanlder}
                />
                <TransitionGroup className={styles.ItemsBox}>
                    {items}
                </TransitionGroup>
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddItem: (itemName, listId, boardId) => dispatch(action.addItem(itemName, listId, boardId)),
        onDeleteItem: (itemId, listId, boardId) => dispatch(action.deleteItem(itemId, listId, boardId)),
        onDeleteList: (listId, boardId) => dispatch(action.deleteList(listId, boardId)),
        onSetDropDepth: (dropDepth) => dispatch(action.setDropDepth(dropDepth))
    };
};

const mapStateToProps = state => {
    return {
        dropDepth: state.dropDepth,
        inDropZone: state.inDropZone
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);