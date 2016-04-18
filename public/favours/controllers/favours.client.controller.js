angular.module('favours').controller('FavoursController', ['$scope',
    '$routeParams', '$location', 'Authentication', 'Favours',
    function($scope, $routeParams, $location, Authentication, Favours) {
        $scope.authentication = Authentication;

        $scope.create = function () {
            var favour = new Favours({
                description: this.description,
                subject: this.subject,
                level: this.level
            });
            favour.$save(function (response) {
                $location.path('favours/');
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        $scope.find = function () {
            $scope.favours = Favours.query();
        };
        $scope.findOne = function () {
            $scope.favour = Favours.get({
                favourId: $routeParams.favourId
            });
        };
        $scope.update = function () {
            $scope.favour.$update(function () {
                $location.path('favours/' + $scope.favour._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        $scope.delete = function (favour) {
            if (favour) {
                favour.$remove(function () {
                    for (var i in $scope.favours) {
                        if ($scope.favours[i] === favour) {
                            $scope.favours.splice(i, 1);
                        }
                    }
                });
            } else {
                $scope.favour.$remove(function () {
                    $location.path('favours');
                });
            }
        };
    }
]);
