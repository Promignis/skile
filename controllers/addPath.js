var Path = require('../models/Path.js');
var Category = require('../models/Category.js');
var Link = require('../models/Link.js');

exports.getAddPath = function(req, res){
	res.render('addPath',{
		title:'AddPath'
	});
}

exports.postAddPath = function(req, res){
	var myPath = new Path(req.body);
	Category.findOne({'title': new RegExp('^'+ req.body.category + '$', "i")}, function(err, category){
		if(err) return console.error(err);
		if(category){
			myPath._categoryId = category._id;
			myPath._categoryId = category.title;
			myPath.addedOn = new Date();
			myPath.save(function(err, result){
				if(err) return console.error(err);
				req.flash('success', { msg: 'Category has been successfully added!' });
				res.render('addCategory', {
					'title' : 'AddCategory'
				});
			});
		}else{
			req.flash('errors', { msg: 'Category '+req.body.category+' not found!' });
			res.render('addLink', {
					'title' : 'AddLink'
			});
		}
	});
}