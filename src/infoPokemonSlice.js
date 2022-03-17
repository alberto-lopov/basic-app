import { createSlice } from "@reduxjs/toolkit";

const infoPokemonSlice = createSlice({
    name: "infoPokemon",
    initialState: null,
    reducers: {
        setPickedPokemon: (state, action) => {
            return action.payload;
        },
        clearPickedPokemon: () => {
            return null;
        }
    }
});

//Selector
export const selectPickedPokemon = (state) => state.pickedPokemon;

//Export possible actions
export const {setPickedPokemon, clearPickedPokemon} = infoPokemonSlice.actions;

//Export reducer
export default infoPokemonSlice.reducer;