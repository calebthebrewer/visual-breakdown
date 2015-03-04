angular.module('new')
.controller('new', [
		'$scope',
		'module',
		'$state',
		function($scope, module, $state) {
			$scope.newBreakdown = function() {
				module
					.create($scope.module)
					.then(function(id) {
						$state.go('breakdown', {id: id});
					});
			};
		}
	]);