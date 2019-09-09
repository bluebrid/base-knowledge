import React from 'react'
import ErrorBoundary from './errorBoundary'
import BuggyButton from './button'
import './App.scss'
function App() {
    return (
        <div class="section" data-title="2 error boundary">
        <ErrorBoundary>
            <BuggyButton />
        </ErrorBoundary>
        <div>
    );
}
export default App;