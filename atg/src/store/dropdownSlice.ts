import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface DropdownState {
  selectedValue: string;
  data: any[]; // You can define a more specific type if you know the API response structure
  loading: boolean;
  error: string | null;
  gameDetails: any[]; 
  showHorseDetailsIndex: string;// Store details of a specific game
}

// Async thunk for fetching data
export const fetchData = createAsyncThunk(
  'dropdown/fetchData',
  async (betType: string) => {
    const response = await fetch(`https://www.atg.se/services/racinginfo/v1/api/products/${betType}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.upcoming;
  }
);

export const fetchGameDetails = createAsyncThunk(
  'dropdown/fetchGameDetails',
  async (gameId: string) => {
    const response = await fetch(`https://www.atg.se/services/racinginfo/v1/api/games/${gameId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch game details');
    }
    const data = await response.json();
    console.log(data.races);
    return data.races;
  }
);

const initialState: DropdownState = {
  selectedValue: '',
  data: [],
  loading: false,
  error: null,
  gameDetails: [],
  showHorseDetailsIndex: '',
};

const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState,
  reducers: {
    setSelectedValue(state, action: PayloadAction<string>) {
      state.selectedValue = action.payload;
    },
    setShowHorseDetailsIndex(state, action: PayloadAction<string>) {
      state.showHorseDetailsIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      })
      .addCase(fetchGameDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.gameDetails = []; // Clear previous game details when loading a new one
      })
      .addCase(fetchGameDetails.fulfilled, (state, action: PayloadAction<any>) => {
        state.gameDetails = action.payload; // Store the game details fetched from the API
        state.loading = false;
      })
      .addCase(fetchGameDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch game details';
      });
  },
});

export const { setSelectedValue, setShowHorseDetailsIndex } = dropdownSlice.actions;

export default dropdownSlice.reducer;
