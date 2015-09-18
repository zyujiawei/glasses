wx.ready(function () {
  // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
	// wx.checkJsApi({
	// 	jsApiList: [
	// 		'checkJsApi',
	// 		'chooseImage',
	// 		'previewImage',
	// 		'uploadImage',
	// 		'downloadImage'
	// 	],
	// 	success: function (res) {
	// 		//判断代码
	// 	}
	// });
	$("#uploadbutton").click(function () {

		wx.chooseImage({
	    count: 1, // 默认9
	    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
	    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
	    success: function (res) {
	        var imglocalIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

					alert(imglocalIds);
					wx.uploadImage({
					localId: imglocalIds, // 需要上传的图片的本地ID，由chooseImage接口获得
					isShowProgressTips: 1, // 默认为1，显示进度提示
					success: function (res) {
							 var imgserverId = res.serverId; // 返回图片的服务器端ID


							 wx.downloadImage({
								serverId: imgserverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
								isShowProgressTips: 1, // 默认为1，显示进度提示
								success: function (res) {
								 var localId = res.localId; // 返回图片下载后的本地ID


								 $('#photoModal').on('show.bs.modal', function (event) {
									var modal = $(this)
									modal.find('#loadedimg').attr("src",localId);
								 });
								 $('#photoModal').modal('toggle');
								}
							 });
						}
					});
	    }
		});




	});
});
wx.error(function (res) {
	alert(res.errMsg);
});
