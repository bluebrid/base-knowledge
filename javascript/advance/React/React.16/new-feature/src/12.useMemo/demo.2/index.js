import React, { useMemo } from 'react';

function Button({ name, children }) {
  function changeName(name) {
    console.log('Demo2: 调用changeName 方法');
    return name + '改变name的方法';
  }

  const otherName = useMemo(() => changeName(name), [name]);
  return (
    <>
      <div>{otherName}</div>
      <div>{children}</div>
    </>

  );
}
export default Button;