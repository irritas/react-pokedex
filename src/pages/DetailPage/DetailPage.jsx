import React, { useState, useEffect } from 'react';
import DetailCard from '../../components/DetailCard/DetailCard';
import MoreDetails from '../../components/MoreDetails/MoreDetails';
import pokedex from '../../utils/poke-api';

export default function DetailPage(props) {
	const [pokemon, setPokemon] = useState({});
	const id = props.match.params.id;
  const fullId = props.getFullId(id);

	useEffect(() => {
		let mounted = true;
    function fetchData() {
      pokedex.getPokemon(id, function(res) {
        if (mounted) setPokemon(res);
      });
    }
		fetchData();
		return () => mounted = false;
  }, []);

	return (
		<div className='container-lg mt-4 mt-lg-5'>
			{id > props.max ?
				<h1 className='display-4 text-center py-4 py-lg-5 pokedex title'>Not Available</h1>
				:
				pokemon.name ?
					<div>
						<DetailCard {...props} id={id} link={false} fullId={fullId} />
						<MoreDetails {...props} pokemon={pokemon} id={id} />
					</div>
					:
					<div style={{ height: '50vh' }} className='d-flex justify-content-center align-items-center'>
						<div className='spinner-border p-5' role='status'>
							<span className='sr-only'>Loading...</span>
						</div>
					</div>
			}
		</div>
	);
}