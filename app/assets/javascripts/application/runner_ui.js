let RunnerUI = {
	init: function(config) {
		this.rootSelector = config.root;
		this.treeSelector = config.tree;
		this.tree = new TreeView({
			root: this.rootSelector,
			tree: this.treeSelector
		});
	},

	setResponse: function(response) {
		this.response = response;
		this.result = this.response.getResult();
	},

	refreshTree: function() {
    if(this.tree.isAlive()) { 
    	this.tree.destroy();
    }
	},

	displayResponse: function(response) {
		this.setResponse(response);
		this.displayHeader();
		
    if(this.response.hasErrors()) {
      this.displayErrors();
    } else {
      this.displayTree();
    }
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
		this.tree.display(this.response.formatData());
	}
}