import React from 'react';

export default function MoveCard(props) {
	return (
    <div className='mt-5'>
      <h3 className='text-center pokedex my-3'>{props.pokemon.name.toUpperCase()} Moves TBD</h3>
    </div>
  );
}