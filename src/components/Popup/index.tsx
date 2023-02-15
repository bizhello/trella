import React from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { addItem, editItem } from "../../store/boardSlice";
import { changeValuePopup, handlePopup } from "../../store/popupSlice";

import './style.css'

const PopupAddNewCard = () => {
    const dispatch = useAppDispatch();
    const currentBoard = useAppSelector(state => state.currentBoard.currentBoard)
    const popup = useAppSelector(state => state.popup)

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeValuePopup({
            ...popup.value,
            title: e.target.value,
        }))
    }
    const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(changeValuePopup({
            ...popup.value,
            description: e.target.value,
        }))
    }

    const defaultValue = () => {
        dispatch(changeValuePopup({
            id: 0,
            title: '',
            description: '',
        }))
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        if (popup.popupAdd) {
            let createId = Date.now()
            let createItem = {
                id: createId,
                title: popup.value.title,
                text: popup.value.description
            }
            const payload = {
                item: createItem,
                boardIndex: currentBoard.id-1,
            }

            dispatch(addItem(payload))
            dispatch(handlePopup({
                namePopup: 'popupAdd',
                isPopup: false
            }));
            defaultValue();
        } else {
            let updateItem = {
                id: popup.value.id,
                title: popup.value.title,
                text: popup.value.description
            }
            dispatch(editItem({
                item: updateItem,
                boardIndex: currentBoard.id-1,
            }))
            dispatch(handlePopup({
                namePopup: 'popupEdit',
                isPopup: false
            }));
            defaultValue();
        }
        
    }

    const handelClosePopup = () => {
        dispatch(handlePopup({
            namePopup: 'popupAdd',
            isPopup: false
        }));
        dispatch(handlePopup({
            namePopup: 'popupEdit',
            isPopup: false
        }));
        defaultValue();
    }
    const handleClickForm = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.currentTarget === e.target 
        &&
        dispatch(handlePopup({
            namePopup: 'popupAdd',
            isPopup: false
        }))
        &&
        dispatch(handlePopup({
            namePopup: 'popupEdit',
            isPopup: false
        }))
        &&
        defaultValue();
    }

    return (
        <article className="popup" onClick={(e) => handleClickForm(e)}>
            <form className="popup__form" id="form" onSubmit={e => handleFormSubmit(e)}>
                <input
                    className="popup__input"
                    name="title"
                    value={popup.value.title}
                    onChange={e => handleChangeTitle(e)}
                    placeholder={'Название задачи'}
                    type="text"
                    minLength={2}
                    maxLength={30}
                    required
                />
                <textarea
                    className="popup__description"
                    value={popup.value.description}
                    onChange={e => handleChangeDescription(e)}
                    name="description"
                    form='form'
                    placeholder={'Описание задачи'}
                />
                <button className="popup__button" type="submit">{popup.popupAdd ? 'Создать задачу' : 'Редактировать задачу'}</button>
                <div className={'popup__exit'} onClick={handelClosePopup}></div>
            </form>
        </article>
    )
}

export default PopupAddNewCard;
