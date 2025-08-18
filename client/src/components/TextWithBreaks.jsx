import React, { Fragment } from 'react';

export default function TextWithBreaks({ text }) {
  return (
    <>
      {text.split('\n').map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i < text.split('\n').length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );
}
