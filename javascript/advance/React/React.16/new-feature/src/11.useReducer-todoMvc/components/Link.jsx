import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTodo } from '../useTodo';

export const Link = React.memo(({ children, filter }) => {
  const [{ visibilityFilter }, dispatch] = useTodo();
  console.log('++++++++++++++++++++++++++++++')
  return (
    <a
      href='#'
      type='button'
      className={classnames({ selected: filter === visibilityFilter })}
      style={{ cursor: 'pointer' }}
      onClick={() =>
        dispatch({
          type: 'SET_VISIBILITY',
          payload: {
            visibilityFilter: filter
          }
        })
      }
    >
      {children}
    </a>
  );
}, (prevProps, nextProps) => {
  return prevProps.filter === nextProps.filter;
});

/*
export const Link = React.memo(({ children, filter }) => {
  console.log('++++++++++++++++++++++++++++++')
  return (
    <a
      href='#'
      type='button'
      style={{ cursor: 'pointer' }}
    >
      {children}
    </a>
  );
}, (prevProps, nextProps) => {
  return prevProps.filter === nextProps.filter;
});
*/
Link.propTypes = {
  children: PropTypes.node.isRequired,
  filter: PropTypes.string.isRequired
};
