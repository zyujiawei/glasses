var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * 产品 Model
 * ==========
 */
var access_token = new keystone.List('Access_token',{
	map: { _id: '_id' },
	autokey: { path: 'slug', from: '_id', unique: true },
	singular: 'access_token',
	plural: 'access_token'
});
access_token.add({
	token: { type: String, required: true, default: 'token' ,label: 'token'},
});
access_token.defaultColumns = '_id';
access_token.register();
