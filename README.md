# resoluciones_cliente

Este proyecto es un gestor de resoluciones de vinculación docente

## Especificaciones Técnicas

### Tecnologías Implementadas y Versiones
En este repositorio se encuentra el cliente del modulo de resoluciones.
Se hace uso de :
* [Angular JS 1.8](https://angularjs.org/)
* [Bootstrap 3](https://getbootstrap.com/docs/3.3/)
* [Angular JS generator](https://github.com/fabianLeon/oas)
* [Node.js en la versión estable](https://nodejs.org/en/)

### Variables de Entorno
```shell
# En Pipeline
AWS_ACCESS_KEY_ID: llave de acceso ID Usuario AWS
AWS_SECRET_ACCESS_KEY: Secreto de Usuario AWS
```

## Ejecución del Proyecto

### Configuración del proyecto

* Clonar el repositorio: 
    ```shell 
        git clone https://github.com/udistrital/resoluciones_cliente
    ```
* entrar a la carpeta del repositorio: 
    ```shell 
        cd resoluciones_cliente
    ```
* Ir al rama "resoluciones_cliente":
    ```shell 
        git checkout resoluciones_cliente         
    ```
    
* Instalar yo, grunt, bower y generator- karma y generator-oas
    ```shell 
        npm install -g grunt-cli bower yo generator-karma generator-oas
    ```
* Instalar dependencias
    ```shell 
        npm install
    ```
    ```shell 
        bower install
    ```

Para ejecutar el proyecto localmente se debe verificar en el archivo “config.js”, ubicado en la carpeta app/scripts/services/, que las apis estén correactamente configuradas y que estén desplegadas.

**conf_local**:
```
angular.module('resolucionesClienteApp')
    .constant('CONF', {
        GENERAL: conf_pruebas
    });

```
Ahora se puede correr el api de la siguiente manera:
    ```
        grunt serve
    ```

Para crear el build de la aplicación:
    ```
        grunt build
    ```

El cliente se depliega en el puerto [9000](http://localhost:9000). 

### Ejecución Dockerfile
```bash
# Does not apply
```
### Ejecución docker-compose
```bash
# Does not apply
```

## Ejecución Pruebas

La pruebas se relizan con [karma](https://karma-runner.github.io/latest/index.html), ejecutar el comando:
    ```
        grunt test
    ```

## Estado CI

| Develop | Relese | Master |
| -- | -- | -- |
| [![Build Status](https://hubci.portaloas.udistrital.edu.co/api/badges/udistrital/resoluciones_cliente/status.svg?ref=refs/heads/develop)](https://hubci.portaloas.udistrital.edu.co/udistrital/resoluciones_cliente) | [![Build Status](https://hubci.portaloas.udistrital.edu.co/api/badges/udistrital/resoluciones_cliente/status.svg?ref=refs/heads/release)](https://hubci.portaloas.udistrital.edu.co/udistrital/resoluciones_cliente) | [![Build Status](https://hubci.portaloas.udistrital.edu.co/api/badges/udistrital/resoluciones_cliente/status.svg)](https://hubci.portaloas.udistrital.edu.co/udistrital/resoluciones_cliente) |

## Licencia

[This file is part of resoluciones_cliente.](LICENSE)

resoluciones_cliente is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (atSara Sampaio your option) any later version.

resoluciones_cliente is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with sga_cliente. If not, see https://www.gnu.org/licenses/.
