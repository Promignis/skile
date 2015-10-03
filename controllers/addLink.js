var Link = require('../models/Link.js');
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
			var newLink = new Link(req.body);
			newLink.addedOn = new Date();			
			newLink.tags = req.body.tags.split(",");
			newLink._creator = req.user._id;
			newLink._categoryId = cat._id;
			newLink._category = cat.title;			
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