angular.module('module')
.service('module', [
		'$http',
		'$q',
		function($http, $q) {

			this.create = function(module) {
				var defer = $q.defer();

				$http
					.post('api/nodes', module)
					.success(function(id) {
						defer.resolve(id);
					})
					.error(defer.reject);

				return defer.promise;
			};

			this.get = function(id) {
				if (!id) return getAll();

				var defer = $q.defer();

				$http
					.get('api/nodes/' + id)
					.success(function(module) {
						defer.resolve(module);
					})
					.error(defer.reject);

				return defer.promise;
			};

			this.getAll = function(filters) {
				var defer = $q.defer();

				$http
					.get('api/nodes/', {params: filters})
					.success(function(module) {
						defer.resolve(module);
					})
					.error(defer.reject);

				return defer.promise;
			};

			this.update = function(id, module) {
				var defer = $q.defer();

				$http
					.put('api/nodes/' + id, module)
					.success(defer.resolve)
					.error(defer.reject);

				return defer.promise;
			};

			this.remove = function(id) {
				var defer = $q.defer();

				$http
					.delete('api/nodes/' + id)
					.success(defer.resolve)
					.error(defer.reject);

				return defer.promise;
			};
		}
	]);