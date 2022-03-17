import { createSlice } from "@reduxjs/toolkit";

//Actions and reducer
const searchBarSlice = createSlice({
    name: "searchBar",
    initialState: "",
    reducers: {
      setSearchText: (state, action) => {
          return action.payload;
      },
      clearSearchText: () => {
          return "";
      }
    }
});

//Selector function to get from the store the term of search
export const selectSearchText = (state) => state.searchText;

//Export possible actions
export const {setSearchText, clearSearchText} = searchBarSlice.actions

//Export reducer
export default searchBarSlice.reducer