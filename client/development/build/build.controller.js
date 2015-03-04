angular.module('build')
.controller('build', [
		'$scope',
		function($scope) {
			$scope.breakdown = function() {
				var input = $scope.rawFile,
					output = [];

				$scope.processedFile = output;
			};
		}
	]);