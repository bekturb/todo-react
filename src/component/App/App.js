import '../../styles/App.css';
import React, {useState} from "react";
import ListItems from "../ListItems/ListItems";

function App() {

    const [title, setTitle] = useState('');
    const [items, setItems] = useState([]);

    const handleChange = () => {

        const newObj = {
            id: items.length ? items[items.length - 1].id + 1 : 1,
            title,
            checked: false,
        }
        setItems([...items, newObj])
    }


    const deleteItem = (id) => {
        const deletedItem = items.filter(item => item.id !== id)
        setItems(deletedItem)
    }

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
                        items.map((el) => (
                           <ListItems deleteItem={deleteItem} key={el.id} el={el}/>
                        ))
                    }
                </ul>

                <h3>Completed</h3>
                <ul id="completed-tasks">
                    {/*<li>*/}
                    {/*    <input type="checkbox" checked/>*/}
                    {/*    <label>See the Doctor</label>*/}
                    {/*    <input type="text"/>*/}
                    {/*    <button className="edit">Edit</button>*/}
                    {/*    <button className="delete">Delete</button>*/}
                    {/*</li>*/}
                </ul>
            </div>
        </div>
    );
}

export default App;
