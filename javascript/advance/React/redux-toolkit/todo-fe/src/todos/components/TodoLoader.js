import React from 'react';
import spinner from './../resources/images/spinner.gif';

export const TodoLoader = () => {
  return <img src={spinner} alt="Loading..." className="loading" />;
};

export default TodoLoader;
