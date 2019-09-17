import { useContext } from "react";
import { TodoContext } from "./TodoContext";

// useContext的上下文就是全局的TodoContext
// useContext 就是返回React.createContext的_currentValue
export const useTodo = () => useContext(TodoContext);
