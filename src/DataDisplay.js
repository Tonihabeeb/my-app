import React from 'react';

const DataDisplay = ({ data }) => {
  return (
    <div>
      <h2>Data Display</h2>
      {data.length === 0 ? (
        <p>No data to display.</p>
      ) : (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DataDisplay;