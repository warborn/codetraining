import axios from 'axios';

const token = $('meta[name="csrf-token"]').attr('content');
if (token) axios.defaults.headers.common['X-CSRF-Token'] = token;

class Runner {
  send() {
    return new Promise((resolve, reject) => {
      axios.post(this.config.url, this.config.data, 
        { responseType: 'json' })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error.data));
    });
  }

  setConfig(config) {
    this.config = config;
  }
}

export default Runner;