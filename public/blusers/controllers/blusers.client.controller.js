/**
 * Created by Frederick on 17/04/2016.
 */
angular.module('users').controller('UsersController', ['$scope',
    '$routeParams', '$location', 'Authentication', 'Users',
    function($scope, $routeParams, $location, Authentication, Users)
    {
        $scope.authentication = Authentication;
        $scope.find = function() {
            $scope.users = Users.query();
        };
        $scope.add = function() {
            $scope.user.$save(function() {
                $location.path('/');
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);