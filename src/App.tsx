import React from 'react';
import { Route, Routes } from 'react-router-dom';
import QuizPage from './pages/QuizPage';
import { SearchMoviePage } from './pages/SearchMoviePage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<QuizPage />} />
        <Route path="/search-movie" element={<SearchMoviePage />} />
      </Routes>
    </div>
  );
};

export default App;
