$(document).ready(function(){
	var ratings = $('.rating');
	var rating;
	for(var i = 0; i < ratings.length; i++){
		var rating = ratings[i];
		var ratingValue = $(rating).data("rating");
		$(rating).barrating('show',{
			theme:'bars-square',
			readonly: ratingValue > -1?true:false,
			initialRating: ratingValue > -1? ratingValue: null,
			onSelect: function(value, text, event){
				if (typeof(event) !== 'undefined') {
			      var anchor = event.target;
			      var id = $($(anchor).parent().siblings()[0]).data("id");
			      var status = $($(anchor).parent().siblings()[0]).data("status");
			      ajax('/add-rating', {id:id, ratingVal:value}, function(response){
			      	if(response == "e"){
			      		console.log("error rating");
			      	}else{

			      	}
			      });
			    } else {
			      // rating was selected programmatically
			      // by calling `set` method
			    }
			}
		});
	}
		
		
});