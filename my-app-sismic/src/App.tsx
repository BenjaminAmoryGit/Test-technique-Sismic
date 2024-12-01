import React from 'react';
import UsersList from './componants/UsersList';
import './App.css';
import { GlobalProvider } from './GlobalContext';

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <UsersList />
      </GlobalProvider>
    </div>
  );
}

export default App;
