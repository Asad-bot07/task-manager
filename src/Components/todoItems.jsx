import { useState, useEffect } from "react";
import { useTodo } from "../Context";

export const Todoitems = ({ todo }) => {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const [timeLeft, setTimeLeft] = useState("");

  const { updateTodo, deleteTodo, isCompleted } = useTodo();

  useEffect(() => {
    if (!todo.deadline || todo.completed) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const deadlineDate = new Date(todo.deadline).getTime();
      const distance = deadlineDate - now;

      if (distance < 0) {
        setTimeLeft("Expired");
        clearInterval(interval);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let timeString = "";
        if (days > 0) timeString += `${days}d `;
        if (hours > 0) timeString += `${hours}h `;
        timeString += `${minutes}m`;

        setTimeLeft(timeString || "< 1m");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [todo.deadline, todo.completed]);

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    isCompleted(todo.id);
  };

  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-xl border transition-all duration-300 shadow-sm relative overflow-hidden
        ${
          todo.completed
            ? "bg-[#f4f1ea] border-stone-200 opacity-60"
            : "bg-white border-red-100 hover:shadow-md hover:shadow-red-500/5"
        }`}
    >
      <div className="flex items-center w-full gap-3">
        <input
          type="checkbox"
          className="w-5 h-5 cursor-pointer accent-red-600 shrink-0"
          checked={todo.completed}
          onChange={toggleCompleted}
        />
        <div className="flex flex-col flex-1 gap-1">
          <input
            type="text"
            className={`w-full bg-transparent outline-none text-stone-700 font-medium px-2 py-1 rounded transition-all
              ${
                isTodoEditable
                  ? "border-2 border-red-400 bg-white shadow-inner"
                  : "border-2 border-transparent"
              }
              ${todo.completed ? "line-through text-stone-400" : ""}
            `}
            value={todoMsg}
            onChange={(e) => setTodoMsg(e.target.value)}
            readOnly={!isTodoEditable}
          />
          {todo.deadline && !todo.completed && (
            <div
              className={`text-xs px-2 font-semibold flex items-center gap-1
              ${timeLeft === "Expired" ? "text-red-600" : "text-stone-400"}
            `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {timeLeft === "Expired" ? "Deadline Missed" : `${timeLeft} left`}
            </div>
          )}
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            className="inline-flex items-center justify-center w-8 h-8 text-sm transition-colors rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 disabled:opacity-50"
            onClick={() => {
              if (todo.completed) return;
              if (isTodoEditable) {
                editTodo();
              } else {
                setIsTodoEditable((prev) => !prev);
              }
            }}
            disabled={todo.completed}
          >
            {isTodoEditable ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-600"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
              </svg>
            )}
          </button>

          <button
            className="inline-flex items-center justify-center w-8 h-8 transition-colors rounded-lg bg-stone-100 hover:bg-red-100 text-stone-600 hover:text-red-600"
            onClick={() => deleteTodo(todo.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
