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
        <div style={{ height: '50vh' }} className='d-flex justify-content-center align-items-center'>
          <div className='spinner-border p-5' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      }
    </div>
  );
}

