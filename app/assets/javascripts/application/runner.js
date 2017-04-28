function Runner(config) {
	this.config = config;

	this.send = function(cb) {
		cb();
		return new Promise(function(resolve, reject) {
			axios.post(config.url, {
				code: config.code,
				fixture: config.fixture
			}, { responseType: 'json' })
			.then(function(response) {
				resolve(response.data);
			})
			.catch(function(error) {
				reject(error.data);
			});
		});
	}
}