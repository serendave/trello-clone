import * as actionTypes from "./actionTypes";

const initialState = {
    boards: null,
    inDropZone: false,
    dropDepth: 0
};

const getId = () => {
    let id = Math.round(Math.random() * 100);
    
    return id > 10 ? id : id + 10;
};

const addBoard = (state, action) => {

    const boards = {
        ...state.boards
    };

    const boardsCount = Object.keys(boards).length + 1; 
    const boardId = parseInt(boardsCount.toString() + getId());

    const newBoard = {
        name: action.boardName,
        lists: null
    };

    return {
        ...state,
        boards: {
            ...state.boards,
            [boardId]: newBoard
        }
    }
};

const addList = (state, action) => {

    const lists = {
        ...state.boards[action.boardId].lists
    }

    const listsCount = Object.keys(lists).length + 1;
    const listId = parseInt(listsCount.toString() + getId());

    const newList = {
        name: action.listName,
        items: null
    };

    return {
        ...state,
        boards: {
            ...state.boards,
            [action.boardId]: {
                ...state.boards[action.boardId],
                lists: {
                    ...state.boards[action.boardId].lists,
                    [listId]: newList
                }
            }
        }
    }
};

const addItem = (state, action) => {

    const items = {
        ...state.boards[action.boardId].lists[action.listId].items
    };

    const itemsCount = Object.keys(items).length + 1;
    const itemId = parseInt(itemsCount.toString() + getId());

    const newItem = {
        name: action.itemName
    };

    return {
        ...state,
        boards: {
            ...state.boards,
            [action.boardId]: {
                ...state.boards[action.boardId],
                lists: {
                    ...state.boards[action.boardId].lists,
                    [action.listId]: {
                        ...state.boards[action.boardId].lists[action.listId],
                        items: {
                            ...state.boards[action.boardId].lists[action.listId].items,
                            [itemId]: newItem
                        }
                    }
                }
            }
        }
    }
};

const deleteBoard = (state, action) => {
    const boards = {
        ...state.boards
    };

    const updatedBoards = {};

    for (let boardId in boards) {
        if (boardId !== action.boardId) {
            updatedBoards[boardId] = boards[boardId];
        }
    }

    return {
        ...state,
        boards: updatedBoards
    }
};

const deleteList = (state, action) => {
    const lists = {
        ...state.boards[action.boardId].lists
    };

    const updatedLists = {};

    for (let listId in lists) {
        if (listId !== action.listId) {
            updatedLists[listId] = lists[listId];
        }
    }

    return {
        ...state,
        boards: {
            ...state.boards,
            [action.boardId]: {
                ...state.boards[action.boardId],
                lists: updatedLists
            }
        }
    };
};

const deleteItem = (state, action) => {
    const items = {
        ...state.boards[action.boardId].lists[action.listId].items
    }

    const updatedItems = {};

    for (let itemId in items) {
        if (itemId !== action.itemId) {
            updatedItems[itemId] = items[itemId];
        }
    }

    return {
        ...state,
        boards: {
            ...state.boards,
            [action.boardId]: {
                ...state.boards[action.boardId],
                lists: {
                    ...state.boards[action.boardId].lists,
                    [action.listId]: {
                        ...state.boards[action.boardId].lists[action.listId],
                        items: updatedItems
                    }
                }
            }
        }
    };
};


const setDropDepth = (state, action) => {
    return {
        ...state,
        dropDepth: action.dropDepth,
        inDropZone: action.dropDepth !== 0
    }
}

const reducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {
        case actionTypes.SET_STATE: 
            return JSON.parse(localStorage.getItem("state")) ?? newState;
        case actionTypes.SET_DROP_DEPTH:
            newState = setDropDepth(newState, action);
            break;
        case actionTypes.ADD_BOARD: 
            newState = addBoard(newState, action)
            break;
        case actionTypes.ADD_LIST: 
            newState = addList(newState, action);
            break;
        case actionTypes.ADD_ITEM: 
            newState = addItem(newState, action);
            break;
        case actionTypes.DELETE_BOARD: 
            newState = deleteBoard(newState, action);
            break;
        case actionTypes.DELETE_LIST: 
            newState = deleteList(newState, action);
            break;
        case actionTypes.DELETE_ITEM: 
            newState = deleteItem(newState, action);
            break;
        default:
            return newState;
    }

    localStorage.setItem("state", JSON.stringify(newState));

    return newState;
};

export default reducer;