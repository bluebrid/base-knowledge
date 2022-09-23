import React, { useId } from 'react';
import './App.scss';

export default function App() {
  const id = useId();
  return (
    <div className="section " data-title="26 useId">
      <label htmlFor={id}>Do you like React({id})?</label>
      <input type="checkbox" name="react" id={id} />
    </div>
  );
}
