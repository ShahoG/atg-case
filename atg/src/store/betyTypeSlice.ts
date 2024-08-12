import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { betTypesCases } from './reducers/betTypes';
import { gameDetailsCases } from './reducers/gameDetails';
import { State } from './interfaces';


const initialState: State = {
  selectedBetType: '',
  betData: {
    id: '',
    upcoming: [],
    results: [],
  },
  gameDetailsData: [],
  showHorseDetailsIndex: '',
  gameSelected: '',
  loading: false,
  error: null,
};

const betTypeSlice = createSlice({
  name: 'betType',
  initialState,
  reducers: {
    setSelectedValue(state, action: PayloadAction<string>) {
      state.betData = {
        id: '',
        upcoming: [],
        results: [],
      };
      state.gameDetailsData = [];
      state.selectedBetType = action.payload;
    },
    setShowHorseDetailsIndex(state, action: PayloadAction<string>) {
      state.showHorseDetailsIndex = action.payload;
    },
    setGameSelected(state, action: PayloadAction<string>) {
      state.gameSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    betTypesCases(builder);
    gameDetailsCases(builder);
    // Add more reducers here
  },
});

export const { setSelectedValue, setShowHorseDetailsIndex, setGameSelected } = betTypeSlice.actions;

export default betTypeSlice.reducer;
