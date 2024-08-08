import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { betTypesCases } from './reducers/betTypes';
import { gameDetailsCases } from './reducers/gameDetails';
import { State } from './interfaces';


const initialState: State = {
  selectedBetType: '',
  betData: [],
  gameDetailsData: [],
  showHorseDetailsIndex: '',
  loading: false,
  error: null,
};

const betTypeSlice = createSlice({
  name: 'betType',
  initialState,
  reducers: {
    setSelectedValue(state, action: PayloadAction<string>) {
      state.selectedBetType = action.payload;
    },
    setShowHorseDetailsIndex(state, action: PayloadAction<string>) {
      state.showHorseDetailsIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    betTypesCases(builder);
    gameDetailsCases(builder);
    // Add more reducers here
  },
});

export const { setSelectedValue, setShowHorseDetailsIndex } = betTypeSlice.actions;

export default betTypeSlice.reducer;
