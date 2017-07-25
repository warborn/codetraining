import axios from 'axios'

var token = $('meta[name="csrf-token"]').attr('content');
if (token) axios.defaults.headers.common['X-CSRF-Token'] = token;

function Runner() {
  this.send = function() {
    let that = this;
    return new Promise(function(resolve, reject) {
      axios.post(that.config.url, that.config.data, 
        { responseType: 'json' })
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

export default Runner