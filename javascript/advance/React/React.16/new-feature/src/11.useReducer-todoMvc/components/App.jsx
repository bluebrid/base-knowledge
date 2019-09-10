import React, { useState, useEffect } from 'react';
import Header from './Header';
import MainSection from './MainSection';
import { reducer } from '../stores/reducer';
import { TodoProvider } from '../TodoProvider';
import Mock from 'mockjs';
import axios from 'axios';

Mock.mock(/todos/, {
  'list|1-10': [
    {
      'text': '@csentence(2, 5)',
      'completed|1': [true, false],
      'id|+1': 1
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
        setInitialState(initialState.todos = res.data.list);
      });
  }, [initialState]);

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
