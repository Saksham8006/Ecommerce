import { createSlice } from '@reduxjs/toolkit';


interface brandState {
    data: any[];

}
export const brandSlice = createSlice({
    name: 'brands',
    initialState: <brandState>{
        data: [],
    },
    reducers: {
        setBrandDataForOthers(state, action) {
            state.data = action.payload;

        },

    }
});

export const { setBrandDataForOthers } = brandSlice.actions;
export default brandSlice.reducer