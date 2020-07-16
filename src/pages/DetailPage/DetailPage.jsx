import React, { useState, useEffect } from 'react';
import DetailCard from '../../components/DetailCard/DetailCard';
import pokedex from '../../utils/poke-api';

export default function DetailPage(props) {
	const [pokemon, setPokemon] = useState({});
	const id = props.match.params.id;
  const fullId = props.getFullId(id);

	useEffect(() => {
    function fetchData() {
      pokedex.getPokemon(id, function(res) {
        setPokemon(res);
      });
    }
    fetchData();
  }, []);

	return (
		id > props.max ?
			<div>
				Not Available Yet
			</div>
			:
			pokemon.name ?
				<div>
					<DetailCard {...props} id={id} fullId={fullId} />
					<div>More Info Here</div>
				</div>
				:
				<div>
					#{fullId} Loading...
				</div>
	);
}