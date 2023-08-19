import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BonusState {
    value: {
        bombe: boolean,
        ligne: boolean,
    };
}

const initialState: BonusState = {
    value: {
        bombe: false,
        ligne: false,
    },
};

const bonusSlice = createSlice({
    name: 'bonus',
    initialState,
    reducers: {
        bonusSend: (state, action: PayloadAction<BonusState['value']>) => {
            state.value.bombe = action.payload.bombe;
            state.value.ligne = action.payload.ligne;
        },
    },
});

export const { bonusSend } = bonusSlice.actions;

export default bonusSlice.reducer;
