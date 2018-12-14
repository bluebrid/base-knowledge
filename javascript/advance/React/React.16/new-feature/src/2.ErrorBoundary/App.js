import React from 'react'
import ErrorBoundary from './errorBoundary'
import BuggyButton from './button'
import './App.scss'
function App() {
    return (
        <ErrorBoundary>
            <BuggyButton />
        </ErrorBoundary>
    );
}
export default App;