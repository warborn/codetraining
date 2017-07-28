let Notifier = {
  settings: {
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
    this.error(title, this.generateHTMLList(errors), false);
  },

  error(title, message) {
    this.showNotification('danger', title, message);
  },

  success(title, message) {
    this.showNotification('success', title, message);
  },

  showNotification(type, title, message, wrap = true) {
    if (wrap) {
      message = `<p class="messages">${message}</p>`;
    }

    this.settings.type = `code ${type}`;

    $.notify({
      // options
      title: title,
      message: message
    }, this.settings);
  },

  generateHTMLList: function(array) {
    const items = array.map((e) => `<li>${e}</li>`);

    return `<ul class="messages">${items.join('')}</ul>`;
  }
}

export default Notifier;