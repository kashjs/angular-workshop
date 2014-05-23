angular.module('myApp').
    directive('winePreview', ['$location', '$rootScope', 'wines', function($location, $rootScope, wines) {
        return {
            restrict: 'E',
            scope: {
                wine: '='
            },
            templateUrl: 'templates/winePreview.html',
            controller: ['$scope', function ($scope) {
                $scope.navigateToWinePage = function (wine) {
                    $location.url('wine/' + wine._id);
                };

                $scope.likeWine = function(wine) {
                    wine.liked = true;
                    wine.likes++;
                    wines.update({id: wine._id}, wine);
                };
            }]
        };
    }]).
    directive('scopeTest', [function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/scopeTest.html',
            scope: true
        };
    }]).
    directive('barChart', ['$window', function ($window) {
        return {
            restrict: 'E',
            scope: {
                data: '=',
                onClick: '&'
            },
            link: function (scope, element, attributes) {
                var svg = d3.select(element[0])
                    .append('svg')
                    .style('width', '100%'),
                    barHeight = 20,
                    barGap = 5,
                    margin = 20

                scope.render = function () {
                    svg.selectAll('*').remove();

                    var barWidth = svg[0][0].offsetWidth - margin,
                        svgHeight = scope.data.length * (barHeight + barGap),
                        colors = d3.scale.category10(),
                        scale = d3.scale.linear()
                            .domain([0, d3.max(scope.data, function(d) {
                                return d.likes;
                            })])
                            .range([0, barWidth]);

                    svg.style('height', svgHeight);

                    svg.selectAll('rect')
                        .data(scope.data)
                        .enter()
                        .append('rect')
                        .on('click', function (d) {
                            scope.onClick({item: d});
                        })
                        .attr('height', barHeight)
                        .attr('width', function(d) {
                            return scale(d.likes)
                        })
                        .attr('x', margin / 2)
                        .attr('y', function (d, i) {
                            return i * (barHeight + barGap)
                        })
                        .attr('fill', function (d) {
                            return colors(d.likes);
                        })

                    svg.selectAll('text')
                        .data(scope.data)
                        .enter()
                        .append('text')
                        .on('click', function (d) {
                            scope.onClick({item: d});
                        })
                        .attr('x', 15)
                        .attr('y', function (d, i) {
                            return i * (barHeight + barGap) + 13;
                        })
                        .attr('fill', '#FFF')
                        .text(function (d) {
                            return d.name + ' / ' + d.likes;
                        })
                        .style({'font-size': '10px'});
                }

                angular.element($window).on('resize', function() {
                   scope.render();
                   scope.$digest();
                });

                scope.$watch('data', function() {
                    scope.render();
                }, true);
            }
        };
    }]);