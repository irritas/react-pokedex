import React, { useState, useEffect } from 'react';
import DetailCard from '../../components/DetailCard/DetailCard';

export default function HomePage(props) {
  const [random, setRandom] = useState([]);

  useEffect(() => {
    let rand = Math.floor(Math.random() * Math.floor(props.max)) + 1;
    setRandom([rand, props.getFullId(rand)]);
  }, []);

  return (
    <div className='container-lg'>
      <h1 className='display-4 text-center py-4 py-lg-5 pokedex title'>React Pokédex</h1>
      {random.length ?
        <DetailCard {...props} id={random[0]} fullId={random[1]} link={true} />
        :
        <h4 className='pokedex text-center my-3'>
          Loading...
        </h4>
      }
    </div>
  );
}

