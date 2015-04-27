var q = require('q');
var db = require('./db');
var ObjectId = require('mongojs').ObjectId;

var nodes = db.collection('nodes');

module.exports = function(app) {
		app.post('/api/nodes', createNode);
		app.get('/api/nodes/:id', getNode);
		app.put('/api/nodes/:id', updateNode);
		app.delete('/api/nodes/:id', deleteNode);
};

function createNode(req, res) {
	var node = req.body;

	node.exports = [];
	node.parameters = [];

	nodes.save(node, function(error, node) {
		if (!error) {
			res.send(node._id.toString());
		} else {
			res
				.status(500)
				.send(error);
		}
	});
}

function getNode(req, res) {
	nodes.findOne({_id: ObjectId(req.params.id)}, function(error, node) {
		if (!error) {
			res.send(node);
		} else {
			res
				.status(500)
				.send(error);
		}
	});
}

function updateNode(req, res) {
	delete req.body._id;

	nodes
		.update({_id: ObjectId(req.params.id)}, req.body, function(error, node) {
			if (!error) {
				res.send(node);
			} else {
				res
					.status(500)
					.send(error);
			}
		});
}

function deleteNode(req, res) {
	nodes.delete({_id: ObjectId(req.params.id)}, function(error) {
		if (!error) {
			res.send();
		} else {
			res
				.status(500)
				.send(error);
		}
	});
}
