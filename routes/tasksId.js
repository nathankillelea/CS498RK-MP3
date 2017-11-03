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
		Task.findByIdAndUpdate(req.params.id, { $set: {name: req.body.name, email: req.body.email, pendingTasks: req.body.pendingTasks}}, function(err, task) {
			if(err) {
				//do stuff
			}
			else {
				return res.status(200).send({message: 'Task Put', data: task});
			}
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
