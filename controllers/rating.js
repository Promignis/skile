var Link = require('../models/Link');
var Rating = require('../models/Rating');

exports.postRating = function(req, res){
	var id = req.body.id;
	var value = req.body.ratingVal;
	Rating.find({'userWhoVoted':req.user.id}, function(err, result){
		if(err) return console.error(err);
		console.log(result);
		if(!result.length){
			Rating.update({topic: id}, {$push: {userWhoVoted: req.user.id}}, function(err, result){
				if(err){
					res.send("e");
				}else{
					Link.update({_id:id},{$inc: {ratingSum: value, ratingCount: 1},}, function(err, result){
						if(err){
							res.send("e");
						}else{
							res.send(result);
						}
					});
				}
			});
		}else{
			res.send("e");
		}
	});
}	