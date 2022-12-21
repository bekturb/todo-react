import React from 'react';

const ListItems = ({el, deleteItem}) => {

    return (
        <li key={el.id}>
            <input type="checkbox"/>
            <label>{el.title}</label>
            <input type="text"/>
            <button  className="edit">Edit</button>
            <button onClick={() => {deleteItem(el.id)}} className="delete">Delete</button>
        </li>
    );
};

export default ListItems;