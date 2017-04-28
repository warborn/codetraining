function TabComponent(config) {
	this.root = config.root;
	this.tabs = config.tabs;

	this.init = function() {
		let that = this;
		$(this.root + ' a').click(function (e) {
	    e.preventDefault();
	    let id = this.href.replace(/.+#/g, '');
	    let tabContent = $('#' + id).parent();

	    if(that.tabs && that.tabs[id]) that.tabs[id](tabContent);

	    $(this).tab('show');
	  });
	}

	this.shown = function(cb) {
		$(this.root + ' a').on('shown.bs.tab', cb);
	}

	this.init();
}