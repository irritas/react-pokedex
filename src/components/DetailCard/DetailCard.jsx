import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import pokedex from '../../utils/poke-api';
import CanvasJSReact from '../../canvasjs.react';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function DetailPage(props) {
  const [pokemon, setPokemon] = useState({});

	useEffect(() => {
    function fetchData() {
      pokedex.getPokemon(props.id, function(res) {
        setPokemon(res);
      });
    }
    fetchData();
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
  }

	return (
		pokemon.name ?
      <div>
        {props.link ?
          <Link to={`/pokemon/${props.id}`}>
            <img src={pokedex.getFullImage(props.fullId)} alt={pokemon.name} />
            <div>#{props.fullId}</div>
            <div>{pokemon.name.toUpperCase()}</div>
          </Link>
          :
          <>
            <img src={pokedex.getFullImage(props.fullId)} alt={pokemon.name} />
            <div>#{props.fullId}</div>
            <div>{pokemon.name.toUpperCase()}</div>
          </>
        }
        <div>
          {pokemon.types.map((type, idx) => 
            <span key={idx}>{type.type.name.toUpperCase()}</span>
          )}
        </div>
        <div>
          <span>Height: {pokemon.height / 10}m</span>
          <span>Weight: {pokemon.weight / 10}kg</span>
        </div>
        <div>
          <CanvasJSChart options={{
            animationEnabled: true,
            theme: 'light2',
            axisX: {
              reversed: true,
              gridThickness: 0,
              tickLength: 0,
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
              dataPoints: fetchStats()
            }]
          }} />
        </div>
      </div>
      :
      <div>
        #{props.fullId} Loading...
      </div>
	);
}