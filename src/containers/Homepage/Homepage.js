import React, { Component } from "react";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";

import * as actions from "../../store/actions";
import { connect } from "react-redux";

import CreateBoard from "../../components/Boards/CreateBoard/CreateBoard";
import BoardElement from "../../components/Boards/BoardElement/BoardElement";

import styles from "./Homepage.module.scss";

class Homepage extends Component {

    // Local UI State
    state = {
        isBoardCreating: false,
        boardName: "",
        errors: {
            theSameBoardName: false
        }
    }

    switchCreateModeHandler = () => {
        this.setState(prevState => {
            return {
                isBoardCreating: !prevState.isBoardCreating,
                boardName: "",
                errors: {
                    ...this.state.errors,
                    theSameBoardName: false
                }
            };
        });
    }

    changeNameHandler = event => {
        // setState has a callback function that executes right after the state is set
        this.setState({ boardName: event.target.value }, this.checkBoardName);
    };

    createBoardHandler = () => {
        if (this.props.boards && this.props.boards.hasOwnProperty(this.state.boardName)) {
            return;
        }

        if (this.state.boardName === "") {
            return;
        }

        this.props.onAddBoard(this.state.boardName);
    }

    deleteBoardHandler = (boardId) => {
        this.props.onDeleteBoard(boardId);
    }

    clickBoardHandler = (boardId) => {
        this.props.history.push("/boards/" + boardId);
    }

    checkBoardName = () => {
        for (let board in this.props.boards) {
            if (this.props.boards[board].name.toLowerCase() === this.state.boardName.toLowerCase()) {
                this.setState({
                    errors: {
                        ...this.state.errors,
                        theSameBoardName: true
                    }
                });
                return;
            }
        }

        this.setState({
            errors: {
                ...this.state.errors,
                theSameBoardName: false
            }
        });
    }

    render() {

        const boards = [];
        for (let boardId in this.props.boards) {
            boards.push(
                <CSSTransition key={boardId} classNames="zoom" timeout={300}>
                    <BoardElement
                        name={this.props.boards[boardId].name}
                        clicked={() => this.clickBoardHandler(boardId)}
                        boardDeleted={() => this.deleteBoardHandler(boardId)}
                    />
                </CSSTransition>
            );
        }

        return (
            <TransitionGroup className={styles.Homepage}>
                <CreateBoard
                    clicked={this.switchCreateModeHandler}
                    created={this.createBoardHandler}
                    isBoardCreating={this.state.isBoardCreating}
                    boardName={this.state.boardName}
                    hasTheSameName={this.state.errors.theSameBoardName}
                    nameChanged={this.changeNameHandler}
                />
                {boards}
            </TransitionGroup>
        );
    }
};

const mapStateToProps = state => {
    return {
        boards: state.boards
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddBoard: (boardName) => dispatch(actions.addBoard(boardName)),
        onDeleteBoard: (boardId) => dispatch(actions.deleteBoard(boardId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);