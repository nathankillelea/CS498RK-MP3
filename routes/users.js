var secrets = require('../config/secrets');
var User = require('../models/user.js');

module.exports = function (router) {

    var usersRoute = router.route('/users');

    usersRoute.get(function(req, res) {
		if(!req.query.count) {
			User.find(eval("("+req.query.where+")")).sort(eval("("+req.query.sort+")")).select(eval("("+req.query.select+")")).skip(eval("("+req.query.skip+")")).limit(eval("("+req.query.limit+")")).exec(function(err, users) {
				if(err)
					return res.status(500).send({message: 'Server error', data: []});
				else
					return res.status(200).send({message: 'Users retrieved', data: users});
			});
		}
		else {
			User.count(eval("("+req.query.where+")")).exec(function(err, count) {
				if(err)
					return res.status(500).send({message: 'Server error', data: []});
				else
					return res.status(200).send({message: 'Count retrieved', data: count});
			});
		}
	});
	usersRoute.post(function(req, res) { // MAYBE ADD SOME CHECKING TO SEE IF NAME IS SAME OR EMAIL IS SAME???
		var newUser = new User();
		newUser.name = req.body.name;
		newUser.email = req.body.email;
		newUser.pendingTasks = [];
		newUser.save(function(err) {
			if(err)
				return res.status(500).send({message: 'Server error', data: []});
			else
				return res.status(201).send({message: 'New user created', data: newUser});
		});
	});
	usersRoute.options(function(req, res) {
		res.writeHead(200); // changes it to success
		res.end();
	});

    return router;
}
