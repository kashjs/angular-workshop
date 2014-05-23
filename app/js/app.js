angular.module('myApp', ['ngRoute', 'ngResource']).
    config(['$routeProvider', function ($routeProvider) {
        'use strict';
        $routeProvider.when('/wines', {templateUrl: 'templates/winesView.html', controller: 'winesCtrl'});
        $routeProvider.when('/wine/new', {templateUrl: 'templates/wineView.html', controller: 'wineCtrl'});
        $routeProvider.when('/wine/:id', {templateUrl: 'templates/wineView.html', controller: 'wineCtrl'});
    }]);