'use strict';

/**
 * @ngdoc service
 * @name clienteApp.titandesagregService
 * @description
 * # titandesagregService
 * Factory in the clienteApp.
 */
angular.module('titandesagregService', [])
    .factory('titandesagregRequest', function($http, token_service, CONF) {
        // Service logic
        // ...
        var path = CONF.GENERAL.TITANDESAGREG_SERVICE;

        // Public API here
        return {
            getAll: function(table, params) {
                return $http.get(path + table + "/?" + params, token_service.getHeader());
            },
            post: function(table, elemento) {
                return $http.post(path + table, elemento, token_service.getHeader());
                //return $http.post(path + table, elemento);
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