import './App.css';
import {useState} from "react";

function App() {

    const [list, setList] = useState([]);
    const [title, setTitle] = useState('');

    const getTitle = (e) => {
        setTitle(e.target.value)
    }

    const createList = () => {

        const newTask = {
            id: 1,
            title,
            checked: false,
        }
        setList([...list, newTask])
    }

    console.log(list)

    return (
        <div className="App">
            <div className="container">
                <h2>TODO LIST</h2>
                <h3>Add Item</h3>
                <p>
                    <input onChange={getTitle} id="new-task" type="text"/>
                        <button onClick={createList}>Add</button>
                </p>

                <h3>Todo</h3>
                <ul id="incomplete-tasks">
                    <li>
                        <input type="checkbox"/>
                        <label>Pay Bills</label>
                        <input type="text"/>
                        <button className="edit">Edit</button>
                        <button className="delete">Delete</button>
                    </li>
                    <li>
                        <input type="checkbox"/>
                        <label>Go Shopping</label>
                        <input type="text" value="Go Shopping"/>
                        <button className="edit">Edit</button>
                        <button className="delete">Delete</button>
                    </li>
                </ul>

                <h3>Completed</h3>
                <ul id="completed-tasks">
                    <li>
                        <input type="checkbox" checked/>
                        <label>See the Doctor</label>
                        <input type="text"/>
                        <button className="edit">Edit</button>
                        <button className="delete">Delete</button>
                    </li>
                </ul>
            </div>

        </div>
    );
}

export default App;
