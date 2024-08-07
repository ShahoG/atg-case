// src/components/Links.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchGameDetails } from '../store/dropdownSlice';
import Table from './Table';

const Links: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, gameDetails } = useSelector((state: RootState) => state.dropdown);

  const handleLinkClick = (gameId: string) => {
    dispatch(fetchGameDetails(gameId));
  };

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
    <div>
      <h2>Available Games</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <a href="#" onClick={() => handleLinkClick(item.id)}>
              ({item.id})
            </a>
          </li>
        ))}
      </ul>
      {gameDetails.length > 0 && (
        <div>
          <h3>Game Details</h3>
          <Table  />
        </div>
      )}
    </div>
  );
};

export default Links;
