'use strict';

/**
 * @ngdoc service
 * @name resolucionesClienteApp.gridOptionsService
 * @description
 * # gridOptionsService
 * Service in the resolucionesClienteApp.
 */
angular.module('gridOptionsService',[])
  .factory('gridOptionsService', function ($q) {

    return{
      build: function(service, endPoint, params, gridOptionsSource){
        var deferred = $q.defer();
        var gridOptions = {};
        gridOptions = gridOptionsSource;
        gridOptions.columnDefs = gridOptionsSource.columnDefs;
        service.get(endPoint, params).then(function(response) {
          if (Array.isArray(response.data)){
            gridOptions.data = response.data;
          } else if (Array.isArray(response.data.Data)) {
            gridOptions.data = response.data.Data;
          } else {
            gridOptions.data = null;
          }
          
          deferred.resolve(gridOptions);
        });

        return deferred.promise;
      }
    };
  });
