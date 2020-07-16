import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import pokedex from '../../utils/poke-api';

export default function DetailPage(props) {
	const [pokemon, setPokemon] = useState({});

	useEffect(() => {
    function fetchData() {
      pokedex.getPokemon(props.id, function(res) {
        setPokemon(res);
      });
    }
    fetchData();
  }, []);

	return (
		pokemon.name ?
      <div>
        {props.link ?
          <Link to={`/pokemon/${props.id}`}>
            <img src={pokedex.getFullImage(props.fullId)} alt={pokemon.name} />
            <div>#{props.fullId}</div>
            <div>{pokemon.name.toUpperCase()}</div>
          </Link>
          :
          <>
            <img src={pokedex.getFullImage(props.fullId)} alt={pokemon.name} />
            <div>#{props.fullId}</div>
            <div>{pokemon.name.toUpperCase()}</div>
          </>
        }
        <div>
          {pokemon.types.map((type, idx) => 
            <span key={idx}>{type.type.name.toUpperCase()}</span>
          )}
        </div>
      </div>
      :
      <div>
        #{props.fullId} Loading...
      </div>
	);
}