import { useSelector, useDispatch } from "react-redux";
import { clearSearchText, selectSearchText, setSearchText } from "./searchBarSlice";

import "./searchBar.css";
import lupa from "./resources/lupaSearchBar.png";

export const SearchBar = () => {
    //State of the store
    const searchText = useSelector(selectSearchText);

    //Dispatch store
    const dispatch = useDispatch();

    //Event handler functions
    const handlerSetSearchText = (event) => {
        const text = event.target.value;
        dispatch(setSearchText(text));    
    }

    const handlerClearSearchText = () => {
        dispatch(clearSearchText());
    }
    
    return (
        <div className = "searchBarContainer">
            <img className="imgSearchBar" 
                alt="Magnifying glass"
                src={lupa} />
            <input className="searchInput"
                type = "text"
                value = {searchText}
                onChange = {handlerSetSearchText}
                placeholder = "Search Pokemons" />
            {searchText.length > 0 && (
                <button className="crossClearInput"
                onClick = {handlerClearSearchText}
                type="button">
                    X
                </button>
            )}
        </div>
    );
}