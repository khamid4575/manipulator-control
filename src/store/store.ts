import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import commandsReducer from './commandsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    commands: commandsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;