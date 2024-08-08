import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { setShowHorseDetailsIndex } from '../../store/betyTypeSlice';
import { Race } from '../../store/interfaces';
import './Table.css';

const Table: React.FC = () => {
  const { betData, loading, error, gameDetailsData, showHorseDetailsIndex } = useSelector((state: RootState) => state.betTypes);
  const dispatch = useDispatch<AppDispatch>();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!betData || betData.length === 0) {
    return <div>No data available.</div>;
  }

  const handleHorseClick = (index: string) => {
    showHorseDetailsIndex === index ? 
      dispatch(setShowHorseDetailsIndex('')) :
      dispatch(setShowHorseDetailsIndex(index));
  };

  return (

   <div className='cardGrid'>
      {gameDetailsData.map((item) => (
        <div
          key={item.id}
          className='card'
        >
          <h3>
            <a href="#">
              {item.name}
            </a>
          </h3>
          
          <table>
            <thead>
              <tr>
                <th>Horse name</th>
                <th>Start number</th>
                <th>Driver name</th>
              </tr>
            </thead>
            <tbody>
              {(item.starts.map((item: Race, index: number) => {
                const secondIndex = `${item.id}-${index}`;
                return (
                  <>
                    <tr key={index} onClick={() => handleHorseClick(secondIndex)} className='horseRow'>
                      <td>{item.horse.name}</td>
                      <td>{item.number}</td>
                      <td>{item.driver.firstName} {item.driver.lastName}</td>
                    </tr>
                    {showHorseDetailsIndex === secondIndex && (
                    <>
                      <tr key={secondIndex} className='selectedRow'>
                        <td>FATHER: {item.horse.pedigree.father.name}<br></br>TRAINER: {item.horse.trainer.firstName} {item.horse.trainer.lastName} </td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td> {/* Empty row for visibility */}
                      </tr>
                    </>
                  )}
                  </>
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
