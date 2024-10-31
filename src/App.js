import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound.jsx';
import Nav from './components/Nav.jsx';
import Home from './components/Home.jsx';
import BlogsPage from './components/BlogsPage.jsx';
import DynamicPage from './components/DynamicPage.jsx';
import Dashboard from './components/Dashboard.jsx';
import Login from './components/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './assets/styles/main.css'
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
const App = () => {
  return (
    <Router>
      <Nav />
      <main>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:id" element={<DynamicPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/login" element={<Login />} />
          <Route path="/dashboard/add-blog" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/dashboard/edit-blog/:id" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
