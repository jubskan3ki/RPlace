import { configureStore } from '@reduxjs/toolkit'
import bonusReducer from './bonus.slice';
import colorReducer from './color.slice';
import timeReducer from './time.slice';

const store = configureStore({
  reducer: {
    bonus: bonusReducer,
    color: colorReducer,
    time: timeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
