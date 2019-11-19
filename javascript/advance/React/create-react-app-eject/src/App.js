import React, { useEffect, useState } from 'react';

import axios from './axios/lib/axios';

function App() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios.get('/api/users').then(res => {
      setUser(res.data);
    });
  }, [1]);
  return (
    <div className='App'>
      <div>
        <div>Proxy Request result: </div>
        {user.map(o => {
          return (
            <div key={o.name}>
              <div>Name: {o.name}</div>
              <div>Age: {o.age}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
