import { combineReducers, configureStore } from '@reduxjs/toolkit';
import shortenerSlice from './reducer/shortenerSlice';

const rootReducer = combineReducers({
  shortener: shortenerSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
