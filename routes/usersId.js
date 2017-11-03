var secrets = require('../config/secrets');

module.exports = function (router) {

    var usersIdRoute = router.route('/users/:id');

    usersIdRoute
	.get(function(req, res) {

	});
	.put(function(req, res) {

	});
	.delete(function(req, res) {

	});

    return router;
}
