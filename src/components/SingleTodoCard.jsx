import { useState } from "react";
import { BsTrashFill, BsCheckSquare } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { formToggled, todoDeleted } from "../redux/reducers/todoSlice";

const SingleTodoCard = (props) => {
  const [toggleComplete, setToggleComplete] = useState(false);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.todos.filter);

  const shouldDisplay =
    filter === "All" ||
    (filter === "Active" && !toggleComplete) ||
    (filter === "Complete" && toggleComplete);

  return shouldDisplay ? (
    <div className="flex justify-between bg-red-100 py-2 rounded shadow">
      <div className="px-4">
        <h1
          className={
            toggleComplete ? "font-semibold line-through" : "font-semibold"
          }
        >
          {props.title}
        </h1>
      </div>
      <div className="px-4 flex space-x-4">
        <BsCheckSquare
          onClick={() => setToggleComplete(!toggleComplete)}
          className={`cursor-pointer text-green-700 ${
            toggleComplete ? "text-gray-400" : ""
          }`}
          size={20}
        />
        {toggleComplete ? (
          <FaEdit size={20} className="cursor-pointer text-gray-400" />
        ) : (
          <FaEdit
            onClick={() =>
              dispatch(formToggled({ id: props.id, title: props.title }))
            }
            className="cursor-pointer text-yellow-700"
            size={20}
          />
        )}
        <BsTrashFill
          onClick={() => dispatch(todoDeleted(props.id))}
          className="cursor-pointer text-red-700"
          size={20}
        />
      </div>
    </div>
  ) : null;
};

export default SingleTodoCard;
