import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { fetchBetTypeData } from '../thunks';
import { State } from '../interfaces';

export const betTypesCases = (builder: ActionReducerMapBuilder<State>) => {
  builder
      .addCase(fetchBetTypeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBetTypeData.fulfilled, (state, action: PayloadAction<any>) => {
        state.betData = action.payload;
        state.loading = false;
      })
      .addCase(fetchBetTypeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch data';
      });
};


