import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::matricula.matricula', ({ strapi }) => ({
  async create(ctx) {
    try {
      const { curso, estudiante, periodo } = ctx.request.body.data;
  
      // 1. Buscar el curso
      const cursoData = await strapi.db.query('api::curso.curso').findOne({
        where: { id: curso },
        select: ['capacidadCurso'], // aqui esta seleccionando la capacidad del curso
      });

      const infoCurso = await strapi.db.query('api::curso.curso').findOne({
        where: { id: curso },
        select: ['nombreCurso', 'descripcionCurso', 'fechaInicioCurso', 'fechaFinCurso', 'creditosCurso', 'capacidadCurso'], // aqui esta seleccionando la capacidad del curso
      });

      console.log('Info curso:', infoCurso);
  
      if (!cursoData) {
        return ctx.badRequest('El curso no existe');
      }
  
      // 2. Verificar si ese curso tiene alguna matrícula en ese periodo
      const matriculasEnPeriodo = await strapi.entityService.findMany('api::matricula.matricula', {
        filters: { // aqui filtra por curso y periodo
          curso: curso,
          periodo: periodo,
        },
        fields: ['id'],
      });
  
      if (matriculasEnPeriodo.length > infoCurso.capacidadCurso) { // si no hay matrículas en ese periodo, devuelve un error
        return ctx.badRequest('Este curso no está disponible en el periodo solicitado');
      }
  
      // 3. Verificar capacidad
      const totalMatriculas = matriculasEnPeriodo.length + 1;
      if (totalMatriculas > cursoData.capacidadCurso) {
        return ctx.badRequest('El curso ha alcanzado su capacidad máxima');
      }
  
      // 4. Crear la matrícula si todo va bien
      const nuevaMatricula = await strapi.entityService.create('api::matricula.matricula', {
        data: {
          curso,
          estudiante,
          periodo,
          fechaMatricula: ctx.request.body.data.fechaMatricula,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
  
      return ctx.send(nuevaMatricula);
  
    } catch (error) {
      console.error('Error al crear matrícula:', error);
      return ctx.internalServerError('Error al crear la matrícula');
    }
  }
  ,

    async find(ctx) {
        const { curso, periodo } = ctx.params;
        const matriculas = await strapi.db.query('api::matricula.matricula').findMany({
          where: { curso, periodo },
          populate: { estudiante: true }
        });
        return { data: matriculas };
    },

    async findOneById(ctx) {
        const { id } = ctx.params;
        const matricula = await strapi.db.query('api::matricula.matricula').findOne({ where: { id } });
        return { matricula };
    },

    async update(ctx) {
        const { id } = ctx.params;
        const { curso, estudiante, fechaMatricula } = ctx.request.body;
        const fecha = new Date(fechaMatricula);
        const periodo = determinarPeriodo(fecha);

        const existe = await strapi.db.query('api::matricula.matricula').findOne({ where: { curso, estudiante, periodo } });
        if (!existe) return ctx.badRequest('El estudiante no está inscrito en este curso y periodo.');

        const matricula = await strapi.db.query('api::matricula.matricula').update({ data: { curso, estudiante, periodo, fechaMatricula: fecha, id } });
        return { matricula };
    },

    async delete(ctx) {
        const { id } = ctx.params;
        const existe = await strapi.db.query('api::matricula.matricula').findOne({ where: { id } });
        if (!existe) return ctx.badRequest('No existe una matrícula con ese ID.');

        const matricula = await strapi.db.query('api::matricula.matricula').delete({ where: { id } });
        return { matricula };
    },
    
    // Función para mostrar los cursos en los que un estudiante está matriculado
    async mostrarCursosMatriculados(ctx) {
      console.log('1. Iniciando mostrarCursosMatriculados');
      console.log('1.1. Parámetros recibidos:', ctx.params);
      
      const estudianteId = parseInt(ctx.params.estudiante);
      console.log('2. ID del estudiante convertido:', estudianteId, 'tipo:', typeof estudianteId);
      
      // Verifica que sea un número válido
      if (isNaN(estudianteId)) {
        console.log('3. ERROR: ID del estudiante no es un número válido');
        return ctx.badRequest('El ID del estudiante debe ser un número');
      }
      
      try {
        console.log('4. Intentando consultar matriculas con estudiante ID:', estudianteId);
        
        // Log de la consulta que vamos a ejecutar
        console.log('4.1. Ejecutando consulta:', {
          entidad: 'api::matricula.matricula',
          where: { estudiante: estudianteId },
          populate: ['curso']
        });
        
        const matriculas = await strapi.db.query('api::matricula.matricula').findMany({
          where: { estudiante: estudianteId },
          populate: ['curso']
        });
        
        console.log('5. Resultado de la consulta - Número de matrículas encontradas:', matriculas.length);
        console.log('5.1. Primera matrícula (si existe):', matriculas[0] ? JSON.stringify(matriculas[0]) : 'No hay matrículas');
        
        const cursos = matriculas.map(matricula => {
          console.log('6. Procesando matrícula con ID:', matricula.id);
          console.log('6.1. Datos del curso en esta matrícula:', matricula.curso ? JSON.stringify(matricula.curso) : 'Curso no encontrado');
          return matricula.curso;
        });
        
        console.log('7. Total de cursos extraídos:', cursos.length);
        console.log('8. Enviando respuesta al cliente');
        
        return ctx.send({ cursos });
      } catch (error) {
        console.error('ERROR en mostrarCursosMatriculados:', error.message);
        console.error('Detalles completos del error:', error);
        console.error('Stack trace:', error.stack);
        return ctx.internalServerError('Error al consultar las matrículas: ' + error.message);
      }
    },

    // Funcion para contar el número de matriculas de un estudiante en un curso en un periodo// NUEVA función para contar
    async contarEstudiantes(ctx) {
      const { curso, periodo } = ctx.params;
    
      const matriculas = await strapi.db.query('api::matricula.matricula').findMany({
        where: {
          curso: parseInt(curso, 10),
          periodo: parseInt(periodo, 10)
        }
      });
    
      return ctx.send({
        curso,
        periodo,
        count: matriculas.length
      });
    },    
}));

// Funciones auxiliares
function determinarPeriodo(fecha) {
    return fecha.getMonth() + 1 <= 6 ? 1 : 2;
}