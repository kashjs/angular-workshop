angular.module('myApp').
    controller('mainCtrl', ['$scope', 'globalIndicators', function ($scope, globalIndicators) {
        $scope.indicators = globalIndicators;
    }]).
    controller('winesCtrl', ['$scope', 'wines', 'globalIndicators', function ($scope, wines, globalIndicators) {
        // ========== local data ========== //
        $scope.models = {
            wines: []
        };
        $scope.indicators = {

        };
        $scope.sharedModels = {
            scopeTestInputText: 'scope test text',
            today: new Date()
        };

        // ========== ui handlers ============ //
        $scope.wineBarClicked = function (wine) {
            console.log(wine)
        }

        // =========== initialization ========== //
        globalIndicators.loading = true;
        wines.query(function (wines) {
            $scope.models.wines = wines;
            globalIndicators.loading = false;
        });
    }]).
    controller('wineCtrl', ['$scope', '$routeParams', '$location', 'wines', 'globalIndicators', function ($scope, $routeParams, $location, wines, globalIndicators) {
        // ========== local data ========== //
        $scope.models = {
            wine: {
                picture: 'generic.jpg',
                likes: 0
            }
        };
        $scope.indicators = {
            newWine: false
        };

        // ========== ui handlers ========== //
        $scope.saveWine = function () {
            var wine = $scope.models.wine;
            if (wine._id) {
                wines.update({id: wine._id}, wine);
            } else {
                wines.save({}, wine, function (wine) {
                    $scope.models.wine = wine;
                },
                    function () {
                        alert()
                    }
                );
            }
        };

        $scope.deleteWine = function() {
            wines.delete({id: $scope.models.wine._id});
            $location.url('/wines');
        };

        // =========== initialization ========== //
        if ($routeParams.id) {
            globalIndicators.loading = true;
            wines.get({id: $routeParams.id},function (wine) {
                $scope.models.wine = wine;
                globalIndicators.loading = false;
            });
        } else {
            $scope.indicators.newWine = true;
        }
    }])