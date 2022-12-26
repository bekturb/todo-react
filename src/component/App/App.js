import '../../styles/App.css';
import React, {useEffect, useState} from "react";
import ListItems from "../ListItems/ListItems";
import {baseURL} from "../../Api/api";
import axios from "axios";

function App() {

    const [title, setTitle] = useState('');
    const [items, setItems] = useState([]);
    const [completedItems, setCompletedItems] = useState([]);
    const [unCompletedItems, setUnCompletedItems] = useState([]);

    const renderData = async () => {

        try {
            const response = await axios.get(`${baseURL}todo-items`);
            const data = response.data;
            setItems(data)
        } catch (error) {
            setTitle(error.message );
            console.error(error);
        }
    }

    const handleChange =  async () => {

        if (title.trim()){
            const newObj = {
                id: items.length ? items[items.length - 1].id + 1 : 1,
                title,
            }
            try {
                const response = await axios.post(`${baseURL}todo-items`, {title});
                const data = response.data;
                setItems([...items, data])
            } catch (error) {
                console.error(error);
            }
            setItems([...items, newObj])
        }
    }

    const deleteItem = async (id) => {
        try {
            const response = await axios.delete(`${baseURL}todo-items/${id}`);
            const data = response.data;
            const deletedItem = items.filter(item => item.id !== id)
            setItems(deletedItem)
        } catch (error) {
            console.error(error);
        }
    }

    const updateItem = async (id, newItem) => {
        try {
            const response = await axios.put(`${baseURL}todo-items/${id}`, {title: newItem});
            const data = response.data;
            const updatedItems = items.map(el => el.id === id ? {...el, data} : el);
            setItems(updatedItems);
        } catch (error) {
            console.error(error);
        }
    }

    const getCompletedItems = async (id, checked) => {
        try {
            const response = await axios.put(`${baseURL}todo-items/${id}`, {id, checked: !checked});
            const data = response.data;
            const checkedItems = items.map(el => el.id === id ? {...el, data} : el);
            setItems(checkedItems);
        } catch (error) {
            console.error(error);
        }
    }

   useEffect(   () => {

       renderData()

           const completeItems = items.filter(el => el.checked === true)
            setCompletedItems(completeItems)
            const unCheckedItems = items.filter(el => el.checked === false);
            setUnCompletedItems(unCheckedItems)

    }, [items])

    return (
        <div className="App">
            <div className="container">
                <h2>TODO LIST</h2>
                <h3>Add Item</h3>
                <p>
                    <input onChange={(e) => setTitle(e.target.value)} id="new-task" type="text"/>
                    <button onClick={handleChange}>Add</button>
                </p>
                <h3>Todo</h3>
                <ul id="incomplete-tasks">

                    {
                        unCompletedItems.map((el) => (
                           <ListItems getCompletedItems={getCompletedItems} updateItem={updateItem} deleteItem={deleteItem} key={el.id} el={el}/>
                        ))
                    }
                </ul>

                <h3>Completed</h3>
                <ul id="completed-tasks">
                    {
                        completedItems.map(el => (
                            <ListItems getCompletedItems={getCompletedItems} updateItem={updateItem} deleteItem={deleteItem} key={el.id} el={el}/>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default App;