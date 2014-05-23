angular.module('myApp').
    value('globalIndicators', { loading: true }).
    factory('wineService', ['$q', '$http', 'apiBaseUrl', function ($q, $http, apiBaseUrl) {
        'use strict';

        /**
         * getWines returns all the wines from wines api
         * @returns {promise} - promise that contains wines
         */
        function _getWines () {
            var defer = $q.defer();
            $http.get(apiBaseUrl + 'wines').then(function (response) {
                defer.resolve(response.data);
            });
            return defer.promise;
        }

        /**
         * getWine returns a wine object by Id
         * @param id - the id of the wine for which the wine object is needed
         * @returns {promise} - promise that contains wine object
         * @private
         */
        function _getWine(id) {
            var defer = $q.defer();
            $http.get(apiBaseUrl + 'wines/' + id).then(function (response) {
                defer.resolve(response.data);
            });
            return defer.promise;
        }

        /**
         * saveWine saves/updates the wine object
         * @param wine - wine to be save/updated
         * @returns {promise} - promise that contains the wine object
         */
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

        /**
         * deleteWine deletes the wine
         * @param wine - wine to be deleted
         * @returns {promise} - promise that contains the deleted wine object
         */
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
        'use strict';
        // return the wine resource
        return $resource(apiBaseUrl + 'wines/:id', null,
            {
                'update': { method:'PUT' }
            }
        );
    }]);