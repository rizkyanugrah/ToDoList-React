import React from "react";
import AddTodoForm from "./AddTodoForm";
import UpdateTodoForm from "./UpdateTodoForm";
import SingleTodoCard from "./SingleTodoCard";

import { useSelector, useDispatch } from "react-redux";
import { todosCleared, setFilter } from "../redux/reducers/todoSlice";

import { BsFillCheckCircleFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

const Card = () => {
  const toggle = useSelector((state) => state.todos.toggleForm);
  const myTodos = useSelector((state) => state.todos.todos);
  const filter = useSelector((state) => state.todos.filter);

  const dispatch = useDispatch();

  if (toggle) {
    return (
      <div className="sm:w-1/2 h-full md:h-[87%] min-h-max bg-[#7743DB] shadow-2xl rounded-lg p-2 items-center flex flex-col space-y-10 justify-between">
        <div className="flex flex-col space-y-10 w-full h-3/4 min-h-max items-center">
          <h1 className="text-5xl font-semibold h1-todo">Todo App</h1>
          <div className="w-full sm:w-3/4">
            {toggle ? <AddTodoForm /> : <UpdateTodoForm />}
          </div>

          {/* Start Filter Todos */}
          <div className="w-full sm:w-3/4 flex justify-between">
            <button
              className={`bg-[#788896] hover:bg-[rgb(26,174,159)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                filter === "All" ? "bg-[rgb(26,174,159)]" : ""
              }`}
              onClick={() => {
                dispatch(setFilter("All"));
              }}
            >
              All
            </button>
            <button
              className={`bg-[#788896] hover:bg-[rgb(26,174,159)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                filter === "Active" ? "bg-[rgb(26,174,159)]" : ""
              }`}
              onClick={() => {
                dispatch(setFilter("Active"));
              }}
            >
              Active
            </button>
            <button
              className={`bg-[#788896] hover:bg-[rgb(26,174,159)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                filter === "Complete" ? "bg-[rgb(26,174,159)]" : ""
              }`}
              onClick={() => {
                dispatch(setFilter("Complete"));
              }}
            >
              Complete
            </button>
          </div>

          {/* End Filter Todos */}

          <div className="w-full sm:w-3/4">
            {myTodos.length !== 0 ? (
              <ul className="w-full max-h-52 overflow-y-scroll">
                {myTodos.map((todo) => (
                  <li className="mb-3" key={todo.id}>
                    <SingleTodoCard title={todo.title} id={todo.id} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="w-full flex flex-col items-center space-y-10">
                <h1 className="text-2xl">Enter your first todo item</h1>
                <BsFillCheckCircleFill size={50} className="text-green-500" />
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-red-500 hover.bg-red-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
          onClick={() => {
            dispatch(todosCleared());
          }}
        >
          Clear
        </button>
      </div>
    );
  } else {
    return (
      <div className="w-1/2 h-3/4 min-h-max bg-[#7743DB] shadow-2xl rounded-lg p-2 items-center flex flex-col space-y-10 justify-between">
        <div className="flex flex-col space-y-10 w-full h-3/4 min-h-max items-center">
          <h1 className="text-3xl font-semibold h1-todo">Update Todo List</h1>
          <div className="w-3/4">
            <UpdateTodoForm />
            <div className="w-full flex flex-col items-center space-y-10 mt-20">
              <h1 className="text-2xl">Edit your todo item</h1>
              <FaEdit size={50} className="text-green-500" />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Card;
