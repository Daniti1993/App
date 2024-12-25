import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CheckInForm from './pages/CheckInForm';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/check-in" element={<CheckInForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}