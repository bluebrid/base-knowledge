import React, { useState, useEffect } from 'react';
import Header from './Header';
import MainSection from './MainSection';
import { reducer } from '../stores/reducer';
import { TodoProvider } from '../TodoProvider';
import Mock from 'mockjs';
import axios from 'axios';

// Mock.mock(/todos/, {
//   'list|1-1': [
//     {
//       'text': '@csentence(2, 5)',
//       'completed|1': [true, false],
//       'id|+1': 1
//     }
//   ]
// });

Mock.mock(/todos/, {
  'list': [
    {
      'text': 'Todo 1',
      'completed': true,
      'id': 1
    }
  ]
});
const App = () => {
  const [initialState, setInitialState] = useState({
    todos: [
    ],
    visibilityFilter: 'All'
  });

  useEffect(() => {
    axios.get('/todos')
      .then(res => {
        initialState.todos = res.data.list;
        setInitialState(initialState);
      });
  }, [initialState.todos.length]);

  return (
    <TodoProvider initialState={initialState} reducer={reducer}>
      <div>
        <Header />
        <MainSection />
      </div>
    </TodoProvider>
  );
};

export default App;
