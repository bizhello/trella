import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { IBoard, IItem } from "../../interfaces";
import { changeBoard, deleteItem } from "../../store/boardSlice";
import { changeCurrentBoard } from "../../store/currentBoardSlice";
import { changeCurrentItem } from "../../store/currentItemSlice";
import { changeValuePopup, handlePopup } from "../../store/popupSlice";

import './style.css'

interface ICard {
    item: IItem,
    board: IBoard
}

const Card: FC <ICard> = ({ item, board }) => {
  let buttonDelete: EventTarget
  const deleteCard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: IItem, board: IBoard) => {
    e.preventDefault();
    buttonDelete = e.target;
    dispatch(deleteItem({item, board}))
  }

    const currentBoard = useAppSelector(state => state.currentBoard.currentBoard)
    const currentItem = useAppSelector(state => state.currentItem.currentItem)
    const dispatch = useAppDispatch();
    
    function dragOverHandler(e: React.DragEvent<HTMLDivElement>): void {
        e.preventDefault();
        if (e.currentTarget.className === "card") {
          e.currentTarget.style.boxShadow = "0 4px 3px gray";
        }
      }
    
      function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>): void {
        e.currentTarget.style.boxShadow = "none";
      }
    
      function dragStartHandler(
        board: IBoard,
        item: IItem
      ): void {
        dispatch(changeCurrentBoard(board))
        dispatch(changeCurrentItem(item))
      }
    
      function dragEndHandler(e: React.DragEvent<HTMLDivElement>): void {
        e.preventDefault();
        e.currentTarget.style.boxShadow = "none";
      }
    
      function dropHandler(
        e: React.DragEvent<HTMLDivElement>,
        board: IBoard,
        item: IItem
      ) {
        e.preventDefault();
        if (currentItem && currentBoard && board.items.length > 0) {
          const cloneBoard:IBoard = JSON.parse(JSON.stringify(board))
          const cloneCurrentBoard:IBoard = JSON.parse(JSON.stringify(currentBoard))
          const currentIndex = currentBoard.items.indexOf(currentItem);
          cloneCurrentBoard.items.splice(currentIndex, 1);
          const dropIndex = board.items.indexOf(item);
          cloneBoard.id === cloneCurrentBoard.id && cloneBoard.items.splice(currentIndex, 1)
          cloneBoard.items.splice(dropIndex+1, 0, currentItem)
          const payload = {
           board: cloneBoard,
           currentBoard: cloneCurrentBoard,
          }

          dispatch(changeBoard(payload))
        }
      }

      const handelCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: IItem) => {
        if (e.target !== buttonDelete) {
          dispatch(changeValuePopup({
            id: item.id,
            title: item.title,
            description: item.text
          }))
          dispatch(changeCurrentBoard(board));
          dispatch(handlePopup({
              namePopup: 'popupEdit',
              isPopup: true
          }))
        }
      }


    return (
        <div
            className="card"
            onClick={(e)=> handelCard(e, item)}
            draggable={true}
            onDragOver={(e) => dragOverHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragStart={() => dragStartHandler(board, item)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDrop={(e) => dropHandler(e, board, item)}
            >
            <h3 className="card__title">{item.title}</h3>
            <p className="card__text">{item.text}</p>
            <button className="card__button" onClick={(e) => deleteCard(e, item, board)}>Delete card</button>
         </div>
    )
}

export default Card;
