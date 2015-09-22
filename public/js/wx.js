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
	function getOptions(serverId) {
		var options = {
		 //target: '#output',          //把服务器返回的内容放入id为output的元素中
		 beforeSubmit: showRequest,  //提交前的回调函数
		 success: showResponse,      //提交后的回调函数
		 url: '/upload?serverId='+serverId,                 //默认是form的action， 如果申明，则会覆盖
		 //type: type,               //默认是form的method（get or post），如果申明，则会覆盖
		 //dataType: null,           //html(默认), xml, script, json...接受服务端返回的类型
		 clearForm: true,          //成功提交后，清除所有表单元素的值
		 //resetForm: true,          //成功提交后，重置所有表单元素的值
		 timeout: 20000               //限制请求的时间，当请求大于3秒后，跳出请求
		}
		return options;
	}


	function showRequest(formData, jqForm, options){
	 //formData: 数组对象，提交表单时，Form插件会以Ajax方式自动提交这些数据，格式如：[{name:user,value:val },{name:pwd,value:pwd}]
	 //jqForm:   jQuery对象，封装了表单的元素
	 //options:  options对象
	//  var queryString = $.param(formData);   //name=1&address=2
	//  var formElement = jqForm[0];              //将jqForm转换为DOM对象
	//  var address = formElement.address.value;  //访问jqForm的DOM元素
	//  return true;  //只要不返回false，表单都会提交,在这里可以对表单元素进行验证
};

	function showResponse(responseText, statusText){
	 //dataType=xml
	 alert(responseText);
	 var modal = $('#photoModal');
	 var img = modal.find('#loadedimg');
	 modal.find('#loading').fadeOut(500);
	 img.attr('src',responseText);
	 alert("src: "+ img.attr("src"));
	};

	$('#photoModal').on('show.bs.modal', function (event) {

	 var modal = $(this);
	 //调整图片大小
	 var img = modal.find('#loadedimg');
	 // var ratio = img.height() / img.width();
	 img.css("width",'100%');
	 // var newh = img.width() * ratio;
	 // img.css("height",newh);
	});

	$('#photoModal').on('hidden.bs.modal', function (event) {

	 var modal = $(this);
	 var img = modal.find('#loadedimg');
	 img.attr("src",'');
	 modal.find('#loading').show();
	});

	$("#uploadbutton").click(function () {
		wx.chooseImage({
	    count: 1, // 默认9
	    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
	    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
	    success: function (res) {
	        var imglocalIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

					wx.uploadImage({
					localId: imglocalIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
					isShowProgressTips: 1, // 默认为1，显示进度提示
					success: function (res) {
							 var imgserverId = res.serverId; // 返回图片的服务器端ID
							 $("#uploadform").ajaxSubmit(getOptions(imgserverId));
							 $('#photoModal').modal('toggle');
						}
					});
	    }
		});




	});
});
wx.error(function (res) {
	alert(res.errMsg);
});
