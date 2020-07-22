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
				<div>
					<h1>Not Available</h1>
				</div>
				:
				pokemon.name ?
					<div>
						<DetailCard {...props} id={id} link={false} fullId={fullId} />
						<MoreDetails {...props} id={id} />
					</div>
					:
					<h4 className='pokedex text-center my-3'>
						#{fullId} Loading...
					</h4>
			}
		</div>
	);
}