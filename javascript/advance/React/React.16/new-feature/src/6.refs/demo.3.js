import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

const useInterval = (fn, time, value) => {
  const callback = useRef(fn);
  callback.current = fn;
  useEffect(() => {
    const tick = setInterval(callback.current, time);
    return () => clearInterval(tick);
  }, [value]);
};

const Foo = ({ text }) => {
  const [count, setCount] = useState(0);
  useInterval(() => {
    setCount(count + 1);
  }, 1000, count);
  // useLayoutEffect( () => {
  //     root.current && setWidth(root.current.offsetWidth)
  // }, [])
  return <span> {count}</span>;
};

export default Foo;
