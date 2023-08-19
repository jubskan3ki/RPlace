import { configureStore } from '@reduxjs/toolkit'
import bonusReducer from './bonus.slice';
import colorReducer from './color.slice'; // Assurez-vous que le chemin est correct.

const store = configureStore({
  reducer: {
    bonus: bonusReducer,
    color: colorReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
