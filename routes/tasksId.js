var secrets = require('../config/secrets');

module.exports = function (router) {

    var tasksIdRoute = router.route('/tasks/:id');

    tasksIdRoute
	.get(function(req, res) {

	});
	.put(function(req, res) {

	});
	.delete(function(req, res) {

	});

    return router;
}
