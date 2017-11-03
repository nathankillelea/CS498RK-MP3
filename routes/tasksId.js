var secrets = require('../config/secrets');
var Task = require('../models/task.js');

module.exports = function (router) {

    var tasksIdRoute = router.route('/tasks/:id');

    tasksIdRoute.get(function(req, res) {
		Task.findById(req.params.id, function(err, task) {
			if(!task)
				return res.status(404).send({message: 'Task not found', data:[]});
			else if(err)
				return res.status(500).send({message: 'Server error', data:[]});
			else
				return res.status(200).send({message: 'Task retrieved', data: task});
		});
	});
	tasksIdRoute.put(function(req, res) {
		Task.findById(req.params.id, /*{ $set: {"name": req.body.name, "description": req.body.description, "deadline": req.body.deadline, "completed": req.body.completed, "assignedUser": req.body.assignedUser, "assignedUserName": req.body.assignedUserName} },*/ function(err, task) {
			if(!task)
				return res.status(404).send({message: 'Task not found', data:[]});
			task.name = req.body.name;
			task.description = req.body.description;
			task.deadline = req.body.deadline;
			task.completed = req.body.completed;
			task.assignedUser = req.body.assignedUser;
			task.assignedUserName = req.body.assignedUserName;
			task.save(function(err) {
				if(err)
					return res.status(500).send({message: 'Server error', data:[]});
				else
					return res.status(200).send({message: 'Task updated', data: task});
			});
		});
	});
	tasksIdRoute.delete(function(req, res) {
		Task.findByIdAndRemove(req.params.id, function(err, task) {
			if(!task)
				return res.status(404).send({message: 'Task not found', data:[]});
			else if(err)
				return res.status(500).send({message: 'Server error', data:[]});
			else
				return res.status(200).send({message: 'Task deleted', data: []});
		});
	});

    return router;
}
