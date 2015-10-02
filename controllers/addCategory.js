var Category = require('../models/Category.js');
exports.getAddCategory = function(req, res, next){
	res.render('addCategory', {
		'title' : 'AddCategory'
	});
};

exports.postCategory = function(req, res, next){	
	var newCategory = new Category(req.body);
	newCategory.save(function(err, result){
		if(err) return console.err(err);
		res.render('addCategory', {
			'title' : 'AddCategory'
		});
	});
};