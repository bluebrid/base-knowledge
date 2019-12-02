import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import ErrorBoundary from '../ ErrorBoundary';

import Layout from '../Layout';

class App extends Component {
  render() {
    console.log('==============================RenderApp')
    return (
      <ErrorBoundary>
        <HashRouter basename=''>
          <Layout />
        </HashRouter>
      </ErrorBoundary>
    );
  }
}

export default App;
