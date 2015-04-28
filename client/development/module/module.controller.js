angular.module('module')
.controller('module', [
		'$scope',
		'module',
		function($scope, module) {

			$scope.save = function save() {
				module.update($scope.module._id, $scope.module);
				$scope.output = render();
			};

			$scope.new = function(name) {
				name;
			};

			$scope.save();

			function render() {
				var output = 'function ' + $scope.module.name;
				output += renderParameters($scope.module.parameters, $scope.module.parametersType);
				output += $scope.module.body + '\n';
				output += renderReturn($scope.module.exports);
				output += '}';
				return output;
			}

			function renderParameters(parameters, type) {
				var output = '(';

				if (parameters.length < 1) {
					output += ') {\n';
				} else {
					switch (type) {
						case 'options':
							output += 'options) {\n';
							parameters.forEach(function (parameter) {
								output += 'var ' + parameter.text + ' = options.' + parameter.text + ';\n';
							});
							break;
						default:
							parameters.forEach(function(parameter, index, array) {
								output += parameter.text;
								if (index < array.length - 1) {
									output += ', ';
								}
							});
							output += ') {\n';
							break;
					}
				}

				return output;
			}

			function renderReturn(exports) {
				var output = '';

				if (exports.length > 0) {
					output += 'return ';
					if (exports.length === 1) {
						output += exports[0].text + ';\n';
					} else {
						output += '{\n';
						exports.forEach(function(exported, index, array) {
							output += '\t' + exported.text + ': ' + exported.text;
							if (index < array.length - 1) {
								output += ',\n';
							}
						});
						output += '\n};\n';
					}
				}

				return output;
			}
		}
	]);
