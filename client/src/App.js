import './App.css';
import {useState, useEffect} from "react";
import Axios from "axios";


function App() {

  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);


  const addTodo = () => {
    Axios.post('http://localhost:5000/addtodo', {todo}).then(()=> {
      setList([...list, {todo}]);
    });
  };

  const deleteTodo = (id) => {
    Axios.delete(`http://localhost:5000/delete/${id}`).then(() =>{
      setList(list.filter((val) => {
      return val._id !== id;
      })
      );
    });
  };

  useEffect(() =>{
    Axios.get('http://localhost:5000/read').then((response) => {
      setList(response.data);
    });
  }, []);

    return (
        <div className="container">
          <div className="text-field">
        <h1>To do App</h1>
        <input type="text"
        placeholder="Write the thing you need to do in here..."
        onChange={(event) => {
            setTodo(event.target.value)
          }}
          />
        
        <button onClick={addTodo}>Add</button>
        </div>

        <div>
          {list.map((val) => {
            return(
              <>
            <p>{val.todo}</p>
            <button onClick={() => {
              deleteTodo(val._id);
              }}>done</button>
            </>
            )
          }
          
          )}
        </div>

        </div>
    );
}
export default App;
