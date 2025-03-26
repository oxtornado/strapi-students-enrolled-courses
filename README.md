<<<<<<< HEAD
# Gestion de Matriculas de Estudiantes

## Descripcion
Este proyecto implementa una base de datos utilizando **Strapi** y **SQLite** para gestionar la matriculacion de estudiantes en distintos cursos ofrecidos por una institucion educativa.

## Tecnologias utilizadas
- **Strapi** (BackEnd para la API)
- **MySQL** (Base de datos relacional)

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
   git clone git@github.com:oxtornado/strapi-students-enrolled-courses.git
   cd strapi-students-enrolled-courses
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

=======
## Consultas esperadas
1. Lista de estudiantes matriculados a un curso específico
        {
            method: 'GET',
            path: '/matriculas/curso/:curso',
            handler: 'matricula.find',
            config: {
                policies: []
            }
        },
        {
            method: 'GET',
            path: '/matriculas/curso/:curso/periodo/:periodo',
            handler: 'matricula.find',
            config: {
                policies: []
            }
        }
    La ruta /matriculas/curso/:curso devuelve una lista de estudiantes matriculados a un curso específico.
    La ruta /matriculas/curso/:curso/periodo/:periodo devuelve una lista de estudiantes matriculados a un curso específico en un periodo específico.

    Se encuentra el código de la ruta en src/api/matricula/routes/matricula.ts

2. Verificar cantidad de estudiantes matriculados a un curso específico
        {
            method: 'GET',
            path: '/matriculas/curso/:curso/periodo/:periodo/estudiante/:estudiante',
            handler: 'matricula.find',
            config: {
                policies: []
            }
        }
        La ruta /matriculas/curso/:curso/periodo/:periodo/estudiante/:estudiante devuelve la cantidad de estudiantes matriculados a un curso específico en un periodo específico.

        Se encuentra el código de la ruta en src/api/matricula/routes/matricula.ts

3. Lista de cursos en los que esta matriculado un estudiante específico
        {
            method: 'GET',
            path: '/matriculas/curso/:curso/estudiante/:estudiante',
            handler: 'matricula.find',
            config: {
                policies: []
            }
        }
        La ruta /matriculas/curso/:curso/estudiante/:estudiante devuelve la lista de cursos en los que esta matriculado un estudiante específico.
        
        Se encuentra el código de la ruta en src/api/matricula/routes/matricula.ts
>>>>>>> b82eba8 (first commit !!!)
