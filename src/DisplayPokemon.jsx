import loading from './resources/loading.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './displayPokemon.css';

import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPickedPokemon } from './infoPokemonSlice';

export const DisplayPokemon = (props) => {
    const [pokemon, setPokemon] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        const pillarDatos = async () =>{
            const respuesta = await fetch(props.apiUrl);
            const poke = await respuesta.json();
            setPokemon(poke);
        }   
    
        pillarDatos();
      },[props.apiUrl]);
    
    //Event Handler
    const handlerSetPickedPokemon = () => {
        dispatch(setPickedPokemon(pokemon));
    }

    if(pokemon){
        return(
            <Row className="displayer" onClick = {handlerSetPickedPokemon}>
                <Col>
                <Row>
                    <figure>
                        <img className="spritesPokemon"
                            src={pokemon.sprites.front_default} 
                            alt={`Pokemon ${pokemon.name}`}
                        />
                        <figcaption>Id: #{pokemon.id}</figcaption>
                    </figure>
                </Row>
                <Row>
                    <p className="nombrePokemon"><strong>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</strong></p>
                </Row>
                <Row>    
                    {pokemon.types.map((tipo) =>{
                        const tamCol = pokemon.types.length === 2 ? 6:12
                        return( <Col key={`${pokemon.name}_tipo_${tipo.type.name}`} xs={tamCol}><p className={`tipo ${tipo.type.name}`}>{tipo.type.name[0].toUpperCase() + tipo.type.name.slice(1)}</p></Col>);
                    })}
                </Row>
                </Col>
            </Row>
        );
    }
    return(
        <div>
            <img src={loading} 
                alt="Cargando pokemon" 
            />
        </div>
    );
}