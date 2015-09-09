var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.data = {
		products: []
	};

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	view.on('init', function(next) {
		var q = keystone.list('Product').paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 10
			})
			.populate('Series')
			.sort('-publishedDate');

		q.exec(function(err, results) {
			console.log(results);
			locals.data.products = results;
			next(err);
		});
	});
	// Render the view
	view.render('shop');

};
