'use strict';

/**
 * @ngdoc service
 * @name resolucionesClienteApp.orden
 * @description
 * # orden
 * Factory in the resolucionesClienteApp.
 */
angular.module('resolucionesClienteApp')
  .factory('cookie', function ($cookies) {
    var methods = {
        get: function(name) {
            return $cookies.get(name);
        }
    };
    return methods;
    });
