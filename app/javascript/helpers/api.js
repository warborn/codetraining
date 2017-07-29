import axios from 'axios';
import Router from 'modules/Router';

axios.defaults.responseType = 'json';

const token = $('meta[name="csrf-token"]').attr('content');
if (token) { 
	axios.defaults.headers.common['X-CSRF-Token'] = token;
}

export function runCode(url, data) {
	return new Promise((resolve, reject) => {
    axios.post(url, data)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error.data));
  });
}

export function resetChallengeCode() {
	return axios.get(Router.challenge_path())
		.then((response) => response.data);
}

export function createChallenge(challenge) {
	return axios.post(Router.save_challenge_path('post'), { challenge })
		.then((response) => response.data);
}

export function updateChallenge(challenge) {
	return axios.patch(Router.save_challenge_path('patch'), { challenge })
		.then((response) => response.data);
}

export function deleteChallenge() {
	return axios.delete(Router.delete_challenge_path());
}

export function getChallengeExample(language = 'javascript') {
	return axios.get(Router.example_path(language));
}