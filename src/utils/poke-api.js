// Max available pokemon from api
const MAX_ID = 807;

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
  getFullImage
};

function getUpperLimit() {
  return MAX_ID;
}

function getPokemon(id, cb) {
  P.getPokemonByName(id).then(res => cb(res));
}

function getFullImage(id) {
  return IMG_URL + id + '.png';
}