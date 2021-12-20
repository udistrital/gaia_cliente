'use strict';

/**
* @ngdoc function
* @name clienteApp.controller:ResolucionBusquedaDocenteCtrl
* @description
* # ResolucionBusquedaDocenteCtrl
*/
angular.module('resolucionesClienteApp')
  .controller('ResolucionBusquedaDocenteCtrl', function (resolucionesMidRequest, $scope) {
    $scope.listaResoluciones = [];
    $scope.idDocente = "";

    $scope.queryDocente = function (query) {
      //console.log(query)

      // valida la cedula de la persona
      var intId = parseInt(query);

      resolucionesMidRequest.get("gestion_resoluciones/consulta_docente/" + intId.toString()).then(function (response) {
        if (response.data.Success) {
          $scope.listaResoluciones = response.data.Data;
        } else {
          return;
        }

      });
    };

  });
