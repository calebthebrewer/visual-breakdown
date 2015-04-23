angular.module('module')
.directive('module', [
		'module',
		function(module) {
			return {
				restrict: 'EA',
				scope: {
					id: '=',
					module: '=?',
					children: '@?',
					display: '@?'
				},
				controller: 'module',
				templateUrl: function(element, attributes) {
					return 'module/' + (attributes.display || 'module') + '.tpl.html';
				},
				link: function($scope) {
					if (!$scope.module) {
						if ($scope.id) {
							module.get($scope.id)
								.then(function(currentModule) {
									$scope.module = currentModule;
								});
						} else {
							$scope.module = {};
						}

					}
				}
			};
		}
	]);