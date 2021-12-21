'use strict';

angular.module('resolucionesClienteApp')
  .controller('ResolucionReduccionDetalleCtrl', function (resolucionRequest, resolucion, resolucionesMidRequest, oikosRequest, $localStorage, $scope, $mdDialog, $translate, $window) {

    var self = this;

    self.resolucion = JSON.parse(localStorage.getItem("resolucion"));
    self.resolucion_id_nueva = self.resolucion.Id;
    self.estado = false;
    self.proyectos = [];
    self.vigencia_data = self.resolucion.Vigencia;
    self.fecha = new Date();
    self.saldo_disponible = true;
    var desvinculacionesData = [];

    self.precontratados_adicion = {
      paginationPageSizes: [10, 15, 20],
      paginationPageSize: 10,
      enableRowSelection: false,
      enableRowHeaderSelection: false,
      enableFiltering: true,
      enableHorizontalScrollbar: 0,
      enableVerticalScrollbar: true,
      useExternalPagination: false,
      enableSelectAll: false,
      columnDefs: [
        { field: 'Id', visible: false },
        { field: 'FechaCreacion', visible: false },
        { field: 'NombreCompleto', width: '15%', displayName: $translate.instant('NOMBRE') },
        { field: 'PersonaId', width: '10%', displayName: $translate.instant('DOCUMENTO_DOCENTES') },
        { field: 'Categoria', width: '10%', displayName: $translate.instant('CATEGORIA') },
        { field: 'Dedicacion', width: '15%', displayName: $translate.instant('DEDICACION') },
        { field: 'DedicacionId.Id', visible: false },
        { field: 'Disponibilidad', visible: false },
        { field: 'NumeroHorasSemanales', width: '10%', displayName: $translate.instant('HORAS_REVERSAR') },
        { field: 'NumeroSemanas', width: '10%', displayName: $translate.instant('SEMANAS_REV') },
        { field: 'NumeroDisponibilidad', width: '10%', displayName: $translate.instant('NUM_DISPO_DOCENTE') },
        { field: 'ValorContrato', width: '10%', displayName: $translate.instant('VALOR_CONTRATO_REV'), cellClass: "valorEfectivo", cellFilter: "currency" },
        {
          field: 'ProyectoCurricularId', visible: false, filter: {
            term: self.term
          }
        },
        {
          field: 'cancelar',
          enableSorting: false,
          enableFiltering: false,
          width: '15%',
          displayName: $translate.instant('OPCIONES'),
          cellTemplate: '<center>' +
            '<a class="borrar" ng-click="grid.appScope.verAnularAdicion(row)">' +
            '<em title="{{\'ANULAR_BTN\' | translate }}" class="fa fa-times-circle-o fa-lg  faa-shake animated-hover"></em></a></div>' +
            '</center>'
        }
      ],

      onRegisterApi: function (gridApi) {
        self.precontratados_adicion.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope, function () {
          self.personasSeleccionadas = gridApi.selection.getSelectedRows();

        });
      }
    };



    oikosRequest.get("dependencia/proyectosPorFacultad/" + self.resolucion.FacultadId + "/" + self.resolucion.NivelAcademico, "").then(function (response) {
      self.proyectos = response.data;
      self.defaultSelectedPrecont = self.proyectos[0].Id;
    });

    resolucionRequest.get("modificacion_resolucion", "limit=-1&query=ResolucionNuevaId.Id:" + self.resolucion.Id).then(function (response) {
      self.resolucion.Id = response.data.Data[0].ResolucionAnteriorId.Id;
      self.resolucion_id_nueva = response.data.Data[0].ResolucionNuevaId.Id;
      self.id_modificacion_resolucion = response.data.Data[0].Id;
      self.get_docentes_vinculados_adicion().then(function () {
        //   //refresca una vez cargados los docentes precontratados
        self.precontratados_adicion.gridApi.core.refresh();
      });
    });
    //Función para visualizar docentes ya vinculados a resolución
    self.get_docentes_vinculados_adicion = function () {
      self.estado = true;
      var r = resolucionesMidRequest.get("gestion_desvinculaciones/docentes_desvinculados", "id_resolucion=" + self.resolucion_id_nueva).then(function (response) {
        self.precontratados_adicion.data = response.data.Data;
        self.estado = false;
      });

      self.precontratados_adicion.columnDefs[12].filter.term = self.term;
      return r;
    };

    $scope.verAnularAdicion = function (row) {
      swal({
        title: $translate.instant('PREGUNTA_SEGURO'),
        text: $translate.instant('PREGUNTA_SEGURO_ANULAR_RED'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: $translate.instant('CONFIRMAR_ANULAR_REDUCCION'),
        cancelButtonText: $translate.instant('CANCELAR'),
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
      }).then(function () {
        self.AnularAdicionDocente(row);
      }, function (dismiss) {
        if (dismiss === 'cancel') {
          swal(
            $translate.instant('CANCELADO'),
            $translate.instant('ANULACION_CANCELADA'),
            'error'
          );
        }
      });
    };

    self.AnularAdicionDocente = function (row) {
      var docente_a_anular = {
        Id: row.entity.Id,
        PersonaId: row.entity.PersonaId,
        NumeroHorasSemanales: row.entity.NumeroHorasSemanales,
        NumeroSemanas: row.entity.NumeroSemanas,
        ResolucionVinculacionDocenteId: { Id: self.resolucion.Id },
        DedicacionId: { Id: row.entity.DedicacionId.Id },
        ProyectoCurricularId: row.entity.ProyectoCurricularId,
        Activo: Boolean(true),
        FechaCreacion: self.fecha,
        ValorContrato: row.entity.ValorContrato,
        Categoria: row.entity.Categoria,
        DependenciaAcademica: row.entity.DependenciaAcademica,
        Disponibilidad: row.entity.Disponibilidad
      };

      desvinculacionesData.push(docente_a_anular);

      var objeto_a_enviar = {
        IdModificacionResolucion: self.id_modificacion_resolucion,
        DocentesDesvincular: desvinculacionesData
      };

      resolucionesMidRequest.post("gestion_desvinculaciones/anular_adicion", objeto_a_enviar).then(function (response) {
        if (response.data.Data === "OK") {
          swal({
            text: $translate.instant('ALERTA_ANULACION_EXITOSA'),
            type: 'success',
            confirmButtonText: $translate.instant('ACEPTAR')
          });
          $window.location.reload();
        } else {
          swal({
            title: $translate.instant('ERROR'),
            text: $translate.instant('ALERTA_ERROR_ANULACION'),
            type: 'error',
            confirmButtonText: $translate.instant('ACEPTAR')
          });
        }
      });
    };
  });
