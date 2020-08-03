import React from 'react';

export default function DetailPage(props) {
	return (
    <div className='mt-5'>
      <h3 className='text-center pokedex my-3'>More Info on {props.pokemon.name.toUpperCase()} TBD</h3>
    </div>
  );
}