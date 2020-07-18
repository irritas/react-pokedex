import tokenService from './tokenService';

export default {
  create,
  show
};

const BASE_URL = '/api/profiles/';

function create() {
  return fetch(BASE_URL + 'create', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  }).then(res => res.json());
}

function show() {
  return fetch(BASE_URL + 'show', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  }).then(res => res.json());
}