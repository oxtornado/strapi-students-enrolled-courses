# Gestion de Matriculas de Estudiantes

## Descripcion
Este proyecto implementa una base de datos utilizando **Strapi** y **SQLite** para gestionar la matriculacion de estudiantes en distintos cursos ofrecidos por una institucion educativa.

## Tecnologias utilizadas
- **Strapi** (BackEnd para la API)
- **SQLite** (Base de datos)

## Entidades y Relaciones
- **Estudiantes**: ID, nombre, apellido, fecha de nacimiento, correo, telefono.
- **Cursos**: ID, nombre, descripcion, fecha de inicio y finalizacion, creditos.
- **Matriculas**: ID, estudiante, curso, fecha de matricula.

### Relaciones
- Un **estudiante** puede matricularse en varios cursos.
- Un **curso** puede tener varios estudiantes matriculados.

## Reglas de Negocio
1. Un estudiante no puede matricularse mas de una vez en el mismo curso durante el mismo periodo.
2. Cada curso tiene una capacidad maxima de estudiantes.

## Instalacion
1. Clona el repositorio:
   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta Strapi en desarrollo:
   ```bash
   npm run develop
   ```

## Datos de prueba
Los datos de prueba deben insertarse en las tablas de la base de datos usando la interfaz de Strapi o mediante scripts SQL.

## Consultas esperadas
- Obtener la lista de estudiantes en un curso especifico.
- Contar cuantos estudiantes estan matriculados en un curso.
- Consultar en que cursos esta matriculado un estudiante especifico.

## Autor
oxtornado

