import classNames from 'classnames';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { getMovie } from '../../api';
import { Movie } from '../../types/Movie';
import { MovieCard } from '../MovieCard';
import './FindMovie.css';
import { Link } from 'react-router-dom';
import not_find from '../../images/not_find.png';
import ProgressBar from '../ProgressBar/ProgressBar';

export const FindMovie: React.FC = () => {
  const [query, setQuery] = useState('');
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [isValidInput, setIsValidInput] = useState(true);

  const [completed, setCompleted] = useState(false);

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    setQuery(inputValue);
    setError(false);
    const isValid = /^[a-zA-Zа-яА-Я0-9\s]*$/.test(inputValue);
    setIsValidInput(isValid);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!isValidInput) {
      setError(true);
      return;
    }

    setLoader(true);

    getMovie(query)
      .then((response) => {
        if ('Error' in response) {
          return Promise.reject();
        }

        const { Title, Plot, Poster, imdbID, Year } = response;

        setMovie({
          title: Title,
          description: Plot,
          imgUrl:
            Poster === 'N/A'
              ? 'https://via.placeholder.com/360x270.png?text=no%20preview'
              : Poster,
          imdbUrl: `https://www.imdb.com/title/${imdbID}`,
          imdbId: imdbID,
          year: Year,
        });

        setCompleted(true);

        return Promise.resolve();
      })
      .catch(() => {
        setError(true);
        setQuery('');
      })

      .finally(() => setLoader(false));
  };

  return (
    <>
      {movie && (
        <div className="container">
          <MovieCard movie={movie} />
        </div>
      )}
      <form className="find-movie" onSubmit={handleSubmit}>
        {!completed && (
          <>
            <ProgressBar percentage={50} />
            <div className="field">
              <label className="label title" htmlFor="movie-title">
                Enter a movie title
              </label>

              <div className="control">
                <input
                  type="text"
                  id="movie-title"
                  placeholder="Movie title here"
                  className={classNames('input', {
                    'error-text': error || !isValidInput,
                  })}
                  value={query}
                  onChange={handleChangeValue}
                />
              </div>

              {(error || !isValidInput) && (
                <div>
                  <p className="error-text">
                    {error
                      ? 'Can\'t find a movie with such a title'
                      : 'Incorrect input'}
                  </p>
                  {error && (
                    <img className="img--find" src={not_find} alt="not_find" />
                  )}
                </div>
              )}
            </div>
          </>
        )}

        <div className="field">
          <div className="control">
            {!completed ? (
              <button
                type="submit"
                className={classNames('button button--width', {
                  'is-loading': loader,
                })}
                disabled={!query || !isValidInput}
              >
                {movie ? 'Complete' : 'Continue'}
              </button>
            ) : (
              <Link to="/">
                <button className="button button--width is-success">
                  Complete
                </button>
              </Link>
            )}
          </div>

          {movie && <div className="control"></div>}
        </div>
      </form>
    </>
  );
};
