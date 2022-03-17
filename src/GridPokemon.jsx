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


export const GridPokemon = (props) => {
    const listFiltered = useSelector(selectFilteredPokemons);
    const pickedPokemon = useSelector(selectPickedPokemon);
    const listAllPokemon = useSelector(selectAllPokemons);
    const searchText = useSelector(selectSearchText);
    const pageIndex = useSelector(selectPageIndex);
    const dispatch = useDispatch();

    //const [listaCargada, setListaCargada] = useState();
    useEffect( () => {
        const pillarDatos = async () =>{
            const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${props.limit}&offset=${props.offset}`
            const respuesta = await fetch(apiUrl);
            const lista = await respuesta.json();
            dispatch(loadPokemons(lista.results));
        }   
    
        pillarDatos();
    }, [props.limit, props.offset, dispatch]);

    if(listAllPokemon){
        const listToShow = listAllPokemon.slice((pokemonPerPage*(pageIndex-1)), (pokemonPerPage*(pageIndex-1))+pokemonPerPage)
        return (
            <Container  className='gridPokemon'>
                {pickedPokemon && <InfoPokemon/>}
                <Row>
                {(searchText !== "") ?
                    listFiltered.map((direccion, i) => { 
                        return <Col key={direccion.name} className='showPokemon' xs={6} md={3} xl={2}><DisplayPokemon apiUrl={direccion.url}/></Col>
                    })
                    :
                    listToShow.map((direccion, i) => { 
                        return <Col key={direccion.name} className='showPokemon' xs={6} md={3} xl={2}><DisplayPokemon apiUrl={direccion.url}/></Col>
                    })
                }
                </Row>
            </Container>
        );
    }
    
    return (
        <Container>
            <Row><img src={loading} alt="Cargando lista pokemon" /></Row>
        </Container>
    );
}


GridPokemon.defaultProps = {
    limit: 6,
    offset: 0
};