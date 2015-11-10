$(document).ready(function (){
	var editor;
	
	function sendComment (){
		var body = $('.editable').html();
		var postData = {
							'body': body,
							'topic': window.location.href.split("/")[4],
							'addedOn': new Date()
						};
		$.ajax({
		  url: '/add-comment',
		  type: 'post',
		  data: postData,
		  headers: {
		    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
		  },
		 success: function(response){
		   	if(response === 'e'){
		   		console.log('error');
			}else{
				addComment();
			} 
		  }
		});
	}
	function addComment(){
		$('.comments').prepend("<br />"+$('.editable').html()+"<hr>");
	}

	function init (){
		editor = new MediumEditor('.editable');
	}

	$('.comment').on('click', function (){
		if($(this).text() === "Comment"){
			$('.editable').css('display','block');
			init();
			$(this).text("Add");
		}else{
			$(this).text("Comment");
			sendComment();
			$('.editable').css('display','none');
			editor.destroy();
		}
	});
});