import 'bootstrap-notify/bootstrap-notify';

let Notifier = {
  _settings: {
    // settings
    newest_on_top: true,
    allow_dismiss: true,
    delay: 3000,
    animate: {
      enter: 'animated bounceInDown',
      exit: 'animated bounceOutUp'
    },
    placement: {
      from: "top",
      align: "left"
    },
    template: `
      <div data-notify="container" class="col-xs-11 col-sm-11 col-md-5 col-lg-3 alert alert-{0}" role="alert">
        <span data-notify="title">{1}</span>
        <span data-notify="message">{2}</span>
      </div>`
  },

  fromErrors(title, errors) {
    this.error(title, this._generateHTMLList(errors), false);
  },

  error(title, message) {
    this._showNotification('danger', title, message);
  },

  success(title, message) {
    this._showNotification('success', title, message);
  },

  _showNotification(type, title, message, wrap = true) {
    if (wrap) {
      message = `<p class="messages">${message}</p>`;
    }

    this._settings.type = `code ${type}`;

    $.notify({
      // options
      title: title,
      message: message
    }, this._settings);
  },

  _generateHTMLList: function(array) {
    const items = array.map((e) => `<li>${e}</li>`);

    return `<ul class="messages">${items.join('')}</ul>`;
  }
}

export default Notifier;