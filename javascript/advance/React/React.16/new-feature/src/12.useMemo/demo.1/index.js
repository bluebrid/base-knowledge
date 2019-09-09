import React from 'react';

function Button({ name, children }) {
  function changeName(name) {
    console.log('Demo1: 调用changeName 方法');
    return name + '改变name的方法';
  }

  const otherName = changeName(name);
  return (
    <>
      <div>{otherName}</div>
      <div>{children}</div>
    </>

  )
}
export default Button;