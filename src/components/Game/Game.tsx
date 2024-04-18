import React, { useEffect } from 'react';
import { Questions } from '../../types/Questions';
import './Game.css';
import { Link } from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar';

type Props = {
  question: Questions;
  selectedVariant: number;
  onClickVariant: (index: number) => void;
  onNextQuestion: () => void;
};

export const Game: React.FC<Props> = ({
  question,
  selectedVariant,
  onClickVariant,
  onNextQuestion,
}) => {
  const isContinueDisabled = selectedVariant === -1;

  useEffect(() => {
    if (selectedVariant !== -1) {
      localStorage.setItem('selectedVariantText', question.variants[selectedVariant].text);
    }
  }, [selectedVariant, question.variants]);
  
  return (
    <div>
      <div className="game">
        <ProgressBar percentage={10} />
        <h1 className="title">{question.title}</h1>
        <ul className="game__list">
          {question.variants.map((variant, index) => (
            <li
              className="game__item"
              key={variant.text}
              onClick={() => onClickVariant(index)}
            >
              <div className="game__item--right">
                <img className="image" src={variant.image} />

                <p className="text">{variant.text}</p>
              </div>
              <div className="game__item--left">
                <span
                  className={`variant-marker ${
                    selectedVariant === index ? 'selected' : 'unselected'
                  }`}
                ></span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="btn-container">
        <Link
          to="/search-movie"
          className={`button ${isContinueDisabled ? 'disabled' : ''}`}
          onClick={
            isContinueDisabled
              ? (event) => event.preventDefault()
              : onNextQuestion
          }
        >
          Continue
        </Link>
      </div>
    </div>
  );
};
