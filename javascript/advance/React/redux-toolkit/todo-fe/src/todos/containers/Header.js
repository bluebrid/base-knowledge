import React from 'react';
import TodoItemTextField from '../components/TodoItemTextField';
import { addTodoAsync } from '../actions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

const Header = ({ addTodo }) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <TodoItemTextField
        placeholder="What needs to be done?"
        onSave={addTodo}
      />
    </header>
  );
};

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: payload => {
      dispatch(addTodoAsync.request(payload));
    },
  };
};

export default connect(null, mapDispatchToProps)(Header);
