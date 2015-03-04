angular.module('build')
	.config([
		function($stateProvider) {
			$stateProvider
				.state('build', {
					url: '/build',
					templateUrl: 'build/build.tpl.html',
					controller: 'build'
				});
		}]);