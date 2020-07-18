import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CollectButton from '../CollectButton/CollectButton';
import pokedex from '../../utils/poke-api';

export default function IndexDetail(props) {
  const [pokemon, setPokemon] = useState({});
  const [button, setButton] = useState(true);
  const fullId = props.getFullId(props.id);

  useEffect(() => {
    function fetchData() {
      pokedex.getPokemon(props.id, function(res) {
        setPokemon(res);
      });
    }
    fetchData();
  }, []);

  function handleClick() {
    setButton(false);
  };

  return (
    pokemon.name ?
      <div>
        <div>
          <img src={pokedex.getFullImage(fullId)} alt={pokemon.name} />
        </div>
        <Link to={`/pokemon/${props.id}`}>
          <div>#{fullId}</div>
          <div>{pokemon.name.toUpperCase()}</div>
        </Link>
        <div>
          {pokemon.types.map((type, idx) => 
            <span key={idx}>{type.type.name.toUpperCase()}</span>
          )}
        </div>
        {button ?
          <CollectButton {...props} handleClick={handleClick} />
          :
          <div>
            Done!
          </div>
        }
      </div>
      :
      <div>
        #{fullId} Loading...
      </div>
  );
}