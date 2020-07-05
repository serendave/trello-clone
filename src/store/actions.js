import * as actionTypes from "./actionTypes";

export const setState = () => {
    return {
        type: actionTypes.SET_STATE
    };
};

export const addBoard = (boardName) => {
    return {
        type: actionTypes.ADD_BOARD,
        boardName 
    };
};

export const addList = (listName, boardId) => {
    return {
        type: actionTypes.ADD_LIST,
        listName,
        boardId
    };
};

export const addItem = (itemName, listId, boardId) => {
    return {
        type: actionTypes.ADD_ITEM,
        itemName,
        listId,
        boardId
    }
};

export const deleteBoard = (boardId) => {
    return {
        type: actionTypes.DELETE_BOARD,
        boardId
    }
};

export const deleteList = (listId, boardId) => {
    return {
        type: actionTypes.DELETE_LIST,
        listId,
        boardId
    };
};

export const deleteItem = (itemId, listId, boardId) => {
    return {
        type: actionTypes.DELETE_ITEM,
        itemId,
        listId,
        boardId
    };
};

export const setDropDepth = (dropDepth) => {
    return {
        type: actionTypes.SET_DROP_DEPTH,
        dropDepth
    };
};
