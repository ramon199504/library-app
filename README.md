
# Biblioteca 

Soluciones GBH acaba de contratarlo a ústed para crear su biblioteca en línea. La misma le instruyó construir un REST API el cuál permita sus clientes consumir el listado de libros disponibles, así como también, leer dichos libros página por página en el formato deseado. 

Para esta primera iteración los libros estarán disponibles (página por página) en texto plano y HTML. En próximas iteraciones se agregará soporte para más formatos de lectura, y además, se agregará soporte para interconectarse con otros servicios proveedores de libros en línea. 

## Requerimientos Técnicos 

- Ver listado de libros
- Visualizar un libro
- Visualizar por página de un libro en el formato deseado.
- Hacer uso de friendly routes (ej; /book/1 ó /book/1 /page/11/html).
- Proveer seeders/migrations para la base de datos (libros con sus páginas).
- Proveer una explicación de cómo configurar su proyecto. 

## Reglas

- No haga uso de ningún framework, un buen desarrollador debe saber seleccionar sus herramientas y ponerlas a funcionar en conjunto.
- El uso de librerías de terceros es permitido y alentado.
- Haga uso de .gitignore, evite al máximo incluir archivos innecesarios. 

## Criterios de Evaluación 

1. Requerimientos técnicos.
2. Organización y consistencia de la estructura de archivos y folders.
3. Modificabilidad y extensibilidad del sistema en los puntos requeridos. 
4. Commit history (commits son organizados y descriptivos).
5. Tiempo utilizado para completar la prueba.
6. Complejidad de la solución.
7. SOLID principles.
8. Uso correcto de patrones de diseño. 

## Instrucciones para la configuración del proyecto
#### Dependencias 
Este proyecto fue desarrollado usando Node.js en conjunto con React para el front end y MongoDB para la base de datos. Solamente hace falta que Node y Mongo estén instaladas previamente ya que las librerías individuales las instalaremos luego usando 'npm'. Las versiones que usé en mi computadora fueron:
* Node: v10.14.1
* npm (instalador de paquetes de node): 6.13.4
* mongo: v4.0.8

#### Pasos (Usando la terminal)
1. Clonar el repository
2. Navegar al root folder del proyecto
3. Navegar a: 'library-seeder'
4. Ejecute `npm install`
5. Navegar a: 'src'
6. Ejecute `node Seeder.js`
	> NOTA: Este es el programa que llena la base de dato con información pregenerada. El programa 'PageTextGenerator.js' se encarga de generar páginas random usando información de varios API's. Si les interesa pueden modificar ese programa para cambiar la data, pero es totalmente opcional. El Seeder asume que la base de dato esta en localhost a una base de datos llamada 'library'. Si desea cambiar esto, solo hay que cambiar la línea 8 de 'Seeder.js' `database:  "mongodb://127.0.0.1:27017/library"`
7. Navegar a: `../../library-api/`
8. Ejecute `npm install`
9. Navegar a: 'src'
10. Ejecute `node Server.js`
	>NOTA: Este es el REST API que corre en port: 3004
11. Navegar a: `../../library-client`
12. Ejecute `npm install`
13. Ejecute `npm start`
	>NOTA: Este paso lanzará el frontend en localhost. Debería de recibir la lista de libros del API y visualizarla en el home page. El usuario podrá cliquear en cada libro y ver cada página por página.



