import tokenService from './tokenService';

export default {
  index,
  show,
  update
};

const BASE_URL = '/api/lists/';

function index() {
  return fetch(BASE_URL + 'index', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  }).then(res => res.json());
}

function show(id) {
  return fetch(BASE_URL + id.toString(), {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  }).then(res => res.json());
}

function update(addOrRemove, id) {
  return fetch(BASE_URL + id.toString() + addOrRemove, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    },
    body: JSON.stringify({id: id})
  }).then(res => res.json());
}