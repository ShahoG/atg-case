import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Table: React.FC = () => {
  const { data, loading, error, gameDetails } = useSelector((state: RootState) => state.dropdown);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          {/* Update headers based on the actual data structure */}
          <th>Race name</th>
          <th>Race number</th>
          <th>Start Time</th>
          {/* Add more headers as needed */}
        </tr>
      </thead>
      <tbody>
        {gameDetails && (gameDetails.map((item, index) => (
          <tr key={index}>
            {/* Update cells based on the actual data structure */}
            <td>{item.name}</td>
            <td>{item.number}</td>
            <td>{item.scheduledStartTime}</td>
            {/* Add more cells as needed */}
          </tr>
        )))}
      </tbody>
    </table>
  );
};

export default Table;
