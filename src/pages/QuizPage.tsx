import React, { useState } from 'react';
import questions from '../data/questions.json';

import { Questions } from '../types/Questions';
import { Game } from '../components/Game/Game';

const QuizPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(-1);
  const question: Questions = questions[step];

  const onNextQuestion  = () => {
    setStep(step + 1);
    setSelectedVariant(-1);
  };

  const onClickVariant = (index: number) => {
    setSelectedVariant(index);
  };

  return (
    <div className="QuizPage">
      <Game
        question={question}
        selectedVariant={selectedVariant}
        onClickVariant={onClickVariant}
        onNextQuestion={onNextQuestion}
      />
    </div>
  );
};

export default QuizPage;
