var Comment = require('../models/Comment.js');

exports.postComment = function(req, res){
	var userId = req.user.id;
	var name = req.user.fullName;
	var postData = req.body.postData;
	var newComment = new Comment(req.body);
	newComment._creator = userId;
	newComment._creatorName = name;
	newComment.save(function(err, result){
		if(err) res.send("e");
		else{
			res.send('s');
		}
	});
}