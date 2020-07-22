import React, { useState, useEffect } from 'react';
import pokedex from '../../utils/poke-api';

export default function DetailPage(props) {
	const [pokemon, setPokemon] = useState({});

	useEffect(() => {
    let mounted = true;
    function fetchData() {
      pokedex.getPokemon(props.id, function(res) {
        if (mounted) setPokemon(res);
      });
    }
    fetchData();
    return () => mounted = false;
  }, []);

	return (
    <div className='mt-5'>
      {pokemon.name ?
        <h3 className='text-center pokedex my-3'>More Info on {pokemon.name.toUpperCase()} TBD</h3>
        :
        <h4 className='text-center pokedex my-3'>
          #{props.fullId} Loading...
        </h4>
      }
    </div>
  );
}