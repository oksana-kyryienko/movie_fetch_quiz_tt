import React from 'react';
import { Movie } from '../../types/Movie';
import './MovieCard.css';
import ProgressBar from '../ProgressBar/ProgressBar';

type Props = {
  movie: Movie;
};

export const MovieCard: React.FC<Props> = ({ movie }) => (
  <>
    <ProgressBar percentage={100} />

    <div className="card" data-cy="movieCard">
      <div className="card-image">
        <figure className="image">
          <img src={movie.imgUrl} alt="Film logo" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title">{movie.title}</p>
            <p className='text'>{movie.year}</p>
          </div>
        </div>

        <div className="content">
          <br />
          <a href={movie.imdbUrl}>IMDB</a>
        </div>
      </div>
    </div>
  </>
);
