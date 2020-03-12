import React, { useState } from "react";
import { useInputValue } from "./inputValue";

export default () => {
  const name = useInputValue("");
  const age = useInputValue(10);

  return (
    <>
      <div key='name'>
        <label>
          Username: <input {...name} />  
        </label>
      </div>
      <div key='age'>
        <label>
          Age: <input type="number" {...age} />  
        </label>
      </div>
      <div key='des'>
          name: {name.value}, age: {age.value}
      </div>
    </>
  );
};
