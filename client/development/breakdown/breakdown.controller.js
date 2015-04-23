angular.module('breakdown')
	.controller('breakdown', [
		'$scope',
		'thisModule',
		function($scope, thisModule) {
			$scope.module = thisModule;
		}
	]);