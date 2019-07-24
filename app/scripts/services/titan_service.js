'use strict';

/**
 * @ngdoc service
 * @name clienteApp.titanService
 * @description
 * # titanService
 * Factory in the clienteApp.
 */
angular.module('titan_service', [])
    .factory('titan_request', function($http, token_service, CONF) {
        // Service logic
        // ...
        var path = CONF.GENERAL.TITAN_SERVICE;

        // Public API here
        return {
            getAll: function(table, params) {
                return $http.get(path + table + "/?" + params, token_service.getHeader());
            },
            post: function(table, elemento) {
                return $http.post(path + table, elemento, token_service.getHeader());
            },
            delete: function(table, id) {
                return $http.delete(path + table + "/" + id, token_service.getHeader());
            },
            getOne: function(table, id) {
                return $http.get(path + table + "/" + id, token_service.getHeader());
            },
            put: function(table, id, elemento) {
                return $http.put(path + table + "/" + id, elemento, token_service.getHeader());
            }
        };
    });