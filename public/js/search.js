$(document).ready(function(){
	var links = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		remote:{
			url:'/api/link-search/?q=%QUERY',
			wildcard: '%QUERY'
		}
	});
	$('.link-search').typeahead(null,{
		name: 'link-search',		
		display: 'title',
		source: links
	});
});