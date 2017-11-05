var secrets = require('../config/secrets');
var Task = require('../models/task.js');

module.exports = function (router) {

    var tasksIdRoute = router.route('/tasks/:id');

    tasksIdRoute.get(function(req, res) {
		Task.findById(req.params.id).exec()
		.then((task) => {
			if(task == null)
				return res.status(404).send({message: 'Task not found', data:[]});
			else
				return res.status(200).send({message: 'Task retrieved', data: task});
		})
		.catch((err) => {
			return res.status(500).send({message: 'Server error', data:[]});
		});
	});
	tasksIdRoute.put(function(req, res) { // change find and save to just update?
		Task.findById(req.params.id).exec()
		.then((task) => {
			if(task == null)
				return res.status(404).send({message: 'Task not found', data:[]});
			else {
				task.name = req.body.name;
				task.description = req.body.description;
				task.deadline = req.body.deadline;
				task.completed = req.body.completed;
				task.assignedUser = req.body.assignedUser;
				task.assignedUserName = req.body.assignedUserName;
				task.save()
				.then(() => {
					return res.status(200).send({message: 'Task updated', data: task});
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
	tasksIdRoute.delete(function(req, res) {
		Task.findByIdAndRemove(req.params.id).exec()
		.then((task) => {
			if(task == null)
				return res.status(404).send({message: 'Task not found', data:[]});
			else {
				return res.status(200).send({message: 'Task deleted', data: []});
			}
		})
		.catch((err) => {
			return res.status(500).send({message: 'Server error', data:[]});
		});
	});

    return router;
}
