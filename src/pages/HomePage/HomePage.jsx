import React, { useState, useEffect } from 'react';
import DetailCard from '../../components/DetailCard/DetailCard';

export default function HomePage(props) {
  const [random, setRandom] = useState();

  useEffect(() => {
    let rand = Math.floor(Math.random() * Math.floor(props.max)) + 1;
    let fullRand = props.getFullId(rand);
    setRandom(<DetailCard id={rand} link={true} fullId={fullRand} />);
  }, []);

  return (
    <div>
      <h1>React Pokedex</h1>
      {random}
    </div>
  );
}

