var Category = require('../models/Category.js');
/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
	if(req.user){
		Category.find({}).sort({'addedOn': -1}).limit(3).exec(function(err, cats){
			if(err){
				return console.err(err);
			}else{
				res.render('home', {
    				title: 'Home',
    				categories: cats
  				});		
			}
		});
	}else{
		res.render('home', {
    		title: 'Home'
  		});
	}  
};