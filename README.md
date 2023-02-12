# Cloud App 
Documentación para la API Contacts App
[Contacts App API](http://localhost:5173).
Server: https://localhost:3000

# ¿Cómo poner la ruta de la carpeta que queremos usar?
+ Hay que crear un fichero .env en la carpeta Server y añadir lo siguiente:
    + PORT=puerto - Puerto donde escuchará el servidor
    + PATH_API='path' - Ruta de la carpeta que queremos usar
  

# Group FS
Endpoints para la gestión de los directorios y ficheros

## GET [/api/v1/{path?}]
Devuelve todos los directorios y ficheros de la ruta pasada en la url. Si no se pasa ninguna, la ruta sera la carpeta root de la carpeta proporcionada.

+ Parameters
    + path: `imagenes-boda` (string) - Ruta de la carpeta boda dentro de la carpeta principal
+ Más ejemplos de path:
    + path: ' ' - Ruta 'root' de la carpeta indicada en el .env
    + path: `imagenes` - Carpeta 'imagenes' dentro de la carpeta indicada en el .env
    + path: `Universidad-examenes` - Carpeta 'examenes' dentro de la carpeta universidad que a su vez es una carpeta dentro de la carpeta principal indicada en el en el .env

+ Responses:
    + 200 - Todo ha ido bien y se lista los directorios y ficheros de la ruta especificada
    + 404 - No se ha encontrado la ruta

+ Return (application/json)
    ```js
    {
        directories: ['fotosPorMesa'],
        files: ['img1.png', 'img2.png']
    }


    ```

## GET [/api/v1/download/{path?}]
Descarga el fichero indicado

+ Parameters
    + path: `Universidad-examenes-examen.pdf` (string) - Descarga examen.pdf

+ Responses:
    + 200 - Todo ha ido bien y se descarga el fichero
    + 404 - No existe el fichero

+ Return (application/json)
    + El fichero

## POST [/api/v1/{path?}]
Crear directorio

+ Responses:
    + 201 - Directorio creado
    + 404 - Directorio ya existente o ruta no indicada

+ Información necesaria para crear un directorio:
    + Path - ruta del directorio, por ejemplo, path = prueba-dirDePrueba. Se crea dirDePrueba dentro de prueba
NOTA: no poner nombres que contienen '-', es un carácter especial para el servidor para poder crear los directorios

+ Return (application/json)
    ```js
    {
        "The directory [path] has been created"
    }
    ```
## POST [/api/v1/upload/{path?}]
Subir ficheros al servidor

+ Parameters
    + path: `Universidad` (string) - Ruta donde subir los ficheros

+ Responses:
    + 201 - Todo ha ido bien y se han subido los ficheros
    + 404 - No existe el directorio o no se ha mandando ningún fichero

+ Información necesaria para subir ficheros al servidor:
    + files - ficheros para subir al servidor
NOTA: en la cabecera de la solicitud añadir la cabecera 'files' y los ficheros subirlos desde el cliente mediante el body como form-data

+ Return (application/json)
    ```js
    {
        "The files has been added"
    }
    ```

## PUT [/api/v1/{path?}]
Cambiar el nombre a un directorio o fichero

+ Parameters
    + path: `Universidad` | `Universidad-apuntes.txt` (string) - El directorio a cambiar de nombre o fichero a cambiar de nombre

+ Responses:
    + 200 - Todo ha ido bien y se cambia el nombre al fichero o directorio
    + 400 - No se ha encontrado el parametro 'name' en el json de solicitud
    + 404 - No existe el fichero o directorio o no se ha puesto la extensión del fichero en el parametro name

+ Información necesaria para cambiar nombre al directorio o fichero:
    + name - nuevo nombre
    ```js
        {
            'name': 'prueba'
        }
    ```
NOTA: en el json del body de la solicitud tiene que tener como parametro 'name' con el nombre del nuevo fichero o directorio. Si no es así el servidor mandará error. Además si es un
fichero hay que poner el nombre con su extensión: 'prueba.txt'

+ Return (application/json)
    ```js
    { 
        "The file or directory [path] has been updated to name [name]" 
    }
    ```

## DELETE [/api/v1/{path?}]
Eliminar un directorio o fichero

+ Parameters
    + path: `Universidad` | `Universidad-apuntes.txt` (string) - El directorio o fichero que se quiere eliminar

+ Responses:
    + 200 - Todo ha ido bien y se ha eliminado el directorio o fichero
    + 404 - No existe el fichero o directorio o se ha mandado la ruta '/', no se puede mandar esa ruta sino se eliminaría todo el directorio

+ Return (application/json)
    ```js
    { 
        "The file or directory [path] has been removed" 
    }
    ```

# Como ejecutar la aplicación

+ Ejecutar el servidor
    ```shell
        cd Server
        npm run dev
    ```

+ Ejecutar el minicliente en React
    ```shell
        cd Frontend-React
        npm run dev
    ```

+ El servidor se ejecutará en localhost:3000 y el cliente en localhost:5173


# Imágenes del cliente



