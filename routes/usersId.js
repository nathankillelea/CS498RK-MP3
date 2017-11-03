//http://mongoosejs.com/docs/documents.html

var secrets = require('../config/secrets');
var User = require('../models/user.js');

module.exports = function (router) {

    var usersIdRoute = router.route('/users/:id');

    usersIdRoute.get(function(req, res) {
		User.findById(req.params.id).exec()
		.then((user) => {
			if(user == null)
				return res.status(404).send({message: 'User not found', data:[]});
			else
				return res.status(200).send({message: 'User retrieved', data: user});
		})
		.catch((err) => {
			return res.status(500).send({message: 'Server error', data:[]});
		});
	});
	usersIdRoute.put(function(req, res) {
		User.findById(req.params.id).exec()
		.then((user) => {
			if(user == null)
				return res.status(404).send({message: "Not Found", data:[]});
			else {
				user.name = req.body.name;
				user.email = req.body.email;
				if(req.body.pendingTasks == "undefined")
					user.pendingTasks = [];
				else
					user.pendingTasks = req.body.pendingTasks;
				user.save()
				.then(() => {
					return res.status(200).send({message: 'User updated', data: user});
				})
				.catch((err) => {
					return res.status(500).send({message: 'Server error', data:[]});
				});
			}
		})
		.catch((err) => {
			return res.status(500).send({message: 'Server error', data:[]});
		});
	});
	usersIdRoute.delete(function(req, res) {
		User.findByIdAndRemove(req.params.id).exec()
		.then((user) => {
			if(user == null)
				return res.status(404).send({message: 'User not found', data:[]});
			else
				return res.status(200).send({message: 'User deleted', data: []});
		})
		.catch((err) => {
			return res.status(500).send({message: 'Server error', data:[]});
		});
	});

    return router;
}
