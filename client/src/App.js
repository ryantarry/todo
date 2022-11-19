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

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    this.setState({
      itemvalues: [{}]
    });
  };

    return (
        <div className="container">
                  <h1>To Do List</h1>
          <div className="top">

        <input type="text"
        placeholder="Write the thing you need to do in here..."
        onChange={(event) => {
            setTodo(event.target.value)
          }}
          />
        
        <button type='submit' className='add' onClick={() => {
          addTodo();
          handleReset();
        }}>Add</button>
        </div>

        <div>
          {list.map((val) => {
            return(
              <>
              <div className='entry'>
            <p>{val.todo}</p>
            <button onClick={() => {
              deleteTodo(val._id);
              }}>done</button>
              </div>
            </>
            )
          }
          
          )}
        </div>

        </div>
    );
}
export default App;
