import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from './react-router/packages/react-router-dom/modules';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
	, document.getElementById('root'));
