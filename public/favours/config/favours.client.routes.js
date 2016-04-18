/**
 * Created by Frederick on 17/04/2016.
 */
angular.module('favours').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/favours', {
            templateUrl: 'favours/views/list-favours.client.view.html'
        }).when('/favours/create', {
            templateUrl: 'favours/views/log-favour.client.view.html'
        }).when('/favours/:favourId', {
            templateUrl: 'favours/views/view-favour.client.view.html'
        });
    }
]);