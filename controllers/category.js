var Category = require('../models/Category.js');
var Link = require('../models/Link');

exports.getCategory = function(req, res){
	var categoryId = req.params.id;
	Category.findOne({_id : categoryId}, function(err, cat){		
		if(!cat){
			req.flash('errors', { msg: 'Category not found!' });
			res.redirect('/');
		}else{
			Link.find({_categoryId:cat._id}).limit(10).exec(function(err, links){
				if(err) return console.err(err);
				if(links){
					res.render('category', {
						title:cat.title,
						cat:cat,
						links: links,						
					});
				}else{
					req.flash('errors', { msg: 'No links found!' });
					res.redirect('/');
				}
			});			
		}		
	});	
}

exports.getCategories = function(req, res){
	Category.find({_parentCatTitle:'None'}).exec(function(err, cats){
		if(err) return console.err(err);	
		if(cats.length){
			res.render('categories',{
				title:'categories',
				categories:cats
			});
		}else{
			req.flash('errors', { msg: 'No categories found!' });
			res.render('categories');
		}
	});	
}

exports.getCatChild = function(req, res){
	var categoryId = req.params.id;
	Category.findOne({_id : categoryId}, function(err, cat){
		if(err) return console.err(err);
		if(!cat){
			req.flash('errors', { msg: 'Category not found!' });
			res.redirect('/');
		}else{
			Category.find({_parentId : categoryId}, function(err, childCats){
				if(err) return console.err(err);
				if(childCats.length){						
					res.render('category',{
						childCats:childCats,
						cat:cat
					});
				}else{							
					req.flash('errors', { msg: 'No child categories found!' });
					res.render('categories');
				}
			});
		}		
	});
}