import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch  } from '../store/store';
import { setSelectedValue, setGameSelected } from '../store/betyTypeSlice';
import { fetchBetTypeData } from '../store/thunks';

interface DropdownProps {
  options: { value: string; label: string }[];
  label?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, label }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedBetType = useSelector((state: RootState) => state.betTypes.selectedBetType);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    dispatch(setGameSelected(''));
    dispatch(setSelectedValue(value));
    if (value) {
      dispatch(fetchBetTypeData(value));
    }
  };

  return (
    <div>
      {label && <label htmlFor="dropdown">{label}</label>}
      <select id="dropdown" value={selectedBetType} onChange={handleSelectChange} className='dropdown'>
        <option value="">Select a bet type</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
