var Category = require('../models/Category.js');
var Link = require('../models/Link');

exports.getCategory = function(req, res, next){
	var category = req.params.name;
	Category.findOne({'title':{$regex: new RegExp('^'+ category + '$', "i")}}, function(err, cat){		
		if(!cat){
			req.flash('errors', { msg: 'Category not found!' });
			res.redirect('/');
		}else{
			Link.find({_categoryId:cat._id}).limit(10).exec(function(err, links){
				if(err) return console.err(err);
				if(links){
					res.render('category', {
						catName: cat.title,
						catDescription: cat.description,
						links: links
					});
				}else{
					req.flash('errors', { msg: 'No links found!' });
					res.redirect('/');
				}
			});			
		}		
	});	
}