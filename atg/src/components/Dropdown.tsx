import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch  } from '../store/store';
import { setSelectedValue, fetchData } from '../store/dropdownSlice';

interface DropdownProps {
  options: { value: string; label: string }[];
  label?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, label }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedValue = useSelector((state: RootState) => state.dropdown.selectedValue);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    dispatch(setSelectedValue(value));
    if (value) {
      dispatch(fetchData(value));
    }
  };

  return (
    <div>
      {label && <label htmlFor="dropdown">{label}</label>}
      <select id="dropdown" value={selectedValue} onChange={handleSelectChange}>
        <option value="">Select an option</option>
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
