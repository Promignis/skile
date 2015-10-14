var Category = require('../models/Category');
var Link = require('../models/Link');

exports.categorySearch = function (req, res, next) {
	var categoryName = req.query.q;
	Category.find({'title': {$regex: new RegExp('^.*'+ categoryName + '.*$', "i")}}).limit(5).exec(function(err, category){
		if(err) console.error(err);
		res.send(category);
	});
}
exports.linkSearch = function(req, res, next){
	var title = req.query.q;
	Link.find({$text:{$search:title}}).limit(10).exec(function(err, links){	
		if(err) console.error(err);
		console.log(links);
		res.send(links);
	});
}