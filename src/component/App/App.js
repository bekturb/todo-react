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

    const deleteItem = (id) => {
        const deletedItem = items.filter(item => item.id !== id)
        setItems(deletedItem)
    }

    const updateItem = (id, newItem) => {
        const updatedItems = items.map(el => el.id === id ? {...el, title: newItem} : el);
        setItems(updatedItems);
    }

    const getCompletedItems = (id) => {
        const checkedItems = items.map(el => el.id === id ? {...el, checked: !el.checked} : el);
        setItems(checkedItems);
    }

   useEffect( () => {

       axios.get(`${baseURL}todo-items`)
           .then(response => setItems(response.data))
           .catch(error => {
               setTitle(error.message );
               console.error('There was an error!', error);
           });

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