let RunnerUI = {
	init: function(config) {
		this.rootSelector = config.root;
		this.contentSelector = config.content;
		this.treeView = null;
	},

	setResponse: function(response) {
		this.response = response;
		this.result = this.response.getResult();
	},

	refreshTree: function() {
    this.destroyTreeBox();

    this.treeView =	new TreeView({
			root: this.rootSelector,
			tree: this.contentSelector
		});
	},

	destroyTreeBox: function() {
		if(this.treeView && this.treeView.isAlive()) {
      this.treeView.destroy();
    }
	},

	setup: function() {
		this.displayPendingHeader();
    this.destroyTreeBox();
    $(this.contentSelector).empty();
	},

	displayResponse: function(response) {
		this.refreshTree();
		this.setResponse(response);
		this.displayResponseHeader();
		
    if(this.response.hasErrors()) {
      this.displayErrors();
    } else {
      this.displayTree();
    }
    this.displayBorder(this.result.completed);
	},

	displayHeader: function(message) {
		$(this.rootSelector + ' .header').text(message);
	},

	displayResponseHeader: function() {
		this.displayHeader('Tiempo: ' + this.response.getExecutionTime() + 'ms Pasados: ' + this.result.passed + ' Fallidos: '  + this.result.failed);
	},

	displayPendingHeader: function() {
		this.displayHeader('Estado: Pendiente');
	},

	displayErrors: function() {
		this.setOutputType('error-box');
		$root = $(this.contentSelector);
		$root.empty();
		$errorBlock = $('<div class="box"></div>');
    $pre = $('<pre></pre>');
    $pre.text(this.response.getErrors());
    $errorBlock.append($pre)
    $root.append($errorBlock);
	},

	displayTree: function() {
		this.setOutputType('treeview-box');
		this.treeView.display(this.response.formatData());
	},

	displayBorder: function(completed) {
		$border = $(this.rootSelector + ' .body').removeClass('-passed -failed');
		$border.addClass(completed ? '-passed' : '-failed');
	},

	setOutputType: function(className) {
		$(this.contentSelector)
			.removeClass('treeview-box error-box')
			.addClass('content ' + className);
	}
}