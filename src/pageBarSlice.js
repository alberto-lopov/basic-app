import { createSlice } from "@reduxjs/toolkit";


const pageBarSlice = createSlice({
    name: "pageBar",
    initialState: 1,
    reducers: {
        nextPage: (state, action) => {
            return state + 1;
        },

        previousPage: (state, action) => {
            return state - 1;
        },

        setPage: (state, action) => {
            return action.payload;
        }
    }
});

//Selector
export const selectPageIndex = (state) => state.pageBarIndex;

//Export actions
export const {nextPage, previousPage, setPage} = pageBarSlice.actions;

//Export reducer
export default pageBarSlice.reducer;