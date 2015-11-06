var Path = require('../models/Path.js');

exports.getPaths = function(req, res){

	Path.find({}).limit(5).exec(function(err, result){
		if(err) return console.error(err);
		if(result){
			console.log(result);
			res.render('paths',{
				title:'Paths',
				paths: result
			});
		}else{
			req.flash('errors', { msg: 'Paths not found!' });
			res.render('paths',{
				title:'Paths'
			});
		}
	});
}