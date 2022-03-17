import { useDispatch, useSelector } from "react-redux";
import { nextPage, previousPage, selectPageIndex, setPage } from "./pageBarSlice";

import { nPokemonToFecth, pokemonPerPage} from "./globalVar";
import "./pageBar.css"

const lastIndex = Math.ceil(nPokemonToFecth/pokemonPerPage);
const firstIndex = 1;

export const PageBar = () => {
    const dispatch = useDispatch();
    const pageIndex = useSelector(selectPageIndex);

    const handlerNextPage = () => {
        if(pageIndex !== lastIndex){
            dispatch(nextPage());
        }
    };

    const handlerPreviousPage = () => {
        if(pageIndex !== firstIndex){
            dispatch(previousPage());
        }
    };

    const handlerSetPage = (event) => {
        let id = event.target.innerHTML;
        if(id === "First")
            id=firstIndex;
        else if(id === "Last")
            id=lastIndex;
        else
            id = parseInt(id, 10);
        
        if(id !== pageIndex)
            dispatch(setPage(id));

    };

    if(pageIndex <= lastIndex-5){
        return(
            <ul className="pageBar">
                <li onClick={handlerSetPage}>First</li>
                <li onClick={handlerPreviousPage}>Prev</li>
                <li onClick={handlerSetPage}><b>{pageIndex}</b></li>
                <li onClick={handlerSetPage}>{pageIndex+1}</li>
                <li onClick={handlerSetPage}>{pageIndex+2}</li>
                <li onClick={handlerSetPage}>{pageIndex+3}</li>
                <li onClick={handlerSetPage}>{pageIndex+4}</li>
                <li onClick={handlerNextPage}>Next</li>
                <li onClick={handlerSetPage}>Last</li>
            </ul>
        );
    }

    return(
        <ul className="pageBar">
                <li onClick={handlerSetPage}>First</li>
                <li onClick={handlerPreviousPage}>Prev</li>
                <li onClick={handlerSetPage}>{pageIndex === lastIndex-4 ? <b>{lastIndex-4 }</b>:lastIndex-4}</li>
                <li onClick={handlerSetPage}>{pageIndex === lastIndex-3 ? <b>{lastIndex-3}</b>:lastIndex-3}</li>
                <li onClick={handlerSetPage}>{pageIndex === lastIndex-2 ? <b>{lastIndex-2}</b>:lastIndex-2}</li>
                <li onClick={handlerSetPage}>{pageIndex === lastIndex-1 ? <b>{lastIndex-1}</b>:lastIndex-1}</li>
                <li onClick={handlerSetPage}>{pageIndex === lastIndex ? <b>{lastIndex}</b>:lastIndex}</li>
                <li onClick={handlerNextPage}>Next</li>
                <li onClick={handlerSetPage}>Last</li>
        </ul>
    );
};