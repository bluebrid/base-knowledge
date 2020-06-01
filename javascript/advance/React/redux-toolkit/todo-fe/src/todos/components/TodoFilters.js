import React from 'react';
import FilterLink from './FilterLink';
import PropTypes from 'prop-types';

const TodoFilters = ({ activeFilter, availableFilters, setFilter }) => {
  return (
    <ul className="filters">
      {availableFilters.map(filter => (
        <li key={filter.name}>
          <FilterLink
            active={filter.name === activeFilter}
            onClick={() => setFilter(filter.name)}
          >
            {filter.title}
          </FilterLink>
        </li>
      ))}
    </ul>
  );
};

TodoFilters.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  availableFilters: PropTypes.array.isRequired,
};

export default TodoFilters;
