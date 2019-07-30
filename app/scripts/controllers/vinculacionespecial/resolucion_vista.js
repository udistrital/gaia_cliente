'use strict';

/**
* @ngdoc function
* @name clienteApp.controller:ResolucionVistaCtrl
* @description
* # ResolucionVistaCtrl
* Controller of the clienteApp
*/
angular.module('contractualClienteApp')
  .controller('ResolucionVistaCtrl', function (administrativaRequest, oikosRequest, coreRequest, adminMidRequest, pdfMakerService, nuxeoClient, $mdDialog, $scope, $http, $translate) {

    var self = this;
    self.resolucion = JSON.parse(localStorage.getItem("resolucion"));

    /**
     * @name generarDocumentoPdfMake
     * @description
     * Realiza las consultas necesarias para armar el pdf con la información de las tablas resolucion y vinculacion_docente
     */
    self.generarDocumentoPdfMake = function () {
      if (self.resolucion.FechaExpedicion != undefined && self.resolucion.FechaExpedicion !== "0001-01-01T00:00:00Z") {
        self.resolucion.FechaExpedicion = new Date(self.resolucion.FechaExpedicion);
      }

      self.proyectos = [];
      oikosRequest.get("dependencia/proyectosPorFacultad/" + self.resolucion.IdFacultad + "/" + self.resolucion.NivelAcademico_nombre, "").then(function (response) {
        self.proyectos = response.data;
      });
  
      adminMidRequest.get("gestion_documento_resolucion/get_contenido_resolucion", "id_resolucion=" + self.resolucion.Id + "&id_facultad=" + self.resolucion.IdDependenciaFirma).then(function (response) {
        self.contenidoResolucion = response.data;
        adminMidRequest.get("gestion_previnculacion/docentes_previnculados_all", "id_resolucion=" + self.resolucion.Id).then(function (response) {
          self.contratados = response.data;
          self.generarResolucion();
        });
      });
    };
 
    /**
    * @name incluirDesagregacion
    * @description 
    * Función que agrega los campos de la desagregación del salario de los docentes
    */
    self.incluirDesagregacion = function()
    {
      var contador = 0;
      self.contratados.forEach(function(docentes){
        var datosDocenteSalario = new Object();
        
        datosDocenteSalario.NumDocumento = parseInt(docentes.IdPersona);
        datosDocenteSalario.ValorTotalContrato = docentes.ValorContrato;
        datosDocenteSalario.VigenciaContrato = self.resolucion.Vigencia;

        
        titandesagregRequest.post('services/desagregacion_contrato_hcs', JSON.stringify(datosDocenteSalario)).then(function(response) {
          var SalarioDesagreg = response.data;

          SalarioDesagreg.forEach(function(resultado_desagreg){

            switch (resultado_desagreg.Nombre){
              case "salarioBase":
                self.contratados[contador].NSueldoBasico = "Sueldo Básico";
                self.contratados[contador].SueldoBasico = (parseInt(resultado_desagreg.Valor)).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                });
                break;
              case "primaVacaciones":
                self.contratados[contador].NPrimaVacaciones = "Prima de Vacaciones";
                self.contratados[contador].PrimaVacaciones = (parseInt(resultado_desagreg.Valor)).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                });
                break;
              case "primaNavidad":
                self.contratados[contador].NPrimaNavidad = "Prima de Navidad";
                self.contratados[contador].PrimaNavidad = (parseInt(resultado_desagreg.Valor)).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                });
                break;
              case "primaServicios":
                self.contratados[contador].NPrimaServicios = '';
                self.contratados[contador].PrimaServicios = '';
              case "cesantias":
                self.contratados[contador].NAportesCesantias = "Cesantías";
                self.contratados[contador].AportesCesantias = (parseInt(resultado_desagreg.Valor)).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                });   
            }

          });
          
          self.contratados[contador].NPrimaServicios="Prima de servicios";
          self.contratados[contador].PrimaServicios='123';
          contador++;

          //console.log(self.contratados.length)
          if (contador == self.contratados.length)
          {
            console.log('Generando Resolución')
            self.generarResolucion();
          }
         });

      });
    };
    
    /**
     * @name generarResolucion
     * @description 
     * Arma el documento con la información consultada y utiliza la herramienta pdfMake para mostrarlo
     */
    self.generarResolucion = function () {
      var documento = pdfMakerService.getDocumento(self.contenidoResolucion, self.resolucion, self.contratados, self.proyectos);
      //Se hace uso de la libreria pdfMake para generar el documento y se asigna a la etiqueta con el id vistaPDF
      pdfMake.createPdf(documento).getDataUrl(function (outDoc) {
        document.getElementById('vistaPDF').src = outDoc;
      });
    };

    /**
     * @name consultarDocumentoNuxeo
     * @description
     * Consulta la tabla documento para buscar el id con que fue guardada la resolución en nuxeo y posteriormente lo busca para mostrarlo
     */
    self.consultarDocumentoNuxeo = function () {
      coreRequest.get('documento', $.param ({
        query: "Nombre:ResolucionDVE" + self.resolucion.Id,
        limit:0
      })).then(function(response) {
        if (response.data !== null) {
          var documentoResolucion = response.data[0];
          var idNuxeoResolucion = JSON.parse(documentoResolucion.Contenido).IdNuxeo;
          nuxeoClient.getDocument(idNuxeoResolucion).then(function(doc) {
            document.getElementById('vistaPDF').src = doc.url;
          });
        } else {
          self.generarDocumentoPdfMake();      
        }
      });
    };

    if (self.resolucion.Estado === "Expedida") {
      self.consultarDocumentoNuxeo();
    } else {
      self.generarDocumentoPdfMake();
    }

  });