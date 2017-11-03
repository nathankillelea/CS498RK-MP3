var secrets = require('../config/secrets');
var Task = require('../models/task.js');

module.exports = function (router) {

    var tasksIdRoute = router.route('/tasks/:id');

    tasksIdRoute.get(function(req, res) {
		Task.findById(req.params.id, function(err, task) {
			if(err) {
				//do stuff
			}
			else {
				return res.status(200).send({message: 'Here is the Task:', data: task});
			}
		});
	});
	tasksIdRoute.put(function(req, res) {
		Task.findById(req.params.id, /*{ $set: {"name": req.body.name, "description": req.body.description, "deadline": req.body.deadline, "completed": req.body.completed, "assignedUser": req.body.assignedUser, "assignedUserName": req.body.assignedUserName} },*/ function(err, task) {
			task.name = req.body.name;
			task.description = req.body.description;
			task.deadline = req.body.deadline;
			task.completed = req.body.completed;
			task.assignedUser = req.body.assignedUser;
			task.assignedUserName = req.body.assignedUserName;
			task.save(function(err) {
				if(err) {
					// throw some errors
				}
				else
					return res.status(200).send({message: 'Task Put', data: task});
			});
		});
	});
	tasksIdRoute.delete(function(req, res) {
		Task.findByIdAndRemove(req.params.id, function(err) {
			if(err) {
				//do stuff
			}
			else {
				return res.status(200).send({message: 'Task deleted', data: []});
			}
		});
	});

    return router;
}
