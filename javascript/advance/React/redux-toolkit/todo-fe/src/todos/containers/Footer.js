import React from 'react';
import { connect } from 'react-redux';
import { FILTER_DEFS } from '../constants';
import { getFilter, countCompletedTodos } from '../reducers/selectors';
import { bindActionCreators } from 'redux';
import { setActiveFilter, deleteAllCompletedTodos } from '../actions';
import TodoCounter from '../components/TodoCounter';
import TodoFilters from '../components/TodoFilters';

const Footer = ({
  activeFilter,
  filters,
  leftCount,
  setActiveFilter,
  deleteAllCompletedTodos,
}) => (
  <footer className="footer">
    <TodoCounter leftCount={leftCount} />
    <TodoFilters
      availableFilters={filters}
      activeFilter={activeFilter}
      setFilter={setActiveFilter}
    />
    <button
      className="clear-completed"
      style={{
        display: leftCount > 0 ? 'block' : 'none',
      }}
      onClick={deleteAllCompletedTodos}
    >
      Clear completed
    </button>
  </footer>
);

const mapStateToProps = state => {
  return {
    activeFilter: getFilter(state),
    filters: FILTER_DEFS,
    leftCount: countCompletedTodos(state),
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteAllCompletedTodos,
      setActiveFilter,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
