/**
 * Created by Frederick on 17/04/2016.
 */
angular.module('users').factory('Users', ['$resource',
    function($resource) {
        return $resource('/users/:userId', {
            favourId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);