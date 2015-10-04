var Category = require('../models/Category');
exports.categorySearch = function (req, res, next) {
	var categoryName = req.query.q;
	Category.find({'title': {$regex: new RegExp('^.*'+ categoryName + '.*$', "i")}}).limit(5).exec(function(err, category){		
		res.send(category);
	});
}