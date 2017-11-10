import 'bootstrap/js/src/tab';

class TabComponent {
  constructor(config) {
    this._root = config.root;
    this._tabs = config.tabs;

    $(`${this._root} a`).click((e) => {
      e.preventDefault();
      let id = e.currentTarget.href.replace(/.+#/g, '');
      let tabContent = $(`#${id}`).parent();

      if (this._tabs && this._tabs[id]) {
        this._tabs[id](tabContent);
      }

      $(e.currentTarget).tab('show');
    });
  }

  shown(callback) {
    $(`${this._root} a`).on('shown.bs.tab', callback)
  }
}

export default TabComponent;