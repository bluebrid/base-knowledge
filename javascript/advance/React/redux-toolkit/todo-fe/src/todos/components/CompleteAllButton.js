import React from 'react';
import { PropTypes } from 'prop-types';

export const CompleteAllButton = ({ completeAll, disabled }) => {
  return (
    <div>
      <input
        id="complete-all"
        className="complete-all"
        type="button"
        onClick={completeAll}
        disabled={disabled ? 'disabled' : ''}
      />
      <label
        htmlFor="complete-all"
        title={disabled ? 'All is completed' : 'Mark all visible as completed'}
      >
        Mark all as complete
      </label>
    </div>
  );
};

CompleteAllButton.propTypes = {
  completeAll: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default CompleteAllButton;
