wx.ready(function () {
  // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
  $('#uploadbutton').onclick = function () {
    wx.checkJsApi({
      jsApiList: [
				'checkJsApi',
				'chooseImage',
				'previewImage',
				'uploadImage',
				'downloadImage'
      ],
      success: function (res) {
        alert(JSON.stringify(res));
      }
    });
  };
});
wx.error(function (res) {
	alert(res.errMsg);
});
