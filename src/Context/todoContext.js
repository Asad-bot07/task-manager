import { useContext, createContext } from "react";

export const todoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "Todo Message",
            completed: false,
            deadline: "",
        }
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    isCompleted: (id) => {},
});

export const useTodo = () => {
    return useContext(todoContext);
}

export const TodoProvider = todoContext.Provider;