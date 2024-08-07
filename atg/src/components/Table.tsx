import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface Race {
  driver: {
    firstName: string;
    lastName: string;
  };
  horse: {
    name: string;
  };
  number: number;
  }

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

   <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {gameDetails.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            padding: "16px",
            width: "300px",
            margin: "10px",
          }}
        >
          <h3>
            <a href="#">
              {item.name}
            </a>
          </h3>
          
          <table>
            <thead>
              <tr>
                {/* Update headers based on the actual data structure */}
                <th>Horse name</th>
                <th>Start number</th>
                <th>Driver name</th>
                {/* Add more headers as needed */}
              </tr>
            </thead>
            <tbody>
              {(item.starts.map((item: Race, index: number) => (
                <tr key={index}>
                  {/* Update cells based on the actual data structure */}
                  <td>{item.horse.name}</td>
                  <td>{item.number}</td>
                  <td>{item.driver.firstName} {item.driver.lastName}</td>
                  {/* Add more cells as needed */}
                </tr>
              )))}
            </tbody>
          </table>

          {/* Optionally include more detailed information or actions here */}
        </div>
      ))}
      </div>



  );
};

export default Table;
