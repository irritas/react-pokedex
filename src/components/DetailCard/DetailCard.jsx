import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Img } from 'react-image';
import { HorizontalBar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import CollectButton from '../CollectButton/CollectButton';
import pokedex from '../../utils/poke-api';

export default function DetailPage(props) {
  const [pokemon, setPokemon] = useState({});
  const [data, setData] = useState({});

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

  useEffect(() => {
    let mounted = true;
    if (pokemon.name) {
      const newData = {
        labels: [],
        datasets: [{
          backgroundColor: getSecondColor(),
          data: []
        }]
      }
      pokemon.stats.forEach(e => {
        newData.labels.push(e.stat.name.toUpperCase());
        newData.datasets[0].data.push(e.base_stat);
      });
      if (mounted) setData(newData);
    }
    return () => mounted = false;
  }, [pokemon]);

  function highestStat() {
    let stats = pokemon.stats.map(e => {
      return e.base_stat;
    });
    return Math.max(...stats);
  }

  function getColor() {
    return pokedex.getTypeColor(pokemon.types[0].type.name);
  };

  function getSecondColor() {
    if (pokemon.types.length > 1) return pokedex.getTypeColor(pokemon.types[1].type.name);
    return getColor();
  };

	return (
    <div className='box m-0 mb-3'>
      {pokemon.name ?
        <div className='row justify-content-center'>
          <div style={{ backgroundColor: getColor(), width: '30rem' }} className='col-xs poke-img p-1 mx-5 my-4 my-xl-5'>
            <Img
              src={pokedex.getFullImage(props.fullId)}
              alt={pokemon.name}
              loader={
                <div style={{ width: '100%', height: '29rem', maxHeight: '69vw' }} className='d-flex align-items-center justify-content-center'>
                  <div className='spinner-grow text-light p-5' role='status'>
                    <span className='sr-only'>Loading...</span>
                  </div>
                </div>
              }
            />
          </div>
          <div className='col-xl-5 d-flex flex-column justify-content-between align-items-center align-items-xl-start pr-xl-0 mt-1 mx-1 ml-xl-0 my-xl-5'>
            <div className='row text-center text-md-left'>
              <h1 style={{ textShadow: `2px 2px ${getColor()}` }} className='col-sm-auto pokedex p-0 m-0 mr-sm-1'>{pokemon.name.toUpperCase()}</h1>
              <h3 className='col-sm-auto text-black-50 p-0 m-0 pt-1 pokedex'>#{props.fullId}</h3>
            </div>
            <div className='row mt-3'>
              {pokemon.types.map((type, idx) => {
                const color = pokedex.getTypeColor(type.type.name);
                return <span style={{ backgroundColor: color, borderColor: color }} className='type pokedex m-1' key={idx}>{type.type.name.toUpperCase()}</span>
              })}
            </div>
            <div className='row mt-4'>
              <span><h4>Height: {pokemon.height / 10}m</h4></span>
              <span><h4>&nbsp;&nbsp;Weight: {pokemon.weight / 10}kg</h4></span>
            </div>
            <div style={{ width: '100%' }} className='row mt-2 pl-1 pr-3 pl-sm-3 pr-sm-5 px-xl-0'>
              <HorizontalBar
                data={data}
                plugins={[ChartDataLabels]}
                options={{
                  responsive: true,
                  title: {
                    display:false
                  },
                  legend: {
                    display:false
                  },
                  tooltips: {
                    yAlign: 'center'
                  },
                  plugins: {
                    datalabels: {
                      color: 'white',
                      display: true
                    }
                  },
                  scales: {
                    yAxes: [{
                      gridLines: {
                        display: false
                      },
                      ticks: {
                        fontColor: 'black',
                        fontSize: '11'
                      }
                    }],
                    xAxes: [{
                      gridLines: {
                        display: false
                      },
                      ticks: {
                        beginAtZero: true,
                        display: false,
                        max: highestStat()
                      }
                    }],
                  }
                }}
              />
            </div>
            <div className='row my-4 mb-xl-2'>
              <CollectButton {...props} />
            </div>
          </div>
          {props.link ?
            <div className='row text-center pokedex mb-3 mb-xl-4'>
              <Link to={`/pokemon/${props.id}`} className='row hide-link-blue'>
                <h5 className='col-sm-auto p-0 m-0 mr-sm-1'>Learn More About</h5>
                <h5 className='col-sm-auto p-0 m-0'>{pokemon.name.toUpperCase()}</h5>
              </Link>
            </div>
            :
            ''
          }
        </div>
        :
        <div style={{ height: '37rem' }} className='d-flex align-items-center justify-content-center'>
          <div className='spinner-border p-5' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      }
    </div>
	);
}