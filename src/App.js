import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound.jsx';
import Nav from './components/Nav.jsx';
import Home from './components/Home.jsx';
import BlogsPage from './components/BlogsPage.jsx';
import DynamicPage from './components/DynamicPage.jsx';
import './assets/styles/main.css'
import Footer from './components/Footer.jsx';
const App = () => {
  return (
    <Router>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:id" element={<DynamicPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
