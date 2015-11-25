$(document).ready(function(){
	var ratings = $('.rating');
	var rating;
	for(var i = 0; i < ratings.length; i++){
		var rating = ratings[i];
		var allRatings = $(rating).data("rating");
		var ratingCount = $(rating).data("count") || 1;
		var ratingValue = Math.floor(allRatings/ratingCount);
		var alreadyVoted = $(rating).data("vote");
		console.log(allRatings, ratingCount, ratingValue, alreadyVoted);

		$(rating).barrating('show',{
			theme:'bars-reversed',
			readonly: !alreadyVoted,
			initialRating: ratingValue > -1? ratingValue: null,
			onSelect: function(value, text, event){
				if (typeof(event) !== 'undefined') {
					var anchor = event.target;
					var id = $($(anchor).parent().siblings()[0]).data("id");
					ajax('/add-rating', {id:id, ratingVal:value}, function(response){
						if(response == "e"){
				      		console.log("error rating");
				      		$(rating).barrating('set', ratingValue);
						}else if(response == "already_v"){
							alert("already voted");
				      		$(rating).barrating('set', ratingValue);
						}else{
							console.log(allRatings, ratingCount, ratingValue, value);
							$(rating).barrating('set', Math.floor((value+ratingCount)/ratingValue));
						}
					});
				} else {
					// rating was selected programmatically
					// by calling `set` method
				}
			}
		});
		$(rating).barrating('set', ratingValue);
	}
		
		
});