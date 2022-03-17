import {createSlice} from '@reduxjs/toolkit';

import { selectSearchText } from './searchBarSlice';

//Actions and reducer
const gridPokemonSlice = createSlice({
    name: "gridPokemon",
    initialState: null,
    reducers: {
        loadPokemons: (state, action) => {
            return action.payload;
        }
    }
});

//Selector All pokemons
export const selectAllPokemons = (state) => {
    return state.allPokemons;
}

//Selector to get pokemons filtered
export const selectFilteredPokemons = (state) => {
    const allPokemons = selectAllPokemons(state);
    const searchText = selectSearchText(state);

    if(allPokemons){
        return allPokemons.filter((poke) => 
            poke.name.toLowerCase().includes(searchText.toLowerCase())
        );
    }
    return allPokemons;
};

//Export actions
export const {loadPokemons} = gridPokemonSlice.actions;

//Export reducer
export default gridPokemonSlice.reducer;



