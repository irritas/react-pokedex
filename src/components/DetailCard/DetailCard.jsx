import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CollectButton from '../CollectButton/CollectButton';
import pokedex from '../../utils/poke-api';
import CanvasJSReact from '../../canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function DetailPage(props) {
  const [pokemon, setPokemon] = useState({});

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

  function fetchStats() {
    return pokemon.stats.map(e => {
      return {
        y: e.base_stat,
        label: e.stat.name.toUpperCase()
      }
    });
  }

  function highestStat() {
    let stats = pokemon.stats.map(e => {
      return e.base_stat;
    });
    return Math.max(...stats);
  }

  function getColor() {
    return pokedex.getTypeColor(pokemon.types[0].type.name);
  };

	return (
    <div className='box m-0 mb-3'>
      {pokemon.name ?
        <div className='row justify-content-center'>
          <div style={{ backgroundColor: getColor() }} className='col-xs poke-img p-1 mx-5 my-4 my-xl-5'>
            <img src={pokedex.getFullImage(props.fullId)} alt={pokemon.name} />
          </div>
          <div className='col-xl-5 d-flex flex-column justify-content-between align-items-center align-items-xl-start mt-1 mx-1 ml-xl-0 my-xl-5'>
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
            <div className='container-fluid row align-self-start px-0 mx-0 mt-2'>
              <CanvasJSChart options={{
                animationEnabled: true,
                theme: 'light2',
                height: 200,
                axisX: {
                  reversed: true,
                  gridThickness: 0,
                  tickLength: 0,
                  labelFontColor: 'black',
                  labelFontFamily: 'sans-serif',
                  labelFontWeight: 'bold'
                },
                axisY: {
                  maximum: highestStat(),
                  gridThickness: 0,
                  tickLength: 0,
                  labelFormatter: function(e) {
                    return "";
                  }
                },
                data: [{
                  type: 'bar',
                  color: getColor(),
                  indexLabel: '{y}',
                  indexLabelPlacement: 'inside',
                  indexLabelFontColor: 'white',
                  indexLabelFontFamily: 'sans-serif',
                  indexLabelFontWeight: 'bold',
                  dataPoints: fetchStats()
                }]
              }} />
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
        <h4 className='text-center pokedex my-3'>
          #{props.fullId} Loading...
        </h4>
      }
    </div>
	);
}