angular.module('breakdown')
	.config([
		'$stateProvider',
		function($stateProvider) {

			$stateProvider
				.state('breakdown', {
					url: '/breakdown/:id',
					templateUrl: 'breakdown/breakdown.tpl.html',
					controller: 'breakdown',
					resolve: {
						thisModule: [
							'$stateParams',
							'module',
							function($stateParams, module) {
								return module.get($stateParams.id);
							}]
					}
				});
		}]);