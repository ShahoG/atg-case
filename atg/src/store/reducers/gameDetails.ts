import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { fetchGameDetailsData } from '../thunks';
import { State } from '../interfaces';

export const gameDetailsCases = (builder: ActionReducerMapBuilder<State>) => {
  builder
      .addCase(fetchGameDetailsData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.gameDetailsData = []; // Clear previous game details when loading a new one
      })
      .addCase(fetchGameDetailsData.fulfilled, (state, action: PayloadAction<any>) => {
        state.gameDetailsData = action.payload; // Store the game details fetched from the API
        state.loading = false;
      })
      .addCase(fetchGameDetailsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch game details';
      });
};


