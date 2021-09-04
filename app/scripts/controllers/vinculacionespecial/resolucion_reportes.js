'use strict';

/**
* @ngdoc function
* @name clienteApp.controller:ResolucionReportesCtrl
* @description muestra los reportes generados con SpagoBI
* # ResolucionReportesCtrl
* Controller of the clienteApp
*/
angular.module('resolucionesClienteApp')
  .controller('ResolucionReportesCtrl', function (oikosRequest, adminMidRequest, resolucion, resolucionRequest, $scope, $window, $mdDialog, $translate, gridApiService) {
    var self = this;
    self.nombreReporte = "";
    self.resolucionId = 0;
    self.vigencias = [];
    
    var anio = new Date().getFullYear();
    for (var v = 2018; v <= anio; v++){
      self.vigencias.push(v);
    }

    oikosRequest.get('dependencia_tipo_dependencia', $.param({
      query: "TipoDependenciaId.Id:2",
      limit: -1
    })).then(function (response) {
        self.facultades = response.data;
    });    

    self.consultarReporte = function() {
      if (self.facultad && self.numeroResolucion && self.vigencia) {
        resolucionRequest.get("resolucion", $.param({
          query: "DependenciaId:" + self.facultad + ",Vigencia:" + self.vigencia + ",NumeroResolucion:" + self.numeroResolucion,
          limit: 1,
          sortby: "Id",
          order: "desc"
        }, true)).then(function (resolucion) {
          if (resolucion.data.Success){
            if (resolucion.data.Data[0].TipoResolucionId.Id === 1){
              resolucionRequest.get("resolucion_estado", $.param({
                query: "ResolucionId.Id:" + resolucion.data.Data[0].Id,
                limit: 1,
                sortby: "Id",
                order: "desc"
              }, true)).then(function (estado) {
                if (estado.data.Data[0].EstadoResolucionId.Id === 2){
                  self.resolucionId = resolucion.data.Data[0].Id;
                } else {
                  swal({
                    title: $translate.instant('ERROR'),
                    text: $translate.instant('RESOLUCION_NO_EXPEDIDA'),
                    type: 'error',
                    confirmButtonText: $translate.instant('ACEPTAR')
                  });
                }
              });
            } else {
              swal({
                title: $translate.instant('ERROR'),
                text: $translate.instant('RESOLUCION_NO_VINCULACION'),
                type: 'error',
                confirmButtonText: $translate.instant('ACEPTAR')
              });
            }
          } else {
            swal({
              title: $translate.instant('ERROR'),
              text: $translate.instant('NO_EXISTE_RESOLUCION'),
              type: 'error',
              confirmButtonText: $translate.instant('ACEPTAR')
            });
          }
        })
      } else {
        swal({
          title: $translate.instant('ERROR'),
          text: $translate.instant('COMPLETE_CAMPOS'),
          type: 'error',
          confirmButtonText: $translate.instant('ACEPTAR')
        })
      }
    }
  });
