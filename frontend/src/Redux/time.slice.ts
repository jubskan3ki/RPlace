import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface timeState {
    value: number;
}

const initialState: timeState = {
    value: 0,
};

const timeSlice = createSlice({
    name: 'time',
    initialState,
    reducers: {
        timeSend: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const { timeSend } = timeSlice.actions;

export default timeSlice.reducer;
