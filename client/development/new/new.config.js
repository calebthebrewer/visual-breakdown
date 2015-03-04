angular.module('new')
.config([
		'$stateProvider',
		function($stateProvider) {
			$stateProvider
				.state('new', {
					url: '/new',
					templateUrl: 'new/new.tpl.html',
					controller: 'new'
				});
		}
	]);