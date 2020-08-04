import React from 'react';
import AbilityCard from '../AbilityCard/AbilityCard';
import MoveCard from '../MoveCard/MoveCard';

export default function MoreDetails(props) {
	return (
    <div className='mt-5'>
      <AbilityCard {...props} />
      <MoveCard {...props} />
    </div>
  );
}