import React, { Component } from 'react';
import TodoItem from './TodoItem';

export default class TodoList extends Component {
  render() {
    return (
      <ul className="todo-list">
        {this.props.items.map((item, i) => {
          return (
            <TodoItem
              key={item.get('id')}
              todo={item}
              toggleCompleted={this.props.actions.toggleCompleted}
              deleteTodo={this.props.actions.deleteTodo}
              meta={this.props.todos_meta.get(item.get('id'))}
              onSave={this.props.actions.updateTodo}
            />
          );
        })}
      </ul>
    );
  }
}
