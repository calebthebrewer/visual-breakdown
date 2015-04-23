angular.module('module')
.controller('module', [
		'$scope',
		'module',
		function($scope, module) {

			$scope.save = function save() {
				module.update($scope.module._id, $scope.module);
				render();
			};

			$scope.save();

			function render() {
				var output = 'function ' + $scope.module.name + '(';
				$scope.module.parameters.forEach(function(parameter, index, array) {
					output += parameter.text;
					if (index < array.length - 1) {
						output += ', ';
					}
				});
				output += ') {\n';
				output += $scope.module.body + '\n';
				output += 'return {\n';
				$scope.module.exports.forEach(function(exported, index, array) {
					output += '\t' + exported.text + ': ' + exported.text;
					if (index < array.length - 1) {
						output += ',\n';
					}
				});
				output += '\n};\n}'
				$scope.output = output;
			};
		}
	]);