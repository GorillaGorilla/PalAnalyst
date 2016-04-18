/**
 * Created by Frederick on 17/04/2016.
 */
angular.module('users').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/people', {
            templateUrl: 'blusers/views/list-users.client.view.html'
        })
    }
]);