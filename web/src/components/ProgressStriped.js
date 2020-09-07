import React from 'react';

const ProgressStriped = ({ valueNow, valueMax, valueMin }) => {
  return (
    <div className='progress mb-2'>
      <div
        className='progress-bar progress-bar-striped bg-info'
        role='progressbar'
        style={{ width: `${valueNow}%` }}
        aria-valuenow={valueNow}
        aria-valuemin={valueMin}
        aria-valuemax={valueMax}
      />
    </div>
  );
};

export default ProgressStriped;