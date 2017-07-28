import 'gijgo/modular/tree/js/tree';

gj.tree.config.fontawesome.icons = {
  expand: '<i class="fa fa-lg fa-sort-down fa-rotate-270" aria-hidden="true"></i>',
  collapse: '<i class="fa fa-lg fa-sort-down" aria-hidden="true"></i>'
};

class TreeView {
  constructor(config) {
    this.config = config;
    this.tree = null;
  }

  isAlive() {
    return this.tree !== null;
  }

  destroy() {
    this.tree.destroy();
    this.tree = null;
  }

  display(data) {
    this.tree = $(this.config.tree).tree({
                  uiLibrary: 'bootstrap4',
                  iconsLibrary: 'fontawesome',
                  dataSource: data,
                  primaryKey: 'id' });
    this.styleExpanders();
  }

  styleExpanders() {
    $(`${this.config.tree} .block-failed`).each(function() {
      $(this).parent().siblings('[data-role="expander"]').addClass('failed');
    });

    $(`${this.config.tree} .block-passed`).each(function() {
      $(this).parent().siblings('[data-role="expander"]').addClass('passed');
    });
  }
}

export default TreeView;