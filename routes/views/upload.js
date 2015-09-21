var keystone = require('keystone');
var fs = require('fs');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	//local path to save
	var DOWNLOAD_DIR = './public/imagesbefore/';
	console.log("token: " + keystone.get('token'));
	console.log("mediaid:" + req.query.serverId);

	savetolocal(keystone.get('token'),req.query.serverId,DOWNLOAD_DIR);
		// App variables


	// var photo = savePhoto(req,function(){
	// 	console.log(photo);
	// 	res.contentType('text/plain');//返回的数据类型
	// 	res.send(photo.image.filename );//给客户端返回一个json格式的数据
	// 	res.end();
	// });
};

// function savePhoto(req,next){
// 	var userphoto = keystone.list('Userphoto');
// 	var photo = new userphoto.model();
// 	photo._.image.uploadFile(req.files.image,true,function(err,fileData){
// 		if (fileData){
// 			photo.save();
// 			next();
// 		}
// 	});
// 	return photo;
// }

function	savetolocal(token,serverId,DOWNLOAD_DIR){
	var file_url = 'http://file.api.weixin.qq.com/cgi-bin/media/get?access_token='+token+'&media_id='+serverId;
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
			var file_name = serverId+'.jpg';
			// create an instance of writable stream
			var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);
			// execute curl using child_process' spawn function
			var curl = spawn('curl', ['-G',file_url]);
			// add a 'data' event listener for the spawn instance
			curl.stdout.on('data', function(data) { file.write(data); });
			// add an 'end' event listener to close the writeable stream
			curl.stdout.on('end', function(data) {
					file.end();
					processimage(DOWNLOAD_DIR + file_name);
					console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
			});
			// when the spawn child process exits, check if there were any errors and close the writeable stream
			curl.on('exit', function(code) {
					if (code != 0) {
							console.log('Failed: ' + code);
					}
			});
	};
}

function processimage(path){
	var facedetection = './bin/FaceDetection/detect.sh'
	var detect = spawn(facedetection, [path]);
	setTimeout(function(){
		console.log('expecting');
	},5000);
	detect.stdout.on('data', function(data) { console.log(data); });
	// add an 'end' event listener to close the writeable stream
	detect.stdout.on('end', function(data) {
			console.log('detection ends');
	});
}
