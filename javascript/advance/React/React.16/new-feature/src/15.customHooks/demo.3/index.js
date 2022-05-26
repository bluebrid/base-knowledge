import React, { useState } from "react";
import { useSelection } from "./selection";

export default () => {
  const initialSelectedIndex = [1];
  const [selection, { selectIndex }] = useSelection(initialSelectedIndex, {
    // multiple: true,
    range: true
  });

  const renderItem = (item, i) => (
    <li
      key={item.id}
      className={selection.includes(i) ? "selected" : ""}
      onClick={e => selectIndex(i, e)}
    >
      {item.name}
    </li>
  );
  const dataSource = [
    {
      id: 1,
      name: 1
    },
    {
      id: 2,
      name: 2
    },
    {
      id: 3,
      name: 3
    },
    {
      id: 4,
      name: 4
    },
    {
      id: 5,
      name: 5
    }
  ];
  return <ul>{dataSource.map(renderItem)}</ul>;
};
