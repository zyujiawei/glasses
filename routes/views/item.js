var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var id = req.params.id;
	locals.data = {
		products: []
	};

	locals.section = 'home';
	view.on('init', function(next) {
		keystone.list('Product').model.findOne()
    .where('_id', id)
    .populate('Series')
    .exec(function(err, results) {
			locals.data.products = results;
			next(err);
        // do something with posts
    });
	});

	// Render the view
	view.render('item');

};
