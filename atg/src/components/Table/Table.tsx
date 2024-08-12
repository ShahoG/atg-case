import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { setShowHorseDetailsIndex } from '../../store/betyTypeSlice';
import { Race } from '../../store/interfaces';
import './Table.css';

const Table: React.FC = () => {
  const { loading, error, gameDetailsData, showHorseDetailsIndex } = useSelector((state: RootState) => state.betTypes);
  const dispatch = useDispatch<AppDispatch>();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!gameDetailsData || gameDetailsData.length === 0) {
    return <div>No data available for game</div>;
  }

  const handleHorseClick = (index: string) => {
    showHorseDetailsIndex === index ? 
      dispatch(setShowHorseDetailsIndex('')) :
      dispatch(setShowHorseDetailsIndex(index));
  };

  return (

   <div className='display-flex grid gap-6'>
    <h3 className='text-xl font-bold mt-8'>Game Races</h3>
      {gameDetailsData.map((item) => (
        <div
          key={item.id}
          className='max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl'
        >
          <h4 className='text-xl font-bold my-4'>
            {item.name}
          </h4>
          
          <table className='font-normal text-gray-700 min-w-full text-left '>
            <thead>
              <tr>
                <th>Horse name</th>
                <th className='p-3'>Start number</th>
                <th>Driver name</th>
              </tr>
            </thead>
            <tbody>
              {(item.starts.map((item: Race, index: number) => {
                const secondIndex = `${item.id}-${index}`;
                return (
                  <React.Fragment key={index} >
                    <tr onClick={() => handleHorseClick(secondIndex)} className='cursor-pointer'>
                      <td>{item.horse.name}</td>
                      <td className='p-3'>{item.number}</td>
                      <td>{item.driver.firstName} {item.driver.lastName}</td>
                    </tr>
                    {showHorseDetailsIndex === secondIndex && (
                    <>
                      <tr key={secondIndex} className='selectedRow'>
                        <td>
                          FATHER:<br />{item.horse.pedigree.father.name}<br />
                          TRAINER:<br />{item.horse.trainer.firstName} {item.horse.trainer.lastName}
                        </td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>{/* Empty row for visibility */}
                      </tr>
                    </>
                  )}
                  </React.Fragment>
                );
              }))}
            </tbody>
          </table>
        </div>
      ))}
      </div>



  );
};

export default Table;
