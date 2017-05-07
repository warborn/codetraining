let Notifier = {
	fromError: function(error) {
		$.notify({
			// options
			title: 'No se pudo guardar el registro',
			message: this.generateHTML(error)
		}, 
		{
			// settings
			newest_on_top: true,
			allow_dismiss: true,
			type: 'danger',
			animate: {
				enter: 'animated bounceInDown',
				exit: 'animated bounceOutUp'
			},
			placement: {
				from: "top",
				align: "left"
			}
		});
	},

	generateHTML: function(list) {
		items = list.map(function(e) { 
			return '<li>' + e + '</li>';
		});
		return '<ul>' + items.join('') + '</ul>';
	}
}