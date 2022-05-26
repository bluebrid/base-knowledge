import React, { useState } from "react";
import { useTimeout, useInterval } from "@huse/timeout";

export default () => {
  let [count, setCount] = useState(0);
  useTimeout(() => {
    console.log("trigger");
  }, 4000 * 1); // executes after
  useInterval(() => {
    setCount(count + 1);
  }, 1000 * 2);
  return <div>{count} </div>;
};
