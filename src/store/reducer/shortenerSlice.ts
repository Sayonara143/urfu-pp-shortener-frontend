import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IShortener {
  longUrl: string;
  shortUrl: string;
  popularity: number;
  isLimitedInTime: boolean;
  isOff: boolean;
  expireAt?: Date;
}

interface IInitialState {
  shortUrl: string;
  shortener: IShortener | null;
  error: any;
}

const initialState: IInitialState = {
  shortUrl: '',
  shortener: null,
  error: null,
};

const shortenerSlice = createSlice({
  name: 'shortener',
  initialState,
  reducers: {
    setShortUrl(state, action: PayloadAction<string>) {
      state.shortUrl = action.payload;
    },
    setShortener(state, action: PayloadAction<IShortener>) {
      state.shortener = action.payload;
    },
    setError(state, action: PayloadAction<any>) {
      state.error = action.payload;
    },
  },
});

export default shortenerSlice.reducer;
export const shortenerActions = shortenerSlice.actions;
