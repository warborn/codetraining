function TreeView(config) {
	this.config = config;
	this.show = false;
	this.displaying = null;

	this.isAlive = function() {
		return this.displaying !== null;
	}

	this.destroy = function() {
		this.tree.destroy();
		this.displaying = false;
	}

	this.display = function(data) {
		this.tree = $(this.config.tree).tree({
								  uiLibrary: 'bootstrap4',
								  iconsLibrary: 'fontawesome',
								  dataSource: data,
								  primaryKey: 'id' });
		this.styleExpanders();
	}

	this.styleExpanders = function() {
		$(this.config.tree + ' .block-failed').each(function() {
      $(this).parent().siblings('[data-role="expander"]').addClass('failed');
    });

    $(this.config.tree + ' .block-passed').each(function() {
      $(this).parent().siblings('[data-role="expander"]').addClass('passed');
    });
	}
}