import Router from 'modules/Router';

$(document).ready(function() {
	let resetButton = $('.challenge-filter #reset');
	resetButton.click((e) => {
		e.preventDefault();
		Router.redirectTo(Router.challenges_path());
	});
});