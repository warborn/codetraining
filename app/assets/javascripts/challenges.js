$(document).on('turbolinks:load', function() {
  // setup marked and highlightjs library to use markdown for exercise details
  initMarked();

  // override gijgo bootstrap4 treeview expander and collapser icons
  gj.tree.config.fontawesome.icons = {
    expand: '<i class="fa fa-lg fa-sort-down fa-rotate-270" aria-hidden="true"></i>',
    collapse: '<i class="fa fa-lg fa-sort-down" aria-hidden="true"></i>'
  };
});