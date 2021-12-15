'use strict';

angular.module('resolucionesClienteApp')
    .controller('HojasDeVidaSeleccionCtrl', function (resolucionRequest, resolucion, adminMidRequest, resolucionesMidRequest, oikosRequest, gridApiService, $localStorage, $scope, $mdDialog, $translate, $window) {

        var self = this;

        self.resolucion = JSON.parse(localStorage.getItem("resolucion"));
        self.estado = false;
        self.estado_ap = false;
        self.proyectos = [];
        self.vigencia_data = self.resolucion.Vigencia;
        var vinculacionesData = [];
        self.offset = 0;
        self.saldo_disponible = true;
        self.personasVincular = [];
        self.personasSeleccionadasAgregar = [];
        self.personasSeleccionadasBorrar = [];
        self.esconderBoton = false;

        self.datosDocentesCargaLectiva = {
            paginationPageSizes: [10, 15, 20],
            paginationPageSize: 10,
            enableRowSelection: true,
            enableRowHeaderSelection: true,
            enableFiltering: true,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: true,
            useExternalPagination: false,
            enableSelectAll: false,

            onRegisterApi: function (gridApi) {
                self.datosDocentesCargaLectiva.gridApi = gridApi;
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {

                    if (row.entity.CategoriaNombre === "") {
                        swal({
                            title: $translate.instant('ERROR'),
                            text: $translate.instant('ALERTA_ERROR_CATEGORIA'),
                            type: 'info',
                            confirmButtonText: $translate.instant('ACEPTAR')
                        });
                        row.isSelected = false;
                    } else {
                        self.personasSeleccionadasAgregar = gridApi.selection.getSelectedRows();

                    }

                });
                //soporte a paginacion
                //self.datosDocentesCargaLectiva.gridApi = gridApiService.pagination(gridApi, self.RecargarDatosPersonas, $scope);
                //soporte a filtro de precontratados
                gridApi.grid.registerRowsProcessor(self.filtrarPrecontratados, 200);
                gridApi.selection.on.rowSelectionChanged($scope, function () {
                    self.personasVincular = gridApi.selection.getSelectedRows();
                });
            }
        };

        self.datosDocentesCargaLectiva.columnDefs = [{
            field: 'docente_apellido',
            displayName: $translate.instant('APELLIDO_DOCENTES'),
            width: '15%'
        },
        {
            field: 'docente_nombre',
            displayName: $translate.instant('NOMBRES_DOCENTES'),
            width: '15%'
        },
        {
            field: 'docente_documento',
            displayName: $translate.instant('DOCUMENTO_DOCENTES'),
            filter: {}
        },
        {
            field: 'horas_lectivas',
            displayName: $translate.instant('HORAS_LECTIVAS'),
            width: '5%',
            cellTemplate: '<center><div ng-if="!row.entity.editrow">{{COL_FIELD}}</div><div ng-if="row.entity.editrow"><input type="text" style="height:30px" ng-model="MODEL_COL_FIELD"</div></center>'
        },
        {
            field: 'proyecto_nombre',
            displayName: $translate.instant('PROYECTO_CURRICULAR'),
            width: '30%'
        },
        {
            field: 'CategoriaNombre',
            displayName: $translate.instant('CATEGORIA'),
        },
        {
            field: 'tipo_vinculacion_nombre',
            displayName: $translate.instant('DEDICACION'),
        },
        {
            field: 'id_tipo_vinculacion',
            visible: false
        },
        {
            field: 'id_proyecto',
            visible: false
        },
        {
            field: 'dependencia_academica',
            visible: false
        },
        ];
        if (self.resolucion.NivelAcademico !== "PREGRADO") {
            self.datosDocentesCargaLectiva.columnDefs.push({
                displayName: $translate.instant('OPCIONES'),
                field: 'edit',
                enableFiltering: false, enableSorting: false,
                cellTemplate: '<center>' +
                    '<a class="ver"  ng-show="!row.entity.editrow" ng-click="grid.appScope.modificar_horas(row.entity)">' +
                    '<em title="{{\'MODIFICAR_HORAS_BTN\' | translate }}" class="fa fa-pencil fa-lg  faa-shake animated-hover"></em></a> ' +

                    '<a class="ver"  ng-show="row.entity.editrow" ng-click="grid.appScope.guardar_horas_modificadas(row.entity)">' +
                    '<em title="{{\'GUARDAR_HORAS_BTN\' | translate }}" class="fa fa-floppy-o fa-lg  faa-shake animated-hover"></em></a> ' +

                    '<a class="ver"  ng-show="row.entity.editrow" ng-click="grid.appScope.cancelar_modificacion(row.entity)">' +
                    '<em title="{{\'CANCELAR_MOD_BTN\' | translate }}" class="fa fa-ban fa-lg  faa-shake animated-hover"></em></a> ' +

                    '</center>'
            });
        }




        self.precontratados = {
            paginationPageSizes: [10, 15, 20],
            paginationPageSize: 10,
            enableSorting: true,
            enableFiltering: true,
            multiSelect: true,
            enableGridMenu: true,
            exporterCsvFilename: 'precontratados.csv',
            exporterExcelFilename: 'precontratados.xlsx',
            exporterExcelSheetName: 'Hoja1',
            //enableFullRowSelection: true,
            //modifierKeysToMultiSelect: true,
            enableSelectionBatchEvent: false,
            //enableRowHeaderSelection: false,
            columnDefs: [
                { field: 'Id', visible: false, exporterSuppressExport: true, enableHiding: false },
                { field: 'NombreCompleto', width: '20%', displayName: $translate.instant('NOMBRE') },
                { field: 'PersonaId', width: '10%', displayName: $translate.instant('DOCUMENTO_DOCENTES') },
                { field: 'Categoria', width: '10%', displayName: $translate.instant('CATEGORIA') },
                { field: 'DedicacionId.NombreDedicacion', width: '10%', displayName: $translate.instant('DEDICACION') },
                { field: 'DedicacionId.Id', visible: false, exporterSuppressExport: true, enableHiding: false },
                { field: 'NumeroHorasSemanales', width: '8%', displayName: $translate.instant('HORAS_SEMANALES') },
                { field: 'NumeroSemanas', width: '7%', displayName: $translate.instant('SEMANAS') },
                { field: 'NumeroDisponibilidad', width: '15%', displayName: $translate.instant('NUM_DISPO_DOCENTE') },
                { field: 'ValorContrato', width: '15%', displayName: $translate.instant('VALOR_CONTRATO'), cellClass: "valorEfectivo", cellFilter: "currency:$" },
                {
                    field: 'ProyectoCurricularId', visible: false, exporterSuppressExport: true, enableHiding: false,
                    filter: {
                        term: self.term
                    }
                }
            ],
            onRegisterApi: function (gridApi) {
                self.precontratados.gridApi = gridApi;
                gridApi.selection.on.rowSelectionChanged($scope, function () {
                    self.personasSeleccionadasBorrar = gridApi.selection.getSelectedRows();
                });
            }

        };

        self.Disponibilidades = {
            paginationPageSizes: [10, 15, 20],
            paginationPageSize: 10,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            enableFiltering: true,
            multiSelect: false,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: true,
            useExternalPagination: true,
            enableSelectAll: false,
            columnDefs: [{
                field: 'NumeroDisponibilidad',
                displayName: $translate.instant('NUM_DISPO_DOCENTE')
            },
            {
                field: 'Vigencia',
                displayName: $translate.instant('VIGENCIA_DISP')
            },
            {
                field: 'FechaRegistro',
                displayName: $translate.instant('FECHA_DISP'),
                cellTemplate: '<span>{{row.entity.FechaRegistro| date:"yyyy-MM-dd":"+0900"}}</span>'
            }
            ]

        };

        self.Disponibilidades.onRegisterApi = function (gridApi) {
            gridApi.selection.on.rowSelectionChanged($scope, function () {
                self.apropiacion_elegida = [];
                self.disponibilidad_elegida = gridApi.selection.getSelectedRows();
                self.DisponibilidadApropiacion = self.disponibilidad_elegida[0].DisponibilidadApropiacion;
                self.listar_apropiaciones();


            });

            gridApi.core.on.filterChanged($scope, function () {
                var grid = this.grid;
                var query = '';
                angular.forEach(grid.columns, function (value, key) {
                    if (value.filters[0].term) {
                        var formtstr = value.colDef.name.replace('[0]', '');
                        query = query + '&query=' + formtstr + '__icontains:' + value.filters[0].term;

                    }
                });
                self.actualizarLista(self.offset, query);
            });
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                var query = '';


                var grid = this.grid;
                angular.forEach(grid.columns, function (value, key) {
                    if (value.filters[0].term) {
                        var formtstr = value.colDef.name.replace('[0]', '');
                        query = query + '&query=' + formtstr + '__icontains:' + value.filters[0].term;

                    }
                });
                self.offset = (newPage - 1) * pageSize;
                self.actualizarLista(self.offset, query);
            });
        };
        
        self.actualizarLista = function (offset, query) {
            var unidadEjecutoraQuery = ",DisponibilidadApropiacion.Apropiacion.Rubro.UnidadEjecutora:" +1;
            var limitQuery ="&limit=" + self.Disponibilidades.paginationPageSize;
            var offsetQuery ="&offset=" + offset;
            var peticion = "query=vigencia:" +  self.vigencia_data + unidadEjecutoraQuery + limitQuery+ offsetQuery;
            var req = resolucionesMidRequest.get('disponibilidad?' + peticion);
            req.then(gridApiService.paginationFunc(self.Disponibilidades, offset));
            return req;
        };


        self.Apropiaciones = {
            paginationPageSizes: [10, 15, 20],
            paginationPageSize: 10,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            enableFiltering: true,
            multiSelect: false,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: true,
            useExternalPagination: false,
            enableSelectAll: false,
            columnDefs: [

                {
                    field: 'Valor',
                    displayName: $translate.instant('VALOR_APROPIACION'),
                    cellFilter: "currency",
                    cellClass: "valorEfectivo"
                },
                {
                    field: 'Apropiacion.Saldo',
                    displayName: $translate.instant('SALDO_APROPIACION'),
                    cellFilter: "currency",
                    cellClass: "valorEfectivo"
                }
            ],

            onRegisterApi: function (gridApi) {
                self.Apropiaciones.gridApi = gridApi;
                gridApi.selection.on.rowSelectionChanged($scope, function () {
                    self.apropiacion_elegida = gridApi.selection.getSelectedRows();
                });
            }
        };

        //*--------------Funciones para recargar grids que han sido seleccionados -------------* //
        self.RecargarDatosPersonas = function (offset, query) {
            var p = $.param({
                vigencia: self.resolucion.VigenciaCarga,
                periodo: self.resolucion.PeriodoCarga,
                tipo_vinculacion: self.resolucion.Dedicacion,
                facultad: self.resolucion.FacultadId,
                nivel_academico: self.resolucion.NivelAcademico,
                //limit: self.datosDocentesCargaLectiva.paginationPageSize,
                //offset: offset,
                //query: query
            });
            var req = resolucionesMidRequest.get("gestion_previnculacion/Precontratacion/docentes_x_carga_horaria", p);
            // console.info(req);
            req.then(gridApiService.paginationFunc(self.datosDocentesCargaLectiva, offset));
            return req;
        };

        self.RecargarDisponibilidades = function () {
            var p = $.param({
                limit: "",
                query: "Vigencia:" + self.vigencia_data
            });
            resolucionesMidRequest.get('disponibilidad', p).then(function (response) {
                self.Disponibilidades.data = response.data.Data;
            });
        };

        self.RecargarApropiaciones = function () {
            self.Apropiaciones.data = [];
        };

        resolucionRequest.get("vinculacion_docente/get_total_contratos_x_resolucion/" + self.resolucion.Id + "/" + self.resolucion.Dedicacion, "").then(function (response) {
            self.total_contratos_x_vin = response.data.Data[0].Valor;
        }).catch(function (response) {
            self.total_contratos_x_vin = 0;
        });

        oikosRequest.get("dependencia/proyectosPorFacultad/" + self.resolucion.FacultadId + "/" + self.resolucion.NivelAcademico, "").then(function (response) {
            self.proyectos = response.data;
            self.defaultSelectedPrecont = self.proyectos[0].Id;
        });

        //Función para visualizar docentes ya vinculados a resolución
        self.get_docentes_vinculados = function () {
            self.estado = true;
            var r = resolucionesMidRequest.get("gestion_previnculacion/docentes_previnculados", "id_resolucion=" + self.resolucion.Id).then(function (response) {
                self.precontratados.data = response.data.Data;
                self.estado = false;
            });
            self.precontratados.columnDefs[10].filter.term = self.term;
            return r;
        };

        //Función para almacenar los datos de las vinculaciones realizadas
        self.agregarPrecontratos = function () {
            if (self.saldo_disponible && self.apropiacion_elegida.length > 0) {
                if (self.apropiacion_elegida[0].Apropiacion.SaldoContratos < 0){
                    swal({
                        title: $translate.instant('PREGUNTA_SEGURO'),
                        text: $translate.instant('CDP_SIN_SALDO'),
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: $translate.instant('VINCULAR_DOCENTES'),
                        cancelButtonText: $translate.instant('CANCELAR'),
                        confirmButtonClass: 'btn btn-success',
                        cancelButtonClass: 'btn btn-danger',
                        buttonsStyling: false,
                        allowOutsideClick: false
                    }).then(function () {
                        self.esconderBoton = true;
                        self.insertarVinculaciones();
                    }, function (dismiss) {
                        self.esconderBoton = false;
                    });
                } else {
                    self.esconderBoton = true;
                    self.insertarVinculaciones();
                }
            } else {
                swal({
                    title: $translate.instant('ERROR'),
                    text: $translate.instant('ERROR_ELEG_DISP'),
                    type: 'info',
                    confirmButtonText: $translate.instant('ACEPTAR')
                });
            }
        };

        self.insertarVinculaciones = function () {
            vinculacionesData = [];            
            self.personasSeleccionadasAgregar.forEach(function (personaSeleccionada) {
                var vinculacionDocente = {
                    PersonaId: parseInt(personaSeleccionada.docente_documento),
                    NumeroHorasSemanales: parseInt(personaSeleccionada.horas_lectivas),
                    NumeroSemanas: parseInt(self.resolucion.NumeroSemanas),
                    ResolucionVinculacionDocenteId : { Id: parseInt(self.resolucion.Id) },
                    DedicacionId: { Id: parseInt(personaSeleccionada.id_tipo_vinculacion) },
                    ProyectoCurricularId: parseInt(personaSeleccionada.id_proyecto),
                    Categoria: personaSeleccionada.CategoriaNombre.toUpperCase(),
                    Dedicacion: personaSeleccionada.tipo_vinculacion_nombre.toUpperCase(),
                    NivelAcademico: self.resolucion.NivelAcademico,
                    Disponibilidad: self.apropiacion_elegida[0].Id,
                    DependenciaAcademica: personaSeleccionada.DependenciaAcademica,
                    Vigencia: parseInt(self.resolucion.Vigencia),
                };

                vinculacionesData.push(vinculacionDocente);

            });

            resolucionesMidRequest.post("gestion_previnculacion/Precontratacion/insertar_previnculaciones", vinculacionesData).then(function (response) {
                console.info(response)
                console.info(response.data.Data)
                if (response.data.Success) {

                    self.datosDocentesCargaLectiva.data = [];
                    if (response.data.Data === 0) {
                        swal({
                            title: $translate.instant('ERROR'),
                            text: $translate.instant('ALERTA_PREVIN_ERROR2'),
                            type: 'info',
                            confirmButtonText: $translate.instant('ACEPTAR'),
                            allowOutsideClick: false
                        }).then(function () {
                            $window.location.reload();
                            self.personasSeleccionadasAgregar = [];
                            vinculacionesData = [];
                        });
                    } else {
                        swal({
                            text: $translate.instant('VINCULACION_EXITOSA'),
                            type: 'success',
                            confirmButtonText: $translate.instant('ACEPTAR'),
                            allowOutsideClick: false
                        }).then(function () {
                            $window.location.reload();
                            self.personasSeleccionadasAgregar = [];
                            vinculacionesData = [];
                        });
                    }

                } else {
                    swal({
                        title: $translate.instant('ERROR'),
                        text: $translate.instant('ALERTA_PREVIN_ERROR'),
                        type: 'info',
                        confirmButtonText: $translate.instant('ACEPTAR'),
                        allowOutsideClick: false
                    }).then(function () {
                        $window.location.reload();
                        self.personasSeleccionadasAgregar = [];
                        vinculacionesData = [];
                    });
                }
            });
        }

        //* ----------------------------- *//

        $scope.modificar_horas = function (row) {
            //Get the index of selected row from row object
            var index = self.datosDocentesCargaLectiva.data.indexOf(row);
            //Use that to set the editrow attrbute value for seleted rows
            self.datosDocentesCargaLectiva.data[index].editrow = !self.datosDocentesCargaLectiva.data[index].editrow;
        };

        $scope.guardar_horas_modificadas = function (row) {
            var index = self.datosDocentesCargaLectiva.data.indexOf(row);
            self.datosDocentesCargaLectiva.data[index].editrow = false;

        };

        $scope.cancelar_modificacion = function (row) {
            var index = self.datosDocentesCargaLectiva.data.indexOf(row);
            self.datosDocentesCargaLectiva.data[index].editrow = false;
        };


        //*-------Funciones para la desvinculación de docentes ------ *//
        $scope.verCancelarInscripcionDocentes = function (rows) {
            swal({
                title: $translate.instant('PREGUNTA_SEGURO'),
                text: $translate.instant('CONFIRMAR_DESVINCULACION_MULTIPLE'),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: $translate.instant('DESVINCULAR_DOCENTES'),
                cancelButtonText: $translate.instant('CANCELAR'),
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false,
                allowOutsideClick: false
            }).then(function () {
                //console.log(rows);
                rows.forEach(function (row) {
                    self.desvincularDocente(row);
                });
            }, function (dismiss) {
                if (dismiss === 'cancel') {
                    swal(
                        $translate.instant('CANCELADO'),
                        $translate.instant('DESVINCULACION_CANCELADA'),
                        'error'
                    );
                }
            });
        };

        self.desvincularDocente = function (row) {
            resolucionRequest.delete("vinculacion_docente", row.Id).then(function (response) {
                if (response.data.Success) {
                    swal({
                        text: $translate.instant('DESVINCULACION_EXITOSA'),
                        type: 'success',
                        confirmButtonText: $translate.instant('ACEPTAR'),
                        allowOutsideClick: false

                    }).then(function () {
                        $window.location.reload();
                    });

                } else {
                    swal({
                        title: $translate.instant('ERROR'),
                        text: $translate.instant('DESVINCULACION_NOEXITOSA'),
                        type: 'error',
                        confirmButtonText: $translate.instant('ACEPTAR')
                    });

                }
            });
        };

        //*------ Funciones para manejo y verificación de disponibilidades elegidas ----- *//

        //Función que muestra modal que permite elegir Disponibilidades y sus apropiaciones
        self.mostrar_modal_disponibilidad = function () {
            if (self.personasSeleccionadasAgregar.length === 0) {
                swal({
                    text: $translate.instant('ALERTA_SELEC_DOC'),
                    type: 'error',
                    confirmButtonText: $translate.instant('ACEPTAR')
                });
            } else {
                self.total_contratos_seleccionados = 0;
                self.apropiacion_elegida = [];
                self.Apropiaciones.data = [];
                resolucionesMidRequest.get("disponibilidad/TotalDisponibilidades/" + self.resolucion.Vigencia, 'UnidadEjecutora=1') //formato de entrada  https://golang.org/src/time/format.go
                    .then(function (response) {
                        self.Disponibilidades.totalItems = response.data.Data;
                        self.actualizarLista(self.offset, '');
                    });
                self.personasSeleccionadasAgregar.forEach(function (personaSeleccionada) {
                    var vinculacionDocente = {
                        PersonaId: parseInt(personaSeleccionada.docente_documento),
                        NumeroHorasSemanales: parseInt(personaSeleccionada.horas_lectivas),
                        NumeroSemanas: parseInt(self.resolucion.NumeroSemanas),
                        ResolucionVinculacionDocenteId: { Id: parseInt(self.resolucion.Id) },
                        DedicacionId: { Id: parseInt(personaSeleccionada.id_tipo_vinculacion) },
                        ProyectoCurricularId: parseInt(personaSeleccionada.id_proyecto),
                        Categoria: personaSeleccionada.CategoriaNombre.toUpperCase(),
                        Dedicacion: personaSeleccionada.tipo_vinculacion_nombre.toUpperCase(),
                        NivelAcademico: self.resolucion.NivelAcademico,
                        DependenciaAcademica: personaSeleccionada.DependenciaAcademica,
                        Vigencia: parseInt(self.resolucion.Vigencia),
                        Periodo: self.resolucion.Periodo
                    };

                    vinculacionesData.push(vinculacionDocente);

                });

                resolucionesMidRequest.post("gestion_previnculacion/Precontratacion/calcular_valor_contratos_seleccionados ", vinculacionesData).then(function (response) {
                    self.total_contratos_seleccionados = response.data.Data;
                });

                $('#modal_disponibilidad').modal('show');
                vinculacionesData = [];
            }
        };

        //Función que lista las apropiaciones  del cdp elegido junto con su saldo y su valor
        self.listar_apropiaciones = function () {
            self.estado_ap = true;
            self.ver = false;
            var disponibilidadAp = self.DisponibilidadApropiacion;
            adminMidRequest.post("consultar_disponibilidades/listar_apropiaciones", disponibilidadAp).then(function (response) {
                response.data.forEach(function(aprop){
                    aprop.Apropiacion.SaldoContratos = aprop.Apropiacion.Saldo - self.total_contratos_seleccionados;
                });
                self.Apropiaciones.data = response.data;
                self.ver = true;
                self.estado_ap = false;
            });

        };

        //Función que verifica si la apropiación elegida cubre los docentes elegidos
        self.verificarDisponibilidad = function () {

            self.personasSeleccionadasAgregar.forEach(function (personaSeleccionada) {
                var vinculacionDocente = {
                    PersonaId: parseInt(personaSeleccionada.docente_documento),
                    NumeroHorasSemanales: parseInt(personaSeleccionada.horas_lectivas),
                    NumeroSemanas: parseInt(self.resolucion.NumeroSemanas),
                    ResolucionVinculacionDocenteId: { Id: parseInt(self.resolucion.Id) },
                    DedicacionId: { Id: parseInt(personaSeleccionada.id_tipo_vinculacion) },
                    ProyectoCurricularId: parseInt(personaSeleccionada.id_proyecto),
                    Categoria: personaSeleccionada.CategoriaNombre.toUpperCase(),
                    Dedicacion: personaSeleccionada.tipo_vinculacion_nombre.toUpperCase(),
                    NivelAcademico: self.resolucion.NivelAcademico,
                    Disponibilidad: self.apropiacion_elegida[0].Id,
                    DependenciaAcademica: personaSeleccionada.DependenciaAcademica,
                    Vigencia: parseInt(self.resolucion.Vigencia),
                    Periodo: self.resolucion.Periodo
                };

                vinculacionesData.push(vinculacionDocente);

            });

            resolucionesMidRequest.post("gestion_previnculacion/Precontratacion/calcular_valor_contratos", vinculacionesData).then(function (response) {
                if (response.data.Data > parseInt(self.apropiacion_elegida[0].Apropiacion.Saldo)) {
                    self.saldo_disponible = false;

                } else {
                    self.saldo_disponible = true;

                }
            });
            vinculacionesData = [];
        };


        // carga inicial de docentes en la tabla
        self.RecargarDatosPersonas();
        self.get_docentes_vinculados().then(function () {
            //refresca una vez cargados los docentes precontratados
            self.datosDocentesCargaLectiva.gridApi.core.refresh();
        });

        // filtro para eliminar del grid datosDocentesCargaLectiva los docentes precontratados
        self.filtrarPrecontratados = function (rows) {
            rows.forEach(function (row) {
                if (self.precontratados.data.length === 0 && self.estado) {
                    row.visible = false;
                }
                self.precontratados.data.forEach(function (p) {
                    if (p.PersonaId === row.entity.docente_documento && p.ProyectoCurricularId === row.entity.id_proyecto) {
                        row.visible = false;
                        return;
                    }
                });
            });
            return rows;
        };

        $scope.exportarCSV = function () {
            var csvExporter = angular.element(document.querySelectorAll(".custom-csv-link-location"));
            self.precontratados.gridApi.exporter.csvExport('visible', 'all', csvExporter);
        };
        $scope.exportarPDF = function () {
            self.precontratados.gridApi.exporter.pdfExport('visible', 'all');

        };
    });
