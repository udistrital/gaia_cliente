'use strict';

/**
* @ngdoc function
* @name clienteApp.controller:ResolucionBusquedaDocenteCtrl
* @description
* # ResolucionBusquedaDocenteCtrl
*/
angular.module('resolucionesClienteApp')
  .controller('ResolucionBusquedaDocenteCtrl', function (resolucionRequest, $scope) {
    $scope.listaResoluciones = [];
    $scope.idDocente = "";

    $scope.queryDocente = function (query) {
      //console.log(query)

      // valida la cedula de la persona
      var intId = parseInt(query);

      var q = $.param({
        limit: -1,
        query: "PersonaId:" + intId.toString()
      });

      resolucionRequest.get("vinculacion_docente/", q).then(function (response) {
        $scope.listaResoluciones = [];
        if (!response.data.Success) {
          return;
        }
        var idResolucionesConsultadas = [];
        response.data.Data.forEach(function (elem) {
          var idResolucion = elem.ResolucionVinculacionDocenteId.Id;
          if (!idResolucionesConsultadas.includes(idResolucion)) {
            resolucionRequest.get("resolucion/" + idResolucion).then(function (res) {
              var NumeroResolucion = res.data.Data.NumeroResolucion;
              if (!$scope.listaResoluciones.includes(NumeroResolucion)) {
                $scope.listaResoluciones.push(NumeroResolucion);
              }
            });
          }
          idResolucionesConsultadas.push(idResolucion);
        });
      });
    };

  });
