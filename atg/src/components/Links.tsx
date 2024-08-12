// src/components/Links.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchGameDetailsData } from '../store/thunks';
import { setGameSelected } from '../store/betyTypeSlice';
import Table, { formatTimestamp } from './Table/Table';

const Links: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { betData, loading, error, selectedBetType } = useSelector((state: RootState) => state.betTypes);

  const handleLinkClick = (gameId: string) => {
    dispatch(fetchGameDetailsData(gameId));
    dispatch(setGameSelected(gameId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  if (
      (
        (!betData.upcoming || betData.upcoming.length === 0 )
        &&
        (!betData.results || betData.results.length === 0 )
      ) 
      && selectedBetType.length > 0) {
    return <div>No data available for bet type</div>;
  }

  return (
    <>
      {betData.upcoming?.length > 0 && 
        <div className='max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl'>
        <h2 className='text-2xl font-bold my-4'>Available upcoming games</h2>
          <ul>
            {betData.upcoming.map((item) => (
              <li key={item.id}>
                <a onClick={() => handleLinkClick(item.id)}>
                  {item.id} - Start: {formatTimestamp(item.startTime)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      }

      {betData.results?.length > 0 && 
        <div className='max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl'>
        <h2 className='text-2xl font-bold my-4'>Previous results</h2>
          <ul>
            {betData.results.map((item) => (
              <li key={item.id}>
                <a onClick={() => handleLinkClick(item.id)}>
                  {item.id} - Start: {formatTimestamp (item.startTime)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      }
      <Table  />
    </> 
  );


  
  
};

export default Links;
