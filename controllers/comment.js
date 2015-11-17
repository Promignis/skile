var Comment = require('../models/Comment.js');

exports.postComment = function(req, res){
	var userId = req.user.id;
	var name = req.user.fullName;
	var postData = req.body;
	var newComment = new Comment(req.body);
	newComment._creator = userId;
	newComment._creatorName = name;
	if(postData.isReply){
		Comment.update({_id: postData.topic},{$push: {replies:parseInt(postData.topic)}}, function(err){
			if(err) return console.error(err);
		});
	}
	newComment.save(function(err, result){
		if(err) res.send("e");
		else{
			res.send('s');
		}
	});
}