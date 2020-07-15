import React from 'react';
import pokedex from '../../utils/poke-api';

export default function DetailPage(props) {
	const id = props.match.params.id;
	// pokedex.getPokemon(id);
	return (
		id > props.max ?
			<div>
				Not Available Yet
			</div>
			:
			<div>
				id: {id}
			</div>
	);
}