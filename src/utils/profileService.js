import tokenService from './tokenService';

export default {
  createProfile
};

const BASE_URL = '/api/profiles/';

function createProfile() {
  return fetch(BASE_URL + 'create', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  }).then(res => res.json());
}