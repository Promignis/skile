$(document).ready(function(){
	$('#type').on('change', function(){
		var selectedType = $('#type').val();
		if(selectedType === 'new'){
			$('.newType').css({'display': 'inline'});
		}else{
			$('.newType').css({'display': 'none'});
		}
	});
	$('.add-type').on('click', function(e){
		var type = $($('.type-search')[1]).val();
		$.get('/add-type', {type:type}, function(data){
			if(data === 'e'){
				console.log('error');
			}else{
				console.log(data);
				$('#newTypeOption').before($('<option>',{
					value: data._id,
					text: data.title
				}));
				$('#type').val(data._id).change();
			}
		});
		e.preventDefault();
		return false;
	});


	var types = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		remote:{
			url:'/api/type-search/?q=%QUERY',
			wildcard: '%QUERY'
		}
	});
	$('.type-search').typeahead(null,{
		name: 'type-search',		
		display: 'title',
		source: types
	});
});