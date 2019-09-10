import React from 'react';
import { TodoTextInput } from './TodoTextInput';
import { useTodo } from '../useTodo';
import Mock from 'mockjs';
import axios from 'axios';

Mock.mock(/save/, {
  'result': 'OK'
});

const Header = () => {
  const dispatch = useTodo()[1];

  return (
    <header className='header'>
      <h1>todos</h1>
      <TodoTextInput
        newTodo
        onSave={text => {
          if (text.length !== 0) {
            axios.post('/save', {
              text: text
            })
              .then(res => {
                dispatch({
                  type: 'ADD_TODO',
                  payload: { text }
                });
              });
          }
        }}
        placeholder='What needs to be done?'
      />
    </header>
  );
};

export default Header;
