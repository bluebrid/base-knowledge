import axios from './../axiosConfig';

const ApiURIs = {
  TODOS: 'todos',
  TODOS_COMPLETED: 'todos/completed',
  TODO_ITEM: 'todos/:id',
  TODO_ITEM_COMPLETE: 'todos/:id/complete',
  TODO_ITEM_INCOMPLETE: 'todos/:id/incomplete',
};

const HTTP_METHOD = {
  POST: 'POST',
  GET: 'GET',
  DELETE: 'DELETE',
};

async function callApi(url, method, data) {
  return axios({
    url,
    method,
    data,
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      let message;
      if (error.response) {
        message = error.response.data;
      } else {
        message = error.message;
      }
      throw new Error(message);
    });
}

export const fetchTodos = () => callApi(ApiURIs.TODOS, HTTP_METHOD.GET);

export const fetchCompletedTodos = () =>
  callApi(ApiURIs.TODOS_COMPLETED, HTTP_METHOD.GET);

export const deleteTodo = id =>
  callApi(ApiURIs.TODO_ITEM.replace(':id', id), HTTP_METHOD.DELETE);

export const completeTodo = id =>
  callApi(ApiURIs.TODO_ITEM_COMPLETE.replace(':id', id), HTTP_METHOD.POST);

export const incompleteTodo = id =>
  callApi(ApiURIs.TODO_ITEM_INCOMPLETE.replace(':id', id), HTTP_METHOD.POST);

export const addTodo = payload =>
  callApi(ApiURIs.TODOS, HTTP_METHOD.POST, payload);

export const updateTodo = ({ id, text }) =>
  callApi(ApiURIs.TODO_ITEM.replace(':id', id), HTTP_METHOD.POST, { text });
