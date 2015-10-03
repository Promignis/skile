var Category = require('../models/Category.js');

exports.getCategory = function(req, res, next){
	var category = req.params.name;
	Category.findOne({'title':{$regex: new RegExp('^'+ category + '$', "i")}}, function(err, cat){
		if(!cat){
			res.send('Category not found!');
		}else{
			res.render('category', {		
				catName:cat.title,
				catDescription:cat.description
			});
		}		
	});	
}