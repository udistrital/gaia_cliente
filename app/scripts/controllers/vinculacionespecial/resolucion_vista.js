'use strict';

/**
* @ngdoc function
* @name clienteApp.controller:ResolucionVistaCtrl
* @description
* # ResolucionVistaCtrl
* Controller of the clienteApp
*/
angular.module('contractualClienteApp')
  .controller('ResolucionVistaCtrl', function (administrativaRequest, oikosRequest,titandesagregRequest, coreRequest, adminMidRequest, pdfMakerService, nuxeoClient, $mdDialog, $scope, $http, $translate) {

    var self = this;
    var docentes_contratados = this;
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
          self.incluirDesagregacion();  
          // Si existen valores dentro de contratados se ejecuta la desagregación, de lo contratio no
          if (self.contratados.length > 0)
          {
            self.incluirDesagregacion(); 
          }else{
            self.generarResolucion();
          }
          console.log(self.contratados)
          
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
        
        datosDocenteSalario.cedula = docentes.IdPersona;
        datosDocenteSalario.salario = docentes.ValorContrato;
        datosDocenteSalario.vigencia = '';
        datosDocenteSalario.inicioresolucion = docentes.FechaInicio;
        datosDocenteSalario.finalizacionresolucion = '';

        console.log(JSON.stringify(datosDocenteSalario))
        //console.log(docentes)

        titandesagregRequest.post('operaciones/desagregacion', JSON.stringify(datosDocenteSalario)).then(function(response) {
          var SalarioDesagreg = response.data;
          console.log(SalarioDesagreg)
          self.contratados[contador].NSueldoBasico="Sueldo básico";
          self.contratados[contador].SueldoBasico=SalarioDesagreg.sueldo_Basico;
          self.contratados[contador].NPrimaNavidad="Prima de navidad";
          self.contratados[contador].PrimaNavidad=SalarioDesagreg.prima_Navidad;
          self.contratados[contador].NPrimaVacaciones="Prima de vacaciones";
          self.contratados[contador].PrimaVacaciones=SalarioDesagreg.prima_Servicios;
          self.contratados[contador].NPrimaServicios="Prima de servicios";
          self.contratados[contador].PrimaServicios=SalarioDesagreg.prima_Vacaciones;
          self.contratados[contador].NAportesCesantias="Aportes de cesantías de fondos públicos";
          self.contratados[contador].AportesCesantias=SalarioDesagreg.aportes_Cesantias;
          contador++;
          console.log(contador)
          console.log(self.contratados.length)
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