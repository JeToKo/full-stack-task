import React from 'react';
import BookForm from './BookForm';
import './App.css';
import BookList from './BookList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Full stack task</h1>
      </header>
      <div className='App-body'>
        <BookList/>
      </div>
    </div>
  );
}

export default App;
