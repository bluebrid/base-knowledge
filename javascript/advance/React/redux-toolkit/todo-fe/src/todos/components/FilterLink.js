import React from 'react';
import PropTypes from 'prop-types';

const FilterLink = ({ active, children, onClick }) => {
  return (
    <a
      href="/#"
      className={active ? 'selected' : ''}
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

FilterLink.prototype = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
};

export default FilterLink;
