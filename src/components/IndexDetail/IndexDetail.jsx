import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import pokedex from '../../utils/poke-api';

export default function IndexDetail(props) {
  const [pokemon, setPokemon] = useState({});
  const fullId = props.getFullId(props.id);

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
        <Link to={`/pokemon/${props.id}`}>
          <img src={pokedex.getFullImage(fullId)} />
          <div>#{fullId}</div>
          <div>{pokemon.name.toUpperCase()}</div>
        </Link>
        <div>
          {pokemon.types.map((type, idx) => 
            <span key={idx}>{type.type.name.toUpperCase()}</span>
          )}
        </div>
      </div>
      :
      <div>
        #{fullId} Loading...
      </div>
  );
}