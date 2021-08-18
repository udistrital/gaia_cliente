'use strict';

/**
 * @ngdoc service
 * @name resolucionesClienteApp.requestRequest
 * @description
 * # requestService
 * Service in the resolucionesClienteApp.
 */
angular.module('requestService', [])
    .factory('requestRequest', function($q) {
        // Service logic
        // ...
        //var canceller = $q.defer();
        var promises = [];
        // Public API here
        return {
            get: function() {
                return promises;
            },
            add: function(promise) {
                var defered = $q.defer();
                defered.resolve(promise);
                promises.push(defered);
                return defered.promise;
            },
            cancel_all: function() {
                angular.forEach(promises, function(p) {

                    if (!angular.isUndefined(p)) {
                        return p.reject('CANCELED');
                        /*if (p.promise.$$state.status) {
                        } else {
                            p.resolve();
                        }*/
                    }
                });
                return null;
            }
        };

    });