var AddLink = require('../models/Link.js');
var Category = require('../models/Category.js');
exports.getAddLink = function(req, res, next){
	res.render('addLink', {
		'title' : 'AddLink'
	});
};

exports.postLink = function(req, res, next){
	Category.findOne({'title': {$regex: new RegExp('^'+ req.body.category + '$', "i")}}, function(err, cat){		
		if(err) return console.err(err);
		if(cat){
			var newLink = new AddLink(req.body);
			newLink.addedOn = new Date();			
			newLink.tags = req.body.tags.split(",");
			newLink._creator = req.user._id;
			newLink._category = cat._id;
			console.log(newLink._category);
			console.log(cat.id);
			newLink.save(function(err, result){
				if(err) return console.err(err);
				res.render('addLink', {
					'title' : 'AddLink'
				});
			});
		}else{
			res.send("category not found");
		}		
	});	
};