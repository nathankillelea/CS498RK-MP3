var secrets = require('../config/secrets');
var Task = require('../models/task.js');

module.exports = function (router) {

    var tasksRoute = router.route('/tasks');

    tasksRoute.get(function(req, res) {
		if(!req.query.count) {
			Task.find(eval("("+req.query.where+")")).sort(eval("("+req.query.sort+")")).select(eval("("+req.query.select+")")).skip(eval("("+req.query.skip+")")).limit(eval("("+req.query.limit+")")).exec()
			.then((tasks) => {
				return res.status(200).send({message: 'Tasks retrieved', data: tasks});
			})
			.catch((err) => {
				return res.status(500).send({message: 'Server error', data:[]});
			});
		}
		else {
			Task.count(eval("("+req.query.count+")")).exec()
			.then((count) => {
				return res.status(200).send({message: 'Count retrieved', data: count});
			})
			.catch((err) => {
				return res.status(500).send({message: 'Server error', data:[]});
			});
		}
	});
	tasksRoute.post(function(req, res) {
		var newTask = new Task();
		newTask.name = req.body.name;
		newTask.description = req.body.description;
		newTask.deadline = req.body.deadline;
		newTask.completed = req.body.completed;
		newTask.assignedUser = req.body.assignedUser;
		newTask.assignedUserName = req.body.assignedUserName;
		newTask.save()
		.then(() => {
			return res.status(201).send({message: 'New task created:', data: newTask});
		})
		.catch((err) => {
			return res.status(500).send({message: 'Server error', data:[]});
		});
	});

    return router;
}
