import React from 'react';
import './ProgressBar.css';

type Props = {
  percentage: number;
};

const ProgressBar: React.FC<Props> = ({ percentage }) => {
  return (
    <div className="progress">
      <div style={{ width: `${percentage}%` }} className="progress__inner">
        <p className='progress__text'>{percentage}%</p>
      </div>
    </div>
  );
};

export default ProgressBar;
