import React from 'react';
import { FindMovie } from '../components/FindMovie';
import './SearchMoviePage.css';

export const SearchMoviePage: React.FC = () => {
  return (
    <div className="SearchMoviePage">
      <FindMovie />
    </div>
  );
};
