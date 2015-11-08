$(document).ready(function(){
	var editor;
	function init(){
		editor = new MediumEditor('.editable');
	}
	$('.comment').on('click', function(){
		if($(this).text() === "Comment"){
			$('.editable').css('display','block');
			init();
			$(this).text("Add");
		}else{
			$(this).text("Comment");
			$('.editable').css('display','none');
			editor.destroy();
		}
	});
});