import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBetTypeData = createAsyncThunk(
  'betType/fetchBetTypeData',
  async (betType: string) => {
    const response = await fetch(`https://www.atg.se/services/racinginfo/v1/api/products/${betType}`);
    if (!response.ok) {
      throw new Error('Failed to fetch bet type data');
    }
    const data = await response.json();
    return data.upcoming;
  }
);

export const fetchGameDetailsData = createAsyncThunk(
  'betType/fetchGameDetailsData',
  async (gameId: string) => {
    const response = await fetch(`https://www.atg.se/services/racinginfo/v1/api/games/${gameId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch game details data');
    }
    const data = await response.json();
    return data.races;
  }
);