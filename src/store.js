import { configureStore } from "@reduxjs/toolkit";
import searchBarReducer from "./searchBarSlice";
import gridPokemonReducer from "./gridPokemonSlice";
import infoPokemonReducer from "./infoPokemonSlice";
import pageBarReducer from "./pageBarSlice";

const store = configureStore({
    reducer: {
        pageBarIndex: pageBarReducer,
        pickedPokemon: infoPokemonReducer,
        searchText: searchBarReducer,
        allPokemons: gridPokemonReducer
    }
});

export default store;