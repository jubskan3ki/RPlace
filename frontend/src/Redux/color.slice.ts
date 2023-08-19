import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ColorState {
    value: string;
}

const initialState: ColorState = {
    value: "#FFFFFF",
};

const colorSlice = createSlice({
    name: 'color',
    initialState,
    reducers: {
        colorSend: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { colorSend } = colorSlice.actions;

export default colorSlice.reducer;
