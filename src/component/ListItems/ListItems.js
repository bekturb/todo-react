import React, {useState} from 'react';

const ListItems = ({el, deleteItem, updateItem, getCompletedItems}) => {

    const [newItem, setNewItem] = useState(el.title);
    const [openedInput, setOpenedInput] = useState(false);

    const addInputClass = () => {
        setOpenedInput(true)
    }

    const removeInputClass = (id, newItem) => {
        setOpenedInput(false)
        updateItem(id, newItem)
    }

    const completedItem = (id, checked) => {
        getCompletedItems(id, checked)
    }

    return (
        <li>
            <input onChange={() => completedItem(el.id, el.checked)} type="checkbox" checked={el.checked ? true : false} />
            <label className={openedInput ? "form__label-edit" : ""}>{el.title}</label>
            <input className={openedInput ? "form__input-edit" : ""} onChange={(e) => setNewItem(e.target.value)} type="text" defaultValue={el.title}/>
            <button onClick={() => {openedInput ? removeInputClass(el.id, newItem) : addInputClass()}}  className="edit">{openedInput ?  "Close" : "Edit"}</button>
            <button onClick={() => {deleteItem(el.id)}} className="delete">Delete</button>
        </li>
    );
};

export default ListItems;