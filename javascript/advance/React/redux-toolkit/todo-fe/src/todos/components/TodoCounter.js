import React from 'react';
import { PropTypes } from 'prop-types';

const TodoCounter = ({ leftCount }) => {
  const itemWord = leftCount === 1 ? 'item' : 'items';
  return (
    <span className="todo-count">
      <strong>{leftCount}</strong> {itemWord} left
    </span>
  );
};

TodoCounter.propTypes = {
  leftCount: PropTypes.number.isRequired,
};

export default TodoCounter;
