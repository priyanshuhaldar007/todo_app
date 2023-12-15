// Importing files and componensts.
import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './App';

// Retrieving the data from the local storage.
const initialData = JSON.parse(localStorage.getItem('myTaskList')) ?? [];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Passing the initial data as a prop to App component */}
    <App tasks={initialData}/> 
  </React.StrictMode>
);