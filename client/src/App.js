import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Article from './Article';
import Registration from './Registration';
import Profile from './Profile';
import Payment from './Payment';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [availableArticles, setAvailableArticles] = useState(3);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Article availableArticles={availableArticles} />} />
        <Route path="/registration" element={<Registration setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/profile" element={<Profile setAvailableArticles={setAvailableArticles} availableArticles={availableArticles} />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
