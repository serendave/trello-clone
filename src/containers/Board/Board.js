import React, { Component } from "react";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";

import { connect } from "react-redux";
import * as actions from "../../store/actions";

import CreateList from "../../components/Lists/CreateList/CreateList";
import List from "../List/List";

import styles from "./Board.module.scss";

class Board extends Component {

    state = {
        boardId: +this.props.match.url.slice(this.props.match.url.lastIndexOf("/") + 1),
        listName: "",
        isListCreating: false
    }

    switchCreatingModeHandler = () => {
        this.setState(prevState => {
            return {
                isListCreating: !prevState.isListCreating,
                listName: ""
            };
        });
    }

    changeListNameHanlder = (event) => {
        this.setState({ listName: event.target.value });
    }

    createListHandler = () => {
        this.props.onAddList(this.state.listName, this.state.boardId);
        this.setState({ listName: "" });
    }

    render() {

        let listsContainer = null;
        if (this.props.boards != null) {

            const listsArr = [];

            const lists = this.props.boards[this.state.boardId].lists;
            if (lists) {
                for (let list in lists) {
                    listsArr.push(
                        <CSSTransition key={list} classNames="zoom" timeout={300}>
                            <List
                                name={lists[list].name}
                                id={list}
                                items={lists[list].items}
                                boardId={this.state.boardId}
                            />
                        </CSSTransition>
                    )
                }
            }

            listsContainer = (
                <TransitionGroup className={styles.Lists}>
                    {listsArr}
                    <CreateList
                        modeChanged={this.switchCreatingModeHandler}
                        isListCreating={this.state.isListCreating}
                        listName={this.state.listName}
                        listNameChanged={this.changeListNameHanlder}
                        listCreated={this.createListHandler}
                    />
                </TransitionGroup>
            );
        }

        return (
            <div className={styles.Board}>
                <div className={styles.BoardTitle}>
                    {this.props.boards ?
                        this.props.boards[this.state.boardId].name :
                        "No such board exists"}
                </div>

                {listsContainer}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        boards: state.boards
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddList: (listName, boardId) => dispatch(actions.addList(listName, boardId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);