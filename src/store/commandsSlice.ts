import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Command {
  original: string;
  optimized: string;
  date: string;
  time: string;
  samplesBefore: { x: number; y: number }[];
  samplesAfter: { x: number; y: number }[];
}

interface CommandsState {
  history: Command[];
}

const initialState: CommandsState = {
  history: [],
};

const commandsSlice = createSlice({
  name: 'commands',
  initialState,
  reducers: {
    addCommand: (state, action: PayloadAction<Command>) => {
      state.history.push(action.payload);
    },
  },
});

export const { addCommand } = commandsSlice.actions;
export default commandsSlice.reducer;