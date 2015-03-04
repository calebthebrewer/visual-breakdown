angular.module('module')
.controller('module', [
		'$scope',
		'module',
		function($scope, module) {
			$scope.addExport = function() {
				module
					.create({name: $scope.exportName, parent: $scope.id})
					.then(function(id) {
						$scope.module.exports.push(id);
						module.update($scope.id, $scope.module);
					});
				$scope.exportName = '';
			};

			$scope.remove = function() {
				module.remove();
			};
		}
	]);