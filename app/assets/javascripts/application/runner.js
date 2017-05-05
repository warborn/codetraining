function Runner() {
	this.send = function() {
		let that = this;
		return new Promise(function(resolve, reject) {
			axios.post(that.config.url, {
				code: that.config.code,
				fixture: that.config.fixture
			}, { responseType: 'json' })
			.then(function(response) {
				resolve(response.data);
			})
			.catch(function(error) {
				reject(error.data);
			});
		});
	}

	this.setConfig = function(config) {
		this.config = config;
	}
}