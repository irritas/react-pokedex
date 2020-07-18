import tokenService from './tokenService';
import { JsonWebTokenError } from 'jsonwebtoken';

export default {
  create,
  show,
  update
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

function update(addOrRemove, id) {
  return fetch(BASE_URL + addOrRemove, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    },
    body: JSON.stringify({id: id})
  }).then(res => res.json());
}