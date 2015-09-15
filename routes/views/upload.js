var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;


	var photo = savePhoto(req,function(){
		console.log(photo);
		res.contentType('text/plain');//返回的数据类型
		res.send(photo.image.filename );//给客户端返回一个json格式的数据
		res.end();
	});
};

function savePhoto(req,next){
	var userphoto = keystone.list('Userphoto');
	var photo = new userphoto.model();
	photo._.image.uploadFile(req.files.image,true,function(err,fileData){
		if (fileData){
			photo.save();
			next();
		}
	});
	return photo;
}
