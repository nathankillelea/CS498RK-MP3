// https://www.youtube.com/watch?v=Eqhero22-Rg
// https://expressjs.com/en/guide/routing.html
// http://mongoosejs.com/docs/promises.html
// http://mongoosejs.com/docs/queries.html
// https://www.npmjs.com/package/mongoose

var secrets = require('../config/secrets');
var User = require('../models/user.js');

module.exports = function (router) {

    var usersRoute = router.route('/users');

    usersRoute.get(function(req, res) {
		if(!req.query.count) {
			User.find(eval("("+req.query.where+")")).sort(eval("("+req.query.sort+")")).select(eval("("+req.query.select+")")).skip(eval("("+req.query.skip+")")).limit(eval("("+req.query.limit+")")).exec()
			.then((users) => {
				return res.status(200).send({message: 'Users retrieved', data: users});
			})
			.catch((err) => {
				return res.status(500).send({message: 'Server error', data: []});
			});
		}
		else {
			User.count(eval("("+req.query.where+")")).exec()
			.then((count) => {
				return res.status(200).send({message: 'Count retrieved', data: count});
			})
			.catch((err) => {
				return res.status(500).send({message: 'Server error', data: []});
			});
		}
	});
	usersRoute.post(function(req, res) {
		var newUser = new User();
		newUser.name = req.body.name;
		newUser.email = req.body.email;
		newUser.pendingTasks = [];
		User.findOne({email: newUser.email}).exec() // query for duplicate email
		.then((user) => {
			if(user == null) { // if there is no user with this email, save
				newUser.save()
				.then(() => {
					return res.status(201).send({message: 'New user created', data: newUser});
				})
				.catch((err) => {
					return res.status(500).send({message: 'Server error', data: []});
				});
			}
			else
				return res.status(500).send({message: 'The entered email is already registered', data: []});
 		})
		.catch((err) => {
			return res.status(500).send({message: 'Server error', data: []});
		});
	});

    return router;
}
