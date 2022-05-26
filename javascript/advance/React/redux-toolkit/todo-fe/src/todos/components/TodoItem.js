import React, { Component } from 'react';
import TodoLoader from './TodoLoader';
import TodoItemTextField from './TodoItemTextField';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
    this.toggleStatus = this.toggleStatus.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  handleDoubleClick() {
    this.setState({
      editing: true,
    });
  }

  handleSave() {}

  handleDelete() {
    if (this.props.meta.get('loading')) return;
    const { todo } = this.props;
    this.props.deleteTodo(todo.get('id'));
  }

  toggleStatus() {
    if (this.props.meta.get('loading')) return;
    const { todo } = this.props;
    this.props.toggleCompleted(todo.get('id'), todo.get('completed'));
  }

  onSave(payload) {
    if (this.props.todo.get('text') === payload.text) return;
    this.props.onSave(
      Object.assign(payload, { id: this.props.todo.get('id') }),
    );
    this.setState({ editing: false });
  }

  render() {
    const { completed, text } = this.props.todo.toObject();

    let fragment;

    if (!this.state.editing) {
      fragment = this.renderTextField(text, completed);
    } else {
      fragment = this.renderInputField(text);
    }
    return <li className={completed ? 'completed' : ''}>{fragment}</li>;
  }

  renderInputField(text) {
    return (
      <TodoItemTextField
        text={text}
        onSave={this.onSave}
        editing={this.state.editing}
      />
    );
  }

  renderTextField(text, completed) {
    return (
      <div className="view">
        {this.renderCheckbox(completed)}
        <label
          onDoubleClick={this.handleDoubleClick}
          title="Double-click to edit a todo"
        >
          {text}
        </label>
        <button className="destroy" onClick={this.handleDelete} />
      </div>
    );
  }

  renderCheckbox(completed) {
    let checkbox;
    if (this.props.meta.get('loading')) {
      checkbox = <TodoLoader />;
    } else {
      checkbox = (
        <input
          className="toggle"
          type="checkbox"
          checked={completed ? 'checked' : ''}
          onChange={this.toggleStatus}
        />
      );
    }
    return checkbox;
  }
}

export default TodoItem;
