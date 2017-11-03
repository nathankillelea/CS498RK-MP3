//http://mongoosejs.com/docs/documents.html

var secrets = require('../config/secrets');
var User = require('../models/user.js');

module.exports = function (router) {

    var usersIdRoute = router.route('/users/:id');

    usersIdRoute.get(function(req, res) {
		User.findById(req.params.id, function(err, user) {
			if(!user)
				return res.status(404).send({message: 'User not found', data:[]});
			else if(err)
				return res.status(500).send({message: 'Server error', data:[]});
			else
				return res.status(200).send({message: 'User retrieved', data: user});
		});
	});
	usersIdRoute.put(function(req, res) {
		if(req.body.pendingTasks == "undefined")
			req.body.pendingTasks = [];
		User.findById(req.params.id, function(err, user) {
			if(!user)
				return res.status(404).send({message: "Not Found", data:[]});
			user.name = req.body.name;
			user.email = req.body.email;
			user.pendingTasks = req.body.pendingTasks;
			user.save(function(err) {
				if(err)
					return res.status(500).send({message: 'Server error', data:[]});
				else
					return res.status(200).send({message: 'User updated', data: user});
			});
		});
	});
	usersIdRoute.delete(function(req, res) {
		User.findByIdAndRemove(req.params.id, function(err, user) {
			if(!user)
				return res.status(404).send({message: 'User not found', data:[]});
			else if(err)
				return res.status(500).send({message: 'Server error', data:[]});
			else
				return res.status(200).send({message: 'User deleted', data: []});
		});
	});

    return router;
}
