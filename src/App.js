import { useState } from "react";
import "./App.css";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetSingleTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "./feature/api/apiSlice";

function App() {
  const [todo, setTodo] = useState("");
  const [singleTodo, setSingleTodo] = useState("");
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();

  const [getSingleTodo] = useGetSingleTodoMutation();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo) {
      // logic to add todo using RTK Query
      addTodo({ title: todo, completed: false });
      setTodo("");
    }
  };

  let content;

  if (isLoading) {
    content = <p>Loading ...</p>;
  } else if (isSuccess) {
    content = (
      <ul>
        {todos.map((todo) => {
          return (
            <li
              className={todo.completed ? "checked" : ""}
              key={todo.title}
              onClick={() =>
                updateTodo({ ...todo, completed: !todo.completed })
              }
            >
              <span style={{float: "left"}}>id: {todo.id}</span> {todo.title}
              <span
                className="close"
                onClick={() => deleteTodo({ id: todo.id })}
              >
                x
              </span>
            </li>
          );
        })}
      </ul>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <div className="App">
      <div className="header">
        <form onSubmit={handleSubmit}>
          <h2>My To Do List</h2>
          <input
            type="text"
            placeholder="Your Todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button className="addBtn" type="submit">
            Add
          </button>
        </form>
      </div>
      {content}
      <button onClick={() => getSingleTodo(6).then((res) => setSingleTodo(res.data))}>Click for single todo</button>
      <div>{singleTodo?.title}</div>
    </div>
  );
}

export default App;
