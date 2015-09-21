/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var https = require('https');

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

var timeout = setInterval(getToken() , 7190000);



// Setup Route Bindings
exports = module.exports = function(app) {

	// Views

	app.get('/auth', routes.views.auth);
	app.get('/shop/:series', routes.views.shop);
	app.get('/item/:id', routes.views.item);
	app.post('/upload',routes.views.upload);
	app.get('/', function(req,res){
		res.redirect('/shop/all');
	});

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};

function getToken(){
	console.log("Server: requesting token");
	https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxd5a37e2ee2d7b1c0&secret=5656bb63e98d72569d511697db195fbe', function(res) {
		res.on('data', function(d) {
			var json = JSON.parse(d.toString());
			token = keystone.list('Access_token');
			token.model.remove(function(err) {
	        // 删除数据库中原有的token
	    });
			var newPost = new token.model({
				token: json.access_token,
			});
			newPost.save();
			console.log("Server: Token saved");
			keystone.set('token',json.access_token);
			getTicket(json.access_token);
		});
	}).on('error', function(e) {
		console.error("error"+e);
	});

}

function getTicket(token){
	console.log("Server: requesting ticket with token: "+token)
	https.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+token+'&type=jsapi', function(res) {
		res.on('data', function(d) {
			var json = JSON.parse(d.toString());
			token = keystone.list('Jsapi');
			token.model.remove(function(err) {
	        // 删除数据库中原有的token
	    });
			var newPost = new token.model({
				ticket: json.ticket,
			});
			newPost.save();
			console.log("Server: Ticket saved");
		});
	}).on('error', function(e) {
		console.error("error"+e);
	});

}
