/**
 * Created by Frederick on 17/04/2016.
 */
angular.module('favours').factory('Favours', ['$resource',
    function($resource) {
        return $resource('api/favours/:favourId', {
            favourId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);