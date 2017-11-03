var secrets = require('../config/secrets');
var Task = require('../models/task.js');

module.exports = function (router) {

    var tasksRoute = router.route('/tasks');

    tasksRoute.get(function(req, res) {
		if(!req.query.count) {
			Task.find(eval("("+req.query.where+")")).sort(eval("("+req.query.sort+")")).select(eval("("+req.query.select+")")).skip(eval("("+req.query.skip+")")).limit(eval("("+req.query.limit+")")).exec(function(err, tasks) {
				if(err) {
					//do stuff
				}
				else {
					return res.status(200).send({message: 'Here are the tasks:', data: tasks});
				}
			});
		}
		else {
			Task.count(eval("("+req.query.where+")")).exec(function(err, count) {
				if(err) {
					//do stuff
				}
				else {
					return res.status(200).send({message: 'Here is the count:', data: count});
				}
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
		newTask.save(function(err) {
			if(err) {
				// throw some errors
			}
			else {
				return res.status(201).send({message: 'New Task Created:', data:newTask});
			}
		});
	});
	tasksRoute.options(function(req, res) {
		res.writeHead(200);
		res.end();
	});

    return router;
}