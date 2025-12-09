import { useState } from "react";
import { useTodo } from "../Context";

export const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const [deadline, setDeadline] = useState("");

  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({ todo, completed: false, deadline: deadline });
    setTodo("");
    setDeadline("");
  };

  return (
    <div className="flex items-center justify-center p-10 bg-[#f4f1ea]">
      <form
        onSubmit={add}
        // Changed to flex-col for mobile, flex-row for larger screens
        className="flex flex-col sm:flex-row w-full max-w-2xl gap-3 p-2 bg-white border border-red-100 shadow-xl rounded-2xl shadow-red-900/5"
      >
        <input
          type="text"
          placeholder="Write todos..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="grow px-5 py-3 font-medium transition-all duration-300 border-2 border-transparent outline-none text-stone-700 bg-stone-50 rounded-xl placeholder:text-stone-400 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
        />
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="px-4 py-3 text-sm font-medium text-stone-600 transition-all duration-300 border-2 border-transparent outline-none cursor-pointer bg-stone-50 rounded-xl hover:bg-stone-100 focus:bg-white focus:border-red-500 focus:text-red-600"
        />

        <button
          type="submit"
          className="px-8 py-3 font-bold text-white transition-all duration-200 bg-red-600 shadow-lg rounded-xl hover:bg-red-700 hover:shadow-red-600/30 active:scale-95 shrink-0"
        >
          Add
        </button>
      </form>
    </div>
  );
};
