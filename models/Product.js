var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * 产品 Model
 * ==========
 */
var product = new keystone.List('Product', {
	map: { name: 'name' },
	autokey: { path: 'slug', from: 'name', unique: true },
	singular: '产品',
	plural: '产品'
});
product.add({
	name: { type: String, required: true, default: '名称' ,label: '名称'},
	series: { type: Types.Relationship, ref: 'Series', index: true ,label: '系列'},
	description:{ type:String,required: true, label:'产品描述',default:'请添加描述'},
	info:{ type:String, required:true, label:'产品信息',default:'请添加信息'},
	price:{ type: Types.Number,required: true, label:'价格',default:'0.0'},
	productid:{ type:String, required:true, label:'产品编号',default:'请添加产品编号'},
	image: { 	type: Types.LocalFile ,
						dest: 'public/productimages/',
						prefix: '/productimages/',
						label: '图像',
						allowedTypes :['image/jpeg'],
						filename: function(item, file){
							console.log(file);
							return item.name+'/'+file.name;
						}},
	publishedDate: { type: Types.Date, index: true, format: 'YYYY-MM-DD',label: '发布日期' },
});
product.defaultColumns = 'name, series，productid';
product.register();
