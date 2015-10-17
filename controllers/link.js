var Link = require('../models/Link');

exports.getLinks = function(req, res){
	Link.find({}).limit(10).sort({'addedOn' : -1}).exec(function(err, links){
		if(err) return console.error(err);
		if(!links){
			req.flash('errors', { msg: 'Links not found!' });
			res.render('links',{
				title:'Links'
			});
		}else{			
			res.render('links',
				{
					title:'Links',
					links:links
				});	
		}
	});
}

exports.searchLinks = function(req, res){
	var query = req.body.linkTitle;	
	Link.find({$text:{$search:query}}).limit(10).exec(function(err, links){
		if(err) return console.error(err);
		if(!links){
			req.flash('errors', { msg: 'Links not found!' });
			res.render('links',{
				title:'Links'
			});
		}else{
			res.render('links',
				{
					title:'Links',
					links:links
				});	
		}
	});
}