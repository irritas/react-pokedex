// Max available pokemon from api
const MAX_ID = 807;

// Color lookup by type
const colorLookup = {
  bug: '#A8B820',
  dark: '#705848',
  dragon: '#7038F8',
  electric: '#F8D030',
  fairy: '#EE99AC',
  fighting: '#C03028',
  fire: '#F08030',
  flying: '#A890F0',
  ghost: '#705898',
  grass: '#78C850',
  ground: '#E0C068',
  ice: '#98D8D8',
  normal: '#A8A878',
  poison: '#A040A0',
  psychic: '#F85888',
  rock: '#B8A038',
  steel: '#B8B8D0',
  water: '#6890F0'
}

// PokeAPI actual url
// const BASE_URL = 'https://pokeapi.co/api/v2/';

// Image link, follow by id with 3 padding and .png
const IMG_URL = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/';

// Mostly use wrapper pokedex-promise-v2
const Pokedex = require('pokedex-promise-v2');
const options = {
  protocol: 'https',
  cacheLimit: 30 * 60000, // 30min
  timeout: 10 * 1000 // 10s
}
const P = new Pokedex(options);

export default {
  getUpperLimit,
  getPokemon,
  getAbility,
  getMove,
  getFullImage,
  getTypeColor
};

function getUpperLimit() {
  return MAX_ID;
}

function getPokemon(id, cb) {
  P.getPokemonByName(id).then(res => cb(res));
}

function getAbility(name, cb) {
  P.getAbilityByName(name).then(res => cb(res));
}

function getMove(name, cb) {
  P.getMoveByName(name).then(res => cb(res));
}

function getFullImage(id) {
  return IMG_URL + id + '.png';
}

function getTypeColor(type) {
  return colorLookup[type];
}