var keystone = require('keystone'),
jsSHA = require('jssha');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var id = req.params.id;
	locals.data = {
		products: [],
		jsdata:[]
	};
	locals.section = 'home';



	view.on('init', function(next) {
		keystone.list('Jsapi').model.findOne()
		.exec(function(err, results) {
			//保存微信js缓存到本地
			locals.data.jsdata = sign(results.ticket,'http://glasses.szqhyc.com'+req.url);

			//保存了js信息后接着再查询商品信息
			keystone.list('Product').model.findOne()
			.where('_id', id)
			.populate('Series')
			.exec(function(err, results) {
				locals.data.products = results;
				next(err);
			});
		});
	});

	// Render the view
	view.render('item');

};

var createNonceStr = function () {
  return Math.random().toString(36).substr(2, 15);
};

var createTimestamp = function () {
  return parseInt(new Date().getTime() / 1000) + '';
};

var raw = function (args) {
  var keys = Object.keys(args);
  keys = keys.sort()
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key];
  });

  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
};

/**
* @synopsis 签名算法
*
* @param jsapi_ticket 用于签名的 jsapi_ticket
* @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
*
* @returns
*/
var sign = function (jsapi_ticket, url) {
  var ret = {
    jsapi_ticket: jsapi_ticket,
    nonceStr: createNonceStr(),
    timestamp: createTimestamp(),
    url: url
  };
  var string = raw(ret);
      shaObj = new jsSHA('SHA-1', 'TEXT');
	shaObj.update(string);
  ret.signature = shaObj.getHash('HEX');

  return ret;
};
