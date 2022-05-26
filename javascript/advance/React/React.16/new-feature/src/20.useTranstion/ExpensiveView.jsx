import React from "react";

function ExpensiveView(props) {
  const { count } = props;
  const length = count * 20 + 1000;
  return (
    <div className="expensive-view">
      <h4>DIV count:{length}</h4>
      {Array.from(Array(length).keys()).map((v) => {
        const style = {
          backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
            16
          )}`,
          display: "inline-block",
          width: "50px",
          height: "50px",
          margin: "2px"
        };
        return <div className="box" key={v} style={style}></div>;
      })}
    </div>
  );
}

export default React.memo(ExpensiveView);
