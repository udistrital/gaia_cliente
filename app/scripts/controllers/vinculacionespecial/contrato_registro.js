'use strict';

/**
 * @ngdoc function
 * @name clienteApp.controller:ContratoRegistroCtrl
 * @description
 * # ContratoRegistroCtrl
 * Controller of the clienteApp
 */

//TODO: unificar contrato_registro, contrato_registro_horas y contrato_resistro_cancelar
angular.module('resolucionesClienteApp')
    .controller('ContratoRegistroCtrl', function (amazonAdministrativaRequest, resolucionRequest, resolucionesMidRequest, oikosRequest,titandesagregRequest , coreAmazonRequest, idResolucion, colombiaHolidaysService, pdfMakerService, nuxeoClient, $mdDialog, lista, resolucion, coreRequest, $translate, $window, $scope) {

        var self = this;
        self.contratoGeneralBase = {};
        self.contratoGeneralBase.Contrato = {};
        self.acta = {};
        self.estado = false;
        self.CurrentDate = new Date();
        self.esconderBoton = false;
        self.idResolucion = idResolucion;
        self.FechaExpedicion = null;
        var docentes_desagregados = [];

        resolucionRequest.get('resolucion/' + self.idResolucion).then(function (response) {
            self.resolucionActual = response.data.Data;
            if (self.resolucionActual.FechaExpedicion !== undefined && self.resolucionActual.FechaExpedicion !== "0001-01-01T00:00:00Z") {
                self.FechaExpedicion = new Date(self.resolucionActual.FechaExpedicion);
            }
            return resolucionRequest.get('tipo_resolucion/' + self.resolucionActual.TipoResolucionId.Id);
        }).then(function (response) {
            self.resolucionActual.TipoResolucionId.NombreTipoResolucion = response.data.Data.NombreTipoResolucion;
            resolucionesMidRequest.get("gestion_documento_resolucion/get_contenido_resolucion", "id_resolucion=" + self.resolucionActual.Id + "&id_facultad=" + self.resolucionActual.DependenciaFirmaId).then(function (response2) {
                self.contenidoResolucion = response2.data.Data;
                resolucionesMidRequest.get("gestion_previnculacion/docentes_previnculados_all", "id_resolucion=" + self.resolucionActual.Id).then(function (response3) {
                    self.contratadosPdf = response3.data.Data;
                });
            });
        });

        oikosRequest.get('dependencia/' + resolucion.Facultad).then(function (response) {
            resolucion.FacultadNombre = response.data.Nombre;
        });

        resolucionRequest.get("resolucion_vinculacion_docente/" + self.idResolucion).then(function (response) {
            self.datosFiltro = response.data.Data;
            oikosRequest.get("dependencia/" + self.datosFiltro.FacultadId).then(function (response2) {
                self.contratoGeneralBase.Contrato.SedeSolicitante = response2.data.Id.toString();
                self.sede_solicitante_defecto = response2.data.Nombre;
            });
            resolucionesMidRequest.get("gestion_previnculacion/docentes_previnculados", "id_resolucion=" + self.idResolucion.toString()).then(function (response3) {
                self.contratados = response3.data.Data;
            });
            oikosRequest.get("dependencia/proyectosPorFacultad/" + resolucion.Facultad + "/" + self.datosFiltro.NivelAcademico, "").then(function (response4) {
                self.proyectos = response4.data;
            });
            coreAmazonRequest.get("ordenador_gasto", "query=DependenciaId:" + self.datosFiltro.FacultadId).then(function (response5) {
                if (response5.data === null) {
                    coreAmazonRequest.get("ordenador_gasto/1").then(function (response6) {
                        self.ordenadorGasto = response6.data;
                    });
                } else {
                    self.ordenadorGasto = response5.data[0];
                }
            });
        });

        coreAmazonRequest.get("punto_salarial", "sortby=Vigencia&order=desc&limit=1").then(function (response) {
            self.punto_salarial = response.data[0];
        });

        coreAmazonRequest.get("salario_minimo", "sortby=Vigencia&order=desc&limit=1").then(function (response) {
            self.salario_minimo = response.data[0];
        });

        amazonAdministrativaRequest.get('vigencia_contrato', $.param({
            limit: -1
        })).then(function (response) {
            self.vigencia_data = response.data;
        });

        self.asignarValoresDefecto = function () {
            self.contratoGeneralBase.Contrato.Vigencia = new Date().getFullYear();
            self.contratoGeneralBase.Contrato.FormaPago = { Id: 240 };
            self.contratoGeneralBase.Contrato.DescripcionFormaPago = "Abono a Cuenta Mensual de acuerdo a puntas y hotras laboradas";
            self.contratoGeneralBase.Contrato.Justificacion = "Docente de Vinculacion Especial";
            self.contratoGeneralBase.Contrato.UnidadEjecucion = { Id: 269 };
            self.contratoGeneralBase.Contrato.LugarEjecucion = { Id: 4 };
            self.contratoGeneralBase.Contrato.Observaciones = "Contrato de Docente Vinculación Especial";
            self.contratoGeneralBase.Contrato.TipoControl = 181;
            self.contratoGeneralBase.Contrato.ClaseContratista = 33;
            self.contratoGeneralBase.Contrato.TipoMoneda = 137;
            self.contratoGeneralBase.Contrato.OrigenRecursos = 149;
            self.contratoGeneralBase.Contrato.OrigenPresupuesto = 156;
            self.contratoGeneralBase.Contrato.TemaGastoInversion = 166;
            self.contratoGeneralBase.Contrato.TipoGasto = 146;
            self.contratoGeneralBase.Contrato.RegimenContratacion = 136;
            self.contratoGeneralBase.Contrato.Procedimiento = 132;
            self.contratoGeneralBase.Contrato.ModalidadSeleccion = 123;
            self.contratoGeneralBase.Contrato.TipoCompromiso = 35;
            self.contratoGeneralBase.Contrato.TipologiaContrato = 46;
            self.contratoGeneralBase.Contrato.FechaRegistro = new Date();
            self.contratoGeneralBase.Contrato.UnidadEjecutora = 1;
            self.contratoGeneralBase.Contrato.Condiciones = "Sin condiciones";
            self.acta.Descripcion = "Acta inicio resolución Docente Vinculación Especial";
        };

        self.asignarValoresDefecto();

        amazonAdministrativaRequest.get("parametros/240").then(function (response) {
            self.forma_pago_defecto = response.data;
        });
        amazonAdministrativaRequest.get("parametros/136").then(function (response) {
            self.regimen_contratacion_defecto = response.data;
        });


        self.cancelar = function () {
            $mdDialog.hide();
        };


        self.realizarContrato = function () {
            if (self.datosFiltro.Dedicacion === "HCH") {
                self.contratoGeneralBase.Contrato.TipoContrato = { Id: 3 };
                self.contratoGeneralBase.Contrato.ObjetoContrato = "Docente de Vinculación Especial - Honorarios";
            } else if (self.datosFiltro.Dedicacion === "HCP") {
                self.contratoGeneralBase.Contrato.TipoContrato = { Id: 2 };
                self.contratoGeneralBase.Contrato.ObjetoContrato = "Docente de Vinculación Especial - Salario";
            } else {
                self.contratoGeneralBase.Contrato.TipoContrato = { Id: 18 };
                self.contratoGeneralBase.Contrato.ObjetoContrato = "Docente de Vinculación Especial - Medio Tiempo Ocasional (MTO) - Tiempo Completo Ocasional (TCO)";
            }
            if (self.FechaExpedicion && self.acta.FechaInicio) {
                swal({
                    title: $translate.instant('EXPEDIR'),
                    text: $translate.instant('SEGURO_EXPEDIR'),
                    html: '<p><b>' + $translate.instant('NUMERO') + ': </b>' + resolucion.Numero.toString() + '</p>' +
                        '<p><b>' + $translate.instant('FACULTAD') + ': </b>' + resolucion.FacultadNombre + '</p>' +
                        '<p><b>' + $translate.instant('NIVEL_ACADEMICO') + ': </b>' + resolucion.NivelAcademico + '</p>' +
                        '<p><b>' + $translate.instant('DEDICACION') + ': </b>' + resolucion.Dedicacion + '</p>',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: $translate.instant('ACEPTAR'),
                    cancelButtonText: $translate.instant('CANCELAR'),
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    buttonsStyling: false,
                    allowOutsideClick: false
                }).then(function () {
                    self.guardarContratos();
                }, function (dismiss) {
                    if (dismiss === 'cancel') {
                        swal({
                            text: $translate.instant('EXPEDICION_NO_REALIZADA'),
                            type: 'error',
                            allowOutsideClick: false
                        });
                    }
                });
            } else {
                swal({
                    text: $translate.instant('COMPLETE_CAMPOS'),
                    type: 'warning'
                });
            }
        };

        self.cancelarExpedicion = function () {
            $mdDialog.hide();
        };

        self.guardarContratos = function () {
            self.estado = true;
            self.esconderBoton = true;
            var conjuntoContratos = [];
            if (self.contratados) {
                self.contratados.forEach(function (contratado) {
                    var contratoGeneral = JSON.parse(JSON.stringify(self.contratoGeneralBase.Contrato));
                    var actaI = JSON.parse(JSON.stringify(self.acta));
                    contratoGeneral.Contratista = parseInt(contratado.PersonaId);
                    contratoGeneral.DependenciaSolicitante = contratado.ProyectoCurricularId.toString();
                    contratoGeneral.PlazoEjecucion = parseInt(contratado.NumeroHorasSemanales);
                    contratoGeneral.OrdenadorGasto = self.ordenadorGasto.Id;
                    contratoGeneral.ValorContrato = parseInt(contratado.ValorContrato);
                    var contratoVinculacion = {
                        ContratoGeneral: contratoGeneral,
                        ActaInicio: actaI,
                        VinculacionDocente: { Id: parseInt(contratado.Id) }
                    };
                    if (self.datosFiltro.NivelAcademico.toLowerCase() === "pregrado") {
                        contratoVinculacion.VinculacionDocente.PuntoSalarialId = self.punto_salarial.Id;
                    } else if (self.datosFiltro.NivelAcademico.toLowerCase() === "posgrado") {
                        contratoVinculacion.VinculacionDocente.SalarioMinimoId = self.salario_minimo.Id;
                    }
                    conjuntoContratos.push(contratoVinculacion);
                });
                var expedicionResolucion = {
                    Vinculaciones: conjuntoContratos,
                    idResolucion: self.idResolucion,
                    FechaExpedicion: self.FechaExpedicion
                };
                resolucion.FechaExpedicion = self.FechaExpedicion;
                
                resolucionesMidRequest.post("expedir_resolucion/validar_datos_expedicion", expedicionResolucion).then(function (response) {                    
                    if (response.data.Data === "OK") {
                        resolucionesMidRequest.post("expedir_resolucion/expedir", expedicionResolucion).then(function (response2) {
                            console.log("hace el post para expedir una resolucion");
                            self.estado = false;
                            if (response2.data.Status !== "201") {
                                swal({
                                    text: response.data,
                                    title: "Alerta",
                                    type: "error",
                                    confirmButtonText: $translate.instant('ACEPTAR'),
                                    showLoaderOnConfirm: true,
                                    allowOutsideClick: false
                                });
                            } else {
                                 self.guardarResolucionNuxeo();
                            }
                        });
                    } else {

                        swal({
                            text: response.data,
                            title: "Alerta",
                            type: "error",
                            confirmButtonText: $translate.instant('ACEPTAR'),
                            showLoaderOnConfirm: true,
                            allowOutsideClick: false
                        });
                    }
                });
            } else {
                swal({
                    text: $translate.instant('NO_DOCENTES'),
                    title: "Alerta",
                    type: "warning",
                    confirmButtonText: $translate.instant('ACEPTAR'),
                    showLoaderOnConfirm: true,
                    allowOutsideClick: false
                });
            }
        };

        /**
         * @name guardarResolucionNuxeo
         * @description 
         * Genera el documento de la resolución en formato blob y lo carga en nuexeo, posteriormente lo guarda en la tabla documento del core
         */
        self.guardarResolucionNuxeo = function () {
            resolucion.NivelAcademico_nombre = resolucion.NivelAcademico;

           /* if (self.contratadosPdf.length > 0)
            {
                self.incluirDesagregacion(); 
            }else{
                self.generarResolucion();
            }*/
            self.generarResolucion();
            console.log(self.contratadosPdf)
            
        };
        $scope.validarFecha = colombiaHolidaysService.validateDate;

            /**
        * @name incluirDesagregacion
        * @description 
        * Función que agrega los campos de la desagregación del salario de los docentes
        */
        self.incluirDesagregacion = function()
        {
            var contador = 0;
            var result_desagreg =[];
            self.contratadosPdf.forEach(function (docentes) {

                var valor_totalContrato = Number(docentes.ValorContratoFormato.replace(/[^0-9.-]+/g,""));
                var meses_contrato = docentes.NumeroMeses.split(' ')[0];
                
                if (valor_totalContrato < 0){
                    valor_totalContrato = 0;
                }
                const datosDocenteSalario = {
                    NumDocumento:  docentes.PersonaId,
                    ValorContrato: valor_totalContrato.toString(),
                    VigenciaContrato: resolucion.Vigencia.toString(),
                    MesesContrato: meses_contrato,
                }

                titandesagregRequest.post('services/desagregacion_contrato_hcs',datosDocenteSalario).then(function(response) {
                var SalarioDesagreg = response.data;
                result_desagreg = self.EscribirDesagregacion(docentes,SalarioDesagreg);
                docentes_desagregados[contador] = result_desagreg;
                contador++;

                if (contador === self.contratadosPdf.length)
                {
                    self.generarResolucion();   
                }
                
                });

            });

        };
        /**
         * @name EscribirDesagregacion
         * @description 
         * Escribe los valores de desagregación en cada vector de docente
         */
        self.EscribirDesagregacion = function (docentes_recibido,desagregacion) {
            console.log(docentes_recibido)
            console.log(desagregacion)
    
            
        desagregacion.forEach(function(resultado_desagreg){

            switch (resultado_desagreg.Nombre){
            case "salarioBase":
                docentes_recibido.NSueldoBasico = "Sueldo Básico";
                docentes_recibido.SueldoBasico = (parseInt(resultado_desagreg.Valor)).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                });
                break;
            case "primaVacaciones":
                docentes_recibido.NPrimaVacaciones = "Prima de Vacaciones";
                docentes_recibido.PrimaVacaciones = (parseInt(resultado_desagreg.Valor)).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                });
                break;
            case "vacaciones":
                docentes_recibido.NVacaciones = "Vacaciones";
                docentes_recibido.Vacaciones = (parseInt(resultado_desagreg.Valor)).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                });
                break;
            case "primaNavidad":
                docentes_recibido.NPrimaNavidad = "Prima de Navidad";
                docentes_recibido.PrimaNavidad = (parseInt(resultado_desagreg.Valor)).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                });
                break;
            case "interesCesantias":
                docentes_recibido.NInteresesCesantias = "Intereses Cesantías";
                docentes_recibido.InteresesCesantias = (parseInt(resultado_desagreg.Valor)).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                });
                break;
            case "cesantias":
                docentes_recibido.NAportesCesantias = "Cesantías";
                docentes_recibido.AportesCesantias = (parseInt(resultado_desagreg.Valor)).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                });   
            }

        });
            
            docentes_recibido.NPrimaServicios="Prima de servicios";
            docentes_recibido.PrimaServicios='123';
    
            //console.log(docentes_recibido)
    
            return docentes_recibido;
        };
        /**
         * @name generarResolucion
         * @description 
         * Arma el documento con la información consultada y utiliza la herramienta pdfMake para mostrarlo
         */
        self.generarResolucion = function () {

           // var documento = pdfMakerService.getDocumento(self.contenidoResolucion, resolucion, docentes_desagregados, self.proyectos);
            var documento = pdfMakerService.getDocumento(self.contenidoResolucion, resolucion, self.contratadosPdf, self.proyectos);

            pdfMake.createPdf(documento).getBlob(function (blobDoc) {
                nuxeoClient.createDocument("ResolucionDVE" + self.idResolucion, "Resolución DVE expedida", blobDoc, function(url) {
                    var date = new Date();
                    date = moment(date).format('DD_MMM_YYYY_HH:mm:ss');
                    self.objeto_documento = {
                      "Nombre": "ResolucionDVE" + self.idResolucion,
                      "Descripcion": "Resolución de vinculación especial",
                      "TipoDocumento": {
                        "Id": 6
                      },
                      "Contenido": JSON.stringify({
                        "NombreArchivo": "Resolucion_" + self.resolucionActual.NumeroResolucion + ".pdf",
                        "FechaCreacion": date,
                        "Tipo": "Archivo",
                        "IdNuxeo": url,
                        "Observaciones": "Ninguna"
                      }),
                      "CodigoAbreviacion": "RES-DVE",
                      "Activo": true
                    };
            
                    //Post a la tabla documento del core
                    coreRequest.post('documento', self.objeto_documento).then(function(response) {
                        self.id_documento = response.data.Id;
                        console.log(self.id_documento);
                        if (self.id_documento !== null && self.id_documento !== undefined) {
                            swal({
                                title: $translate.instant('EXPEDIDA'),
                                text: $translate.instant('DATOS_REGISTRADOS'),
                                type: 'success',
                                allowOutsideClick: false,
                                confirmButtonText: $translate.instant('ACEPTAR')
                            }).then(function () {
                                $window.location.reload();
                            });
                        }
                    });
                });
            });
            
        }

    });
