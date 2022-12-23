import React, { Suspense } from "react";
const RemoteApp = React.lazy(() => import("remoteApp/App"));
const RemoteApp2 = React.lazy(() => import("remoteApp/App2"));
const App = () => {
  return (
    <div>
      <div
        style={{
          margin: "10px",
          padding: "10px",
          textAlign: "center",
          backgroundColor: "greenyellow",
        }}
      >
        <h1>App1</h1>
      </div>
      <Suspense fallback={"loading..."}>
        <RemoteApp />
      </Suspense>
      <Suspense fallback={"loading2..."}>
        <RemoteApp2 />
      </Suspense>
    </div>
  );
};

export default App;
