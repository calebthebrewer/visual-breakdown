angular.module('collection')
	.controller('collection', [
		'$scope',
		'modules',
		function($scope, modules) {
			$scope.modules = modules;
		}
	]);