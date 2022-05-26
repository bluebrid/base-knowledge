export default {  
    remainTodos: state => {
        return state.todos.filter(todo => !todo.done).length;
    }
}