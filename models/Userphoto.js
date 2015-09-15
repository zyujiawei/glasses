var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * 产品 Model
 * ==========
 */
var userphoto = new keystone.List('Userphoto', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	singular: '用户处理前图片',
	plural: '用户处理前图片'
});
userphoto.add({
	image: { 	type: Types.LocalFile ,
						dest: 'public/imagesbefore/',
						prefix: '/imagesbefore/',
						label: '图像',
						allowedTypes :['image/jpeg','image/png'],
						filename: function(item, file){
							return file.name;
						}},
});
userphoto.defaultColumns = '_id';
userphoto.register();
