import React, { useState, useEffect } from 'react';
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
		<div>
			More Info on {pokemon.name.toUpperCase()} TBD
		</div>
  );
}