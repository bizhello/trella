import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hook";
import { IBoard } from '../../interfaces'
import { changeBoard } from "../../store/boardSlice";
import { changeCurrentBoard } from "../../store/currentBoardSlice";
import { handlePopup } from "../../store/popupSlice";
import Card from "../Card";

import './style.css'

const Boards = () => {

    const boards = useAppSelector(state => state.boards.boards)
    const currentBoard = useAppSelector(state => state.currentBoard.currentBoard)
    const currentItem = useAppSelector(state => state.currentItem.currentItem)
    const dispatch = useAppDispatch();
  
    function dragOverHandler(e: React.DragEvent<HTMLDivElement>): void {
      e.preventDefault();
      if (e.currentTarget.className === "card") {
        e.currentTarget.style.boxShadow = "0 4px 3px gray";
      }
    }
   
    function dropCardHandler(e: React.DragEvent<HTMLDivElement>, board: IBoard) {
      e.preventDefault();
      if (currentItem && currentBoard && board.items.length === 0) {

        const cloneBoard:IBoard = JSON.parse(JSON.stringify(board)) //put
        const cloneCurrentBoard:IBoard = JSON.parse(JSON.stringify(currentBoard)) // take

        const currentIndex = cloneCurrentBoard.items.findIndex(item => item.id === currentItem.id)
        cloneCurrentBoard.items.splice(currentIndex, 1)
        cloneBoard.items.push(currentItem);
        
        const payload = {
          board: cloneBoard,
          currentBoard: cloneCurrentBoard,
        }
        dispatch(changeBoard(payload))
        e.currentTarget.style.boxShadow = "none";
      }
    }

    const handelAddCard = (board: IBoard) => {
      dispatch(handlePopup({
        namePopup: 'popupAdd',
        isPopup: true
      }));
      dispatch(changeCurrentBoard(board))
    }

    return (
        <div className="boards">
        {boards.map((board) => (
          <div
            className="board"
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropCardHandler(e, board)}
          >
            <h2 className="board__title">{board.title}</h2>
            {board.items.map((item) => (
                <Card item={item} board={board}/>
            ))}
            <button
              className="board__button"
              onClick={() => handelAddCard(board)}>
              + Add another card
            </button>
          </div>
        ))}
      </div>
    )
}

export default Boards;
