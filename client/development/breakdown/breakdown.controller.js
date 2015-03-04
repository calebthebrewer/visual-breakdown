angular.module('breakdown')
	.controller('breakdown', [
		'$scope',
		'$stateParams',
		function($scope, $stateParams) {
			$scope.moduleId = $stateParams.id;
		}
	]);