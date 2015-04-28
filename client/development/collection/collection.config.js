angular.module('collection')
	.config([
		'$stateProvider',
		function($stateProvider) {
			$stateProvider
				.state('collection', {
					url: '/collection/?type',
					templateUrl: 'collection/collection.tpl.html',
					controller: 'collection',
					resolve: {
						modules: [
							'module',
							'$stateParams',
							function(module, $stateParams) {
								return module.getAll({type: $stateParams.type});
							}]
					}
				});
		}]);