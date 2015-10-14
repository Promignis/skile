var Category = require('../models/Category.js');
var Link = require('../models/Link.js');
/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
	Category.find({}).sort({'addedOn': -1}).limit(3).exec(function(err, cats){
		if(err){
			return console.error(err);
		}else{
			Link.find({}).sort({'addedOn': -1}).limit(3).exec(function(err, links){
				if(err)return console.error(err);				
				res.render('home', {
					title: 'Home',
					categories: cats,
					links: links
				});
			});			
		}
	});
};