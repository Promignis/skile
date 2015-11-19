function ajax(url, postData, callback){
	$.ajax({
			url: url,
			type: 'post',
			data: postData,
			headers: {
			'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
		},
		success: callback
	});
}