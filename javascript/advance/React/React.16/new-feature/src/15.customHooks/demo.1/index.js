import React, { useEffect, useRef } from "react";
import { useActionPending } from "@huse/action-pending";

export default async () => {
  const url = "https://wanandroid.com/wxarticle/list/408";
  const [fetchUser, pendingCount] = useActionPending(x => Promise.resolve(x  + 1));
  const num1Request = fetchUser("1"); // pendingCount becomes 1
  const num2Request = fetchUser("2"); // pendingCount becomes 2
  const num1Data = await num1Request; // pendingCount becomes 1
  const num2Data = await num2Request; // pendingCount becomes 0
  return <div>{
    pendingCount ? <div> Loading</div> 
    : <div> Done</div>
    }</div>;
};
