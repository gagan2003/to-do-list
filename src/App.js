import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const crossWord = (clickedItem) => {
    setTodos(todos.map(item => {
      if (item.id === clickedItem.id) {
        return { ...item, taskdoneornot: !item.taskdoneornot };
      }
      return item;
    }));
  };

  const handleSave = () => {
    if (todo.trim() !== "") {
      const newTodo = {
        id: uuidv4(),
        test: todo,
        taskdoneornot: false
      };
      setTodos([...todos, newTodo]);
      setTodo('');
    }
  };

  const handleEdit = (editedTodo) => {
    setTodo(editedTodo.test);
    setTodos(todos.filter(todoItem => todoItem.id !== editedTodo.id));
  };

  const handleDelete = (deletedTodo) => {
    setTodos(todos.filter(todoItem => todoItem.id !== deletedTodo.id));
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <div className="bg-blue-100 text-black w-full min-h-screen">
      <div className="p-4 font-bold text-center">
        <h2>TO-DO LIST</h2>
      </div>
      <div className="text-center">
        <input
          type="text"
          placeholder="Enter Your Task"
          value={todo}
          onChange={handleChange}
          className="rounded-md w-2/5 p-1"
        />
        <button
          onClick={handleSave}
          className="bg-blue-700 rounded-md mx-7 p-1"
        >
          Save
        </button>
      </div>
      <div className="px-52">
        {todos.map(item => (
          <div key={item.id}>
            <input
              type="checkbox"
              checked={item.taskdoneornot}
              className=""
              onChange={() => crossWord(item)}
            />
            <p className="inline-block px-2">
              <span className={item.taskdoneornot ? 'line-through' : ''}>
                <span className="font-bold">{item.test}</span>
              </span>
            </p>
            <div className="inline-block">
              <button
                onClick={() => handleEdit(item)}
                className="bg-green-700 rounded-md m-4"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item)}
                className="bg-red-700 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
