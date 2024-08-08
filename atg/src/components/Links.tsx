// src/components/Links.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchGameDetailsData } from '../store/thunks';
import Table from './Table/Table';

const Links: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { betData, loading, error, gameDetailsData } = useSelector((state: RootState) => state.betTypes);

  const handleLinkClick = (gameId: string) => {
    dispatch(fetchGameDetailsData(gameId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!betData || betData.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <div>
      <h2>Available Games</h2>
      <ul>
        {betData.map((item) => (
          <li key={item.id}>
            <a href="#" onClick={() => handleLinkClick(item.id)}>
              {item.id}
            </a>
          </li>
        ))}
      </ul>
      {gameDetailsData.length > 0 && (
        <div>
          <h3>Game Details</h3>
          <Table  />
        </div>
      )}
    </div>
  );
};

export default Links;
