import React from 'react';
import './Line.scss';

export default ({ lineNumber }) => {
  return <div className={`font-all line ${lineNumber}`} />;
};
