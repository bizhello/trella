import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hook";
import { IBoard } from '../../interfaces'
import { changeBoard } from "../../store/boardSlice";
import { changeCurrentBoard } from "../../store/currentBoardSlice";
import { handlePopup } from "../../store/popupSlice";
import Card from "../Card";

import './style.css'

const Boards = () => {

    // FIXME: в идеале лучше использовать селекторы, куда можно помещать часть логики по выборке (либа Reselect)
    const boards = useAppSelector(state => state.boards.boards)
    const currentBoard = useAppSelector(state => state.currentBoard.currentBoard)
    const currentItem = useAppSelector(state => state.currentItem.currentItem)
    const dispatch = useAppDispatch();
    // FIXME Стоит компоненту навешивать какой-то класс по условию, а не засорять код компонента инлайн-стилями.
    function dragOverHandler(e: React.DragEvent<HTMLDivElement>): void {
      e.preventDefault();
      if (e.currentTarget.className === "card") {
        e.currentTarget.style.boxShadow = "0 4px 3px gray";
      }
    }
   
    function dropCardHandler(e: React.DragEvent<HTMLDivElement>, board: IBoard) {
      e.preventDefault();
      // FIXME
      // сложные условия лучше обозначать переменной с симантическим названием:
      // const isCurrentBoardHasSomething = currentItem && currentBoard && board.items.length === 0;
      // if (isCurrentBoardHasSomething) {...}
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

    /* Замечание по тексту в элементах по типу "+ Add another card"
       Зависит от проекта, но мы в своих проектах такие штуки не хардкодим,
       а выносим в констатны.
       Например, папка dictionary, где могут быть разные словари для текста элементов
    */
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
