import React, { useState } from "react";
import { useDebouncedValue } from "./debounce";

export default () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebouncedValue(value, 1000); // debounced update 10ms

  return (
    <>
      <div>
        <input value={value} onChange={e => setValue(e.target.value)} />
      </div>
      <div>Current Value: {debouncedValue}</div>
    </>
  )
};
