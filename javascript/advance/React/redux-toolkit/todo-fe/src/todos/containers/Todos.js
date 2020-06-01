import React, { Component } from 'react';
import TodoList from '../components/TodoList';
import { connect } from 'react-redux';
import { getVisibleTodos, getTodosMeta } from '../reducers/selectors';
import { bindActionCreators } from 'redux';
import {
  toggleCompleted,
  deleteTodo,
  completeAllVisible,
  updateTodo,
  displayNotification,
} from '../actions';
import CompleteAllButton from '../components/CompleteAllButton';
const style = { display: 'block' };

class Todos extends Component {
  render() {
    return (
      <div>
        <section className="main" style={style}>
          <CompleteAllButton
            completeAll={this.props.actions.completeAllVisible}
            disabled={this.props.visibleIncompletedCount === 0}
          />
          <TodoList
            items={this.props.todos}
            actions={this.props.actions}
            todos_meta={this.props.todos_meta}
          />
        </section>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state),
    todos_meta: getTodosMeta(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        toggleCompleted,
        deleteTodo,
        completeAllVisible,
        updateTodo,
        displayNotification,
      },
      dispatch,
    ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
