import React from 'react';
import TransactionList from './components/TransactionList';

import './App.css';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          NanoDev Frontend
        </a>
      </nav>
      <br />
      <div className="container mt-3">
        <TransactionList/>
      </div>
    </div>
  );
}

export default App;
