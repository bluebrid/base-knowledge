import React from 'react';
import PropTypes from 'prop-types';

const TodoNotification = ({ notification, onHide }) => {
  const { message, type } = notification.toObject();

  const typeClass = 'todo-' + type + '-message';

  let el;
  if (notification.show) {
    el = (
      <div className={'todo-notification ' + typeClass}>
        <div
          className="todo-notification-close"
          onClick={e => {
            onHide();
          }}
        />
        <div className={'todo-notification-content '}>{message}</div>
      </div>
    );
  } else {
    el = <div />;
  }
  return <div>{el}</div>;
};

TodoNotification.propTypes = {
  notification: PropTypes.object.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default TodoNotification;
