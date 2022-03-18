import { useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { pokemonPerPage } from './globalVar';
import loading from './resources/loading.png';
import './gridPokemon.css';
import { DisplayPokemon } from './DisplayPokemon';
import { InfoPokemon } from './InfoPokemon';

import { loadPokemons, selectAllPokemons, selectFilteredPokemons } from './gridPokemonSlice';
import { selectPickedPokemon } from './infoPokemonSlice';
import { selectPageIndex } from './pageBarSlice';
import { selectSearchText } from './searchBarSlice';
import { nPokemonToFecth, offsetPokemon } from './globalVar';


export const GridPokemon = () => {
    const listFiltered = useSelector(selectFilteredPokemons);
    const pickedPokemon = useSelector(selectPickedPokemon);
    const listAllPokemon = useSelector(selectAllPokemons);
    const searchText = useSelector(selectSearchText);
    const pageIndex = useSelector(selectPageIndex);
    const dispatch = useDispatch();

    useEffect( () => {
        const fecthData = async () =>{
            const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${nPokemonToFecth}&offset=${offsetPokemon}`
            const response = await fetch(apiUrl);
            const list = await response.json();
            dispatch(loadPokemons(list.results));
        }   
    
        fecthData();
    }, [dispatch]);

    if(listAllPokemon){
        const listToShow = listAllPokemon.slice((pokemonPerPage*(pageIndex-1)), (pokemonPerPage*(pageIndex-1))+pokemonPerPage)
        return (
            <Container  className='gridPokemon'>
                {pickedPokemon && <InfoPokemon/>}
                <Row>
                {(searchText !== "") ?
                    listFiltered.map((address, i) => { 
                        return <Col key={address.name} className='showPokemon' xs={6} md={3} xl={2}><DisplayPokemon apiUrl={address.url}/></Col>
                    })
                    :
                    listToShow.map((address, i) => { 
                        return <Col key={address.name} className='showPokemon' xs={6} md={3} xl={2}><DisplayPokemon apiUrl={address.url}/></Col>
                    })
                }
                </Row>
            </Container>
        );
    }
    
    return (
        <Container>
            <Row><img src={loading} alt="Loading list pokemon" /></Row>
        </Container>
    );
}