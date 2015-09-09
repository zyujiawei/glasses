var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * 产品系列 Model
 * ==========
 */
var series = new keystone.List('Series', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	singular: '系列',
	plural: '系列'
});
series.add({
	name: { type: String, required: true, default: '名称' ,label: '名称'},
});
series.defaultColumns = 'name';
series.register();
