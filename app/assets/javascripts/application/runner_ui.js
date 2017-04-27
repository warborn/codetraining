let RunnerUI = {
	init: function(config) {
		this.rootSelector = config.root;
		this.treeSelector = config.tree;
		this.treeView = null;
	},

	setResponse: function(response) {
		this.response = response;
		this.result = this.response.getResult();
	},

	refreshTree: function() {
    if(this.treeView && this.treeView.isAlive()) { 
    	this.treeView.destroy();
    }

    this.treeView =	new TreeView({
			root: this.rootSelector,
			tree: this.treeSelector
		});
	},

	displayResponse: function(response) {
		this.refreshTree();
		this.setResponse(response);
		this.displayHeader();
		
    if(this.response.hasErrors()) {
      this.displayErrors();
    } else {
      this.displayTree();
    }
    this.displayBorder(this.result.completed);
	},

	displayHeader: function() {
		$(this.rootSelector + ' .header').text('Pasados: ' + this.result.passed + ' Fallidos: '  + this.result.failed);
	},

	displayErrors: function() {
		$root = $(this.treeSelector);
		$root.empty();
		$errorBlock = $('<div class="error-block"></div>');
    $pre = $('<pre></pre>');
    $pre.text(this.response.getErrors());
    $errorBlock.append($pre)
    $root.append($errorBlock);
	},

	displayTree: function() {
		this.treeView.display(this.response.formatData());
	},

	displayBorder: function(completed) {
		$border = $(this.rootSelector + ' .border').removeClass('passed failed');
		$border.addClass(completed ? 'passed' : 'failed');
	}
}