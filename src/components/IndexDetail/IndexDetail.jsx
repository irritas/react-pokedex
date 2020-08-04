import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Img } from 'react-image';
import CollectButton from '../CollectButton/CollectButton';
import pokedex from '../../utils/poke-api';

export default function IndexDetail(props) {
  const [pokemon, setPokemon] = useState({});
  const [visible, setVisible] = useState(true);
  const fullId = props.getFullId(props.id);

  useEffect(() => {
    let mounted = true;
    function fetchData() {
      pokedex.getPokemon(props.id, function(res) {
        if (mounted) setPokemon(res);
      });
    }
    fetchData();
    return () => mounted = false;
  }, []);

  function getColor() {
    return pokedex.getTypeColor(pokemon.types[0].type.name);
  };

  function setInvis() {
    setVisible(false);
  };

  return (
    visible ?
      <div style={{ width: '320px', height: '500px' }} className='box d-flex flex-column align-items-center justify-content-between mb-4 mb-lg-5'>
        {pokemon.name ?
          <>
            <Link to={`/pokemon/${props.id}`} className='row hide-link d-flex flex-column align-items-center'>
              <div style={{ backgroundColor: getColor(), width: '300px', height: '300px' }} className='row poke-img p-1 mx-4 mt-2'>
                <Img
                  src={pokedex.getFullImage(fullId)}
                  alt={pokemon.name}
                  loader={
                    <div style={{ width: '100%', height: '100%' }} className='d-flex align-items-center justify-content-center'>
                      <div className='spinner-grow text-light p-4' role='status'>
                        <span className='sr-only'>Loading...</span>
                      </div>
                    </div>
                  }
                />
              </div>
              <div style={{ opacity: '50%' }} className='row pokedex align-self-start ml-4 mt-2 mb-0'>
                <h6>&nbsp;#{fullId}</h6>
              </div>
              <div className='row pokedex text-center mt-1 mb-0'>
                <h4 style={{ textShadow: `2px 2px ${getColor()}` }}>{pokemon.name.toUpperCase()}</h4>
              </div>
            </Link>
            <div className='row mt-1 mb-0'>
              {pokemon.types.map((type, idx) => {
                const color = pokedex.getTypeColor(type.type.name);
                return <span style={{ backgroundColor: color, borderColor: color }} className='type pokedex m-1' key={idx}>{type.type.name.toUpperCase()}</span>
              })}
            </div>
            <div className='row my-2'>
              <CollectButton {...props} setInvis={setInvis} />
            </div>
          </>
          :
          <div className='my-auto'>
            <div className='spinner-border p-4' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
          </div>
        }
      </div>
      :
      ''
  );
}