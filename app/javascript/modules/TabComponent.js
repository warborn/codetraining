class TabComponent {
  constructor(config) {
    this.root = config.root;
    this.tabs = config.tabs;

    $(`${this.root} a`).click((e) => {
      e.preventDefault();
      let id = e.target.href.replace(/.+#/g, '');
      let tabContent = $(`#${id}`).parent();

      if (this.tabs && this.tabs[id]) {
        this.tabs[id](tabContent);
      }

      $(e.target).tab('show');
    });
  }

  shown(callback) {
    $(`${this.root} a`).on('shown.bs.tab', callback)
  }
}

export default TabComponent;