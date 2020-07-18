import React, { useState, useEffect } from 'react';
import DetailCard from '../../components/DetailCard/DetailCard';

export default function HomePage(props) {
  const [random, setRandom] = useState([]);

  useEffect(() => {
    let rand = Math.floor(Math.random() * Math.floor(props.max)) + 1;
    setRandom([rand, props.getFullId(rand)]);
  }, []);

  return (
    <div>
      <h1>React Pokedex</h1>
      {random.length ?
        <DetailCard {...props} id={random[0]} fullId={random[1]} link={true} />
        :
        <div>
          Loading...
        </div>
      }
    </div>
  );
}

