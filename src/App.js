import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import './assets/styles/main.css'
const App = () => {
  return (
    <Router>
      <Nav />
    </Router>
  );
};

export default App;
