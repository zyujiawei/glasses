var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * 产品 Model
 * ==========
 */
var jsapi = new keystone.List('Jsapi',{
	map: { _id: '_id' },
	autokey: { path: 'slug', from: '_id', unique: true },
	singular: 'jsapi',
	plural: 'jsapi'
});
jsapi.add({
	ticket: { type: String, required: true, default: 'ticket' ,label: 'ticket'},
});
jsapi.defaultColumns = '_id';
jsapi.register();
