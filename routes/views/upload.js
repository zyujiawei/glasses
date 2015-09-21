var keystone = require('keystone');
var fs = require('fs');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
		// App variables
	var file_url = 'http://file.api.weixin.qq.com/cgi-bin/media/get?access_token='+keystone.get('token')+'&media_id='+req.query.serverId;
	console.log("token: " + keystone.get('token'));
	console.log("mediaid:" + req.query.serverId);
	var DOWNLOAD_DIR = './imagesbefore/';

	// We will be downloading the files to a directory, so make sure it's there
	// This step is not required if you have manually created the directory
	var mkdir = 'mkdir -p ' + DOWNLOAD_DIR;
	var child = exec(mkdir, function(err, stdout, stderr) {
	    if (err) throw err;
	    else download_file_curl(file_url);
	});

	// Function to download file using curl
	var download_file_curl = function(file_url) {

			// extract the file name
			var file_name = req.query.serverId+'.jpg';
			// create an instance of writable stream
			var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);
			// execute curl using child_process' spawn function
			var curl = spawn('curl', ['-G',file_url]);
			// add a 'data' event listener for the spawn instance
			curl.stdout.on('data', function(data) { file.write(data); });
			// add an 'end' event listener to close the writeable stream
			curl.stdout.on('end', function(data) {
					file.end();
					console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
			});
			// when the spawn child process exits, check if there were any errors and close the writeable stream
			curl.on('exit', function(code) {
					if (code != 0) {
							console.log('Failed: ' + code);
					}
			});
	};

	// var photo = savePhoto(req,function(){
	// 	console.log(photo);
	// 	res.contentType('text/plain');//返回的数据类型
	// 	res.send(photo.image.filename );//给客户端返回一个json格式的数据
	// 	res.end();
	// });
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
