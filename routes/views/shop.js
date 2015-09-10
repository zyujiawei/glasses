var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var series = req.params.series;

	switch (series){
			case("all"):locals.section = '全';break;
			case("Young"):locals.section = 'Young';break;
			case("木质"):locals.section = '木质';break;
	}


	locals.data = {
		products: []
	};

	// locals.section is used to set the currently selected
	// item in the header navigation.

	view.on('init', function(next) {
		// keystone.list('Series').model.findOne()
		// .where('name', series)
		// .exec(function(err, result) {
		// 	if (result == null){
		// 		console.log("result empty");
		// 	} else{
		// 		console.log(series);
		// 		console.log(result);
		// 	}
		// 	next(err);
		// 		// do something with posts
		// });

		keystone.list('Product').paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 10
			})
			.populate('Series')
			.sort('-publishedDate')
			.exec(function(err, results) {
				locals.data.products = results;
				next(err);
			});
	});
	// Render the view
	view.render('shop');

};
