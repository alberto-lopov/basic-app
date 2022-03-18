import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { clearPickedPokemon, selectPickedPokemon } from "./infoPokemonSlice";
import  './infoPokemon.css';
import loading from './resources/loading.png'

const regionPokedex = 0; //Diamond Version Pokedex

export const InfoPokemon = () => {
    const pickedPokemon = useSelector(selectPickedPokemon);
    const [pokedexEntry, setPokedexEntry] = useState();
    const dispatch = useDispatch();
    
    const handlerClearPickedPokemon = () =>{
        dispatch(clearPickedPokemon());
    };

    useEffect(() => {
        const fecthData = async () =>{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pickedPokemon.id}/`);
            const data = await response.json();
            setPokedexEntry(data);
        }   
    
        fecthData();
      },[pickedPokemon]);
    
    if(pokedexEntry){
        return (
            <Container className="shadowBackground" fluid>
                <Row className="displayerInfoPokemon">
                    <Col>
                    <Row className="rowCloseButton">
                        <button className="closeInfoPokemon"
                            onClick={handlerClearPickedPokemon}>X</button>
                    </Row>
                    <Row className="rowSprites">
                        <Col xs={4}>
                        <img className="spritesPokemon"
                            src={pickedPokemon.sprites.front_default} 
                            alt={`Pokemon front ${pickedPokemon.name}`}/>
                        </Col>
                        <Col xs={4}>
                        <img className="spritesPokemon"
                            src={pickedPokemon.sprites.front_shiny} 
                            alt={`Pokemon back ${pickedPokemon.name}`}/>
                        </Col>
                    </Row>
                    <Row className = "rowTypes">
                        {pickedPokemon.types.map((typeId) =>{
                            const tamCol = pickedPokemon.types.length === 2 ? 4:6
                            return( <Col key={`${pickedPokemon.name}_type_${typeId.type.name}`} xs={tamCol}><p className={`type ${typeId.type.name}`}>{typeId.type.name[0].toUpperCase() + typeId.type.name.slice(1)}</p></Col>);
                        })}
                    </Row>
                    <Row><p className="entryText">"{pokedexEntry.flavor_text_entries[regionPokedex].flavor_text}"</p></Row>
                    <Row>
                        <Col>
                            <Row><p><b>Base Stats</b></p></Row>
                            <Row>
                            {pickedPokemon.stats.map((stat) =>{
                                const statName = stat.stat.name.toUpperCase();
                                const statNum = stat.base_stat;
                                const statKey = `${pickedPokemon.name}_stat_${statName}`;
                                return(<Col key={statKey} xs={12}><p>{statName}: {statNum}</p></Col>);
                            })} 
                            </Row>
                        </Col> 
                        <Col>
                            <Row><p><b>{pickedPokemon.name[0].toUpperCase() + pickedPokemon.name.slice(1)}</b></p></Row>
                            <Row><p>Id: #{pickedPokemon.id}</p></Row>
                        </Col>
                    </Row>
                    </Col>
                </Row>
            </Container>
        );
    }

    return( 
    <div>
        <img src={loading} 
            alt="Loading info about pokemon"
        />
    </div>);
};