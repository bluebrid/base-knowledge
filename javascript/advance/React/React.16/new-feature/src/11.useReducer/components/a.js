import React, { useContext } from 'react';
import service from '../services';
import Context from '../store';

const A = () => {
  const { dispatch, state } = useContext(Context);
  return (
    <>
      <button
        disabled={state.loading}
        onClick={() => {
          dispatch({
            type: 'click_async',
            payload: service.asyncFetch(new Date().getTime())
          });
        }}
      >
        click async
      </button>
      <button
        disabled={state.loading}
        onClick={() => {
          dispatch({
            type: 'click_sync',
            payload: new Date().getTime()
          });
        }}
      >
        click sync
      </button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  );
};
export default A;