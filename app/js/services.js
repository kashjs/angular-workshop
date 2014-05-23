angular.module('myApp').
    value('globalIndicators', { loading: true }).
    factory('wineService', ['$q', '$http', 'apiBaseUrl', function ($q, $http, apiBaseUrl) {
        function _getWines () {
            var defer = $q.defer();
            $http.get(apiBaseUrl + 'wines').then(function (response) {
                defer.resolve(response.data);
            });
            return defer.promise;
        }

        function _getWine(id) {
            var defer = $q.defer();
            $http.get(apiBaseUrl + 'wines/' + id).then(function (response) {
                defer.resolve(response.data);
            });
            return defer.promise;
        }

        function _saveWine(wine) {
            var defer = $q.defer();
            if (wine._id) {
                $http.put(apiBaseUrl + 'wines/' + wine._id, wine).then(function (response) {
                    defer.resolve(response.data);
                });
            } else {
                $http.post(apiBaseUrl + 'wines', wine).then(function (response) {
                    defer.resolve(response.data);
                });
            }
            return defer.promise;
        }

        function _deleteWine(wine) {
            var defer = $q.defer();
            $http.put(apiBaseUrl + 'wines/' + wine._id).then(function (response) {
                defer.resolve(response.data);
            });
            return defer.promise;
        }

        // ========== public methods ==========
        return {
            getWines: _getWines,
            getWine: _getWine,
            saveWine: _saveWine,
            deleteWine: _deleteWine
        };
    }]).
factory('wines', ['$resource', 'apiBaseUrl', function ($resource, apiBaseUrl) {
        return $resource(apiBaseUrl + 'wines/:id', null,
            {
                'update': { method:'PUT' }
            }
        );
    }]);