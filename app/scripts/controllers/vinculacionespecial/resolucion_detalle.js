'use strict';

/**
 * @ngdoc function
 * @name clienteApp.controller:ResolucionGeneracionCtrl
 * @description
 * # ResolucionGeneracionCtrl
 * Controller of the clienteApp
 */
angular.module('resolucionesClienteApp')
  .controller('ResolucionDetalleCtrl', function (resolucionRequest, oikosRequest, titandesagregRequest, coreRequest, resolucionesMidRequest, colombiaHolidaysService, pdfMakerService, $mdDialog, $scope, $translate, $window) {

    var self = this;
    var docentes_desagregados = [];
    self.table = buildTable();
    self.resolucion = JSON.parse(localStorage.getItem("resolucion"));
    //TODO: ver porque Json.Parse no transforma las fechas :/
    if (self.resolucion.FechaExpedicion === "0001-01-01T00:00:00Z") {
      self.resolucion.FechaExpedicion = undefined;
    }
    if (self.resolucion.FechaExpedicion !== undefined) {
      self.resolucion.FechaExpedicion = new Date(self.resolucion.FechaExpedicion);
    }
    self.proyectos = [];

    oikosRequest.get("dependencia", "query=Id:" + self.resolucion.FacultadId + "&limit=-1").then(function (response) {
      self.facultad = response.data[0].Nombre;
    });

    oikosRequest.get("dependencia/proyectosPorFacultad/" + self.resolucion.FacultadId + "/" + self.resolucion.NivelAcademico, "").then(function (response) {
      self.proyectos = response.data;
    });


    resolucionesMidRequest.get("gestion_documento_resolucion/get_contenido_resolucion", "id_resolucion=" + self.resolucion.Id + "&id_facultad=" + self.resolucion.IdDependenciaFirma).then(function (response) {
      self.contenidoResolucion = response.data.Data;
      resolucionesMidRequest.get("gestion_previnculacion/docentes_previnculados_all", "id_resolucion=" + self.resolucion.Id).then(function (response2) {
        self.contratados = response2.data.Data;
       /* if (self.contratados.length > 0)
          {
            self.incluirDesagregacion(); 
          }else{
            self.generarResolucion();
          } */
          self.generarResolucion();
      });
    });

    /**
    * @name incluirDesagregacion
    * @description 
    * Función que agrega los campos de la desagregación del salario de los docentes
    */
    self.incluirDesagregacion = function()
    {
      var contador = 0;
      var result_desagreg =[]; 
      //let i; 

      self.contratados.forEach(function (docentes) {
        
        var valor_totalContrato = Number(docentes.ValorContratoFormato.replace(/[^0-9.-]+/g,""));
        
        if (valor_totalContrato < 0) {
          valor_totalContrato = 0;
        }
                

        const datosDocenteSalario = {
          NumDocumento:  Number(docentes.PersonaId),
          ValorTotalContrato: valor_totalContrato,
          VigenciaContrato: self.resolucion.Vigencia,
        }

        titandesagregRequest.post('services/desagregacion_contrato_hcs',datosDocenteSalario).then(function(response) {
          var SalarioDesagreg = response.data;
          result_desagreg = self.EscribirDesagregacion(docentes,SalarioDesagreg);
          docentes_desagregados[contador] = result_desagreg;
          contador++;

          if (contador === self.contratados.length)
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
      //console.log(docentes_recibido)
      //console.log(desagregacion)

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

    //*------------Funciones para editar la resolución -----------------*//
    self.agregarArticulo = function () {
      swal({
        title: $translate.instant('ESCRIBA_TEXTO'),
        input: 'textarea',
        showCancelButton: true,
        confirmButtonText: $translate.instant('ACEPTAR'),
        cancelButtonText: $translate.instant('CANCELAR'),
        howLoaderOnConfirm: true,
        preConfirm: function (texto) {
          return new Promise(function (resolve, reject) {
            setTimeout(function () {
              if (texto) {
                resolve();
              } else {
                reject($translate.instant('DEBE_INSERTAR'));
              }
            }, 1000);
          });
        },
        allowOutsideClick: false
      }).then(function (texto) {
        self.adicionarArticulo(texto);
      });
    };

    self.adicionarArticulo = function (texto) {
      resolucionRequest.get("resolucion/" + self.resolucion.Id).then(function (/*response*/) {
        if (self.contenidoResolucion.Articulos) {
          self.contenidoResolucion.Articulos.push({
            Texto: texto,
            Paragrafos: null
          });
        } else {
          self.contenidoResolucion.Articulos = [{
            Texto: texto,
            Paragrafos: null
          }];
        }
      });
    };

    self.eliminarArticulo = function (num) {
      if (self.contenidoResolucion.Articulos.length > 1) {
        self.contenidoResolucion.Articulos.splice(num, 1);
      } else {
        swal({
          text: $translate.instant('ALMENOS_UNO'),
          type: "warning"
        });
      }
    };

    self.eliminarParagrafo = function (num1, num2) {
      self.contenidoResolucion.Articulos[num1].Paragrafos.splice(num2, 1);
    };

    self.agregarParagrafo = function (num) {
      swal({
        title: $translate.instant('ESCRIBA_PARAGRAFO'),
        input: 'textarea',
        showCancelButton: true,
        confirmButtonText: $translate.instant('ACEPTAR'),
        cancelButtonText: $translate.instant('CANCELAR'),
        howLoaderOnConfirm: true,
        preConfirm: function (texto) {
          return new Promise(function (resolve, reject) {
            setTimeout(function () {
              if (texto) {
                resolve();
              } else {
                reject($translate.instant('DEBE_INSERTAR'));
              }
            }, 1000);
          });
        },
        allowOutsideClick: false
      }).then(function (texto) {
        self.adicionarParagrafo(num, texto);
      });
    };

    self.adicionarParagrafo = function (num, texto) {
      resolucionRequest.get("resolucion/" + self.resolucion.Id).then(function (/*response*/) {
        if (self.contenidoResolucion.Articulos[num].Paragrafos) {
          self.contenidoResolucion.Articulos[num].Paragrafos.push({ Texto: texto });
        } else {
          self.contenidoResolucion.Articulos[num].Paragrafos = [{ Texto: texto }];
        }
      });
    };

    self.guardarCambios = function () {
      if (self.resolucionValida(self.contenidoResolucion)) {
        self.contenidoResolucion.CuadroResponsabilidades =  JSON.stringify(self.table);
        var ResolucionVinculacionDocente = {
          Id: self.resolucion.Id,
          FacultadId: self.resolucion.FacultadId,
          Dedicacion: self.resolucion.Dedicacion,
          NivelAcademico: self.resolucion.NivelAcademico
        };
        self.contenidoResolucion.Vinculacion = ResolucionVinculacionDocente;
        resolucionRequest.get("resolucion/" + self.resolucion.Id).then(function (response) {
          var res = response.data.Data;
          res.FechaExpedicion = self.resolucion.FechaExpedicion;

          var localRes = JSON.parse(localStorage.getItem("resolucion"));
          localRes.FechaExpedicion = res.FechaExpedicion;
          var local = JSON.stringify(localRes);
          localStorage.setItem('resolucion', local);
          if (self.resolucion.FechaExpedicion !== undefined) {
            res.FechaExpedicion = res.FechaExpedicion.toJSON();
          } else {
            res.FechaExpedicion = new Date('0001-01-01').toJSON();
          }
          if (res.FechaCreacion !== undefined)
          {
            var auxFecha = res.FechaCreacion.split(" ");
            res.FechaCreacion = auxFecha[0];
          }else{
            res.FechaCreacion = Date('0001-01-01').toJSON();
          }
          
          return resolucionRequest.put("resolucion", self.resolucion.Id, res);
        }).then(function (response) {
           if (!response.data.Success) {
             throw response.data;
           }
          return resolucionRequest.put("contenido_resolucion", self.resolucion.Id, self.contenidoResolucion);
        }).then(function (response) {
          if (!response.data.Success) {
            throw response.data;
          }
          swal({
            title: $translate.instant('GUARDADO'),
            text: $translate.instant('GUARDADO_EXITO'),
            type: "success",
            confirmButtonText: $translate.instant('ACEPTAR'),
            showLoaderOnConfirm: true
          }).then(function () {
            $window.location.reload();
          });
        }).catch(function (err) {
          //console.log(err);
          swal({
            title: $translate.instant('ALERTA'),
            text: $translate.instant('PROBLEMA_ALMACENAMIENTO'),
            type: "warning",
            confirmButtonText: $translate.instant('ACEPTAR'),
            showLoaderOnConfirm: true
          });
        });
      } else {
        swal({
          text: $translate.instant('REVISE_DATOS_RESOLUCION'),
          type: "error"
        });
      }
    };

    self.resolucionValida = function (contenidoResolucion) {
      if (!contenidoResolucion.Numero) return false
      if (!contenidoResolucion.Titulo) return false;
      if (!contenidoResolucion.Preambulo) return false;
      if (!contenidoResolucion.Consideracion) return false;

      var resolucionValida = true;
      if (contenidoResolucion.Articulos) {
        contenidoResolucion.Articulos.forEach(function (articulo) {
          if (!articulo.Texto) {
            resolucionValida = false;
            return;
          }
          if (articulo.Paragrafos) {
            articulo.Paragrafos.forEach(function (paragrafo) {
              if (!paragrafo.Texto) {
                resolucionValida = false;
                return;
              }
            });
          }
        });
      }
      return resolucionValida;
    };

    self.generarResolucion = function () {
      if (self.resolucionValida(self.contenidoResolucion)) {
        var documento = pdfMakerService.getDocumento(self.contenidoResolucion, self.resolucion, self.contratados, self.proyectos);
        pdfMake.createPdf(documento).getDataUrl(function (outDoc) {
          document.getElementById('vistaPDF').src = outDoc;
        });
        $("#resolucion").show();
      } else {
        swal({
          text: $translate.instant('REVISE_DATOS_RESOLUCION'),
          type: "error"
        });
      }
    };

    self.getNumeros = function (objeto) {
      var numeros = [];
      if (objeto) {
        for (var i = 0; i < objeto.length; i++) {
          numeros.push(i);
        }
      }
      return numeros;
    };

    self.volver = function () {
      swal({
        text: $translate.instant('CAMBIOS_NO_GUARDADOS'),
        type: 'warning',
        confirmButtonText: $translate.instant('ACEPTAR'),
        cancelButtonText: $translate.instant('CANCELAR'),
        showCancelButton: true,
        cancelButtonColor: '#d33',
        allowOutsideClick: false
      }).then(function () {
        $window.location.href = '#/vinculacionespecial/resolucion_gestion';
      });
    };

    $scope.validarFecha = colombiaHolidaysService.validateDate;

    self.isEdit = false;

    if (self.contenidoResolucion){
      if (self.contenidoResolucion.CuadroResponsabilidades == ""){
        self.contenidoResolucion.CuadroResponsabilidades = buildTable();
      }else{
        self.table = JSON.parse(self.contenidoResolucion.CuadroResponsabilidades);
      }
    }

    self.cancel = function () {
      self.table = buildTable();
      self.isEdit = false;
    };

    self.removeCol = function ($index) {
      if ($index > -1 && self.table.columns.length > 1) {
        self.table.columns.splice($index, 1);
        for (var i = 0, len = self.table.rows.length; i < len; i++) {
          self.table.rows[i].cells.splice($index, 1);
        }
      }
    };

    self.removeRow = function ($index) {
      if ($index > -1 && self.table.rows.length > 1) {
        self.table.rows.splice($index, 1);
      }
    };

    self.addCol = function () {
      var len = self.table.columns.length,
        rowLen = self.table.rows.length;
      self.table.columns.push({ value: 'Nueva Columna ' + len });
      for (var i = 0; i < rowLen; i++) {
        self.table.rows[i].cells.push({ value: ' ' });
      }
    };

    self.addRow = function () {
      var row = { cells: [] },
        colLen = self.table.columns.length;

      row.cells.push({ value: 'REVISÓ Y APROBÓ' });
      for (var i = 1; i < colLen; i++) {
        row.cells.push({ value: '' });
      }
      self.table.rows.push(row);
    };

    function buildTable() {
      return {
        columns: [{
          value: ''
        }, {
          value: 'NOMBRE'
        }, {
          value: 'CARGO'
        }, {
          value: 'FIRMA'
        }],
        rows: [{
          cells: [{
            value: 'PROYECTÓ'
          }, {
            value: ''
          }, {
            value: ''
          }, {
            value: ''
          }]
        }, {
          cells: [{
            value: 'REVISÓ Y APROBÓ'
          }, {
            value: ''
          }, {
            value: ''
          }, {
            value: ''
          }]
        }, {
          cells: [{
            value: 'REVISÓ Y APROBÓ'
          }, {
            value: ''
          }, {
            value: ''
          }, {
            value: ''
          }]
        }]
      };
    }

  });
