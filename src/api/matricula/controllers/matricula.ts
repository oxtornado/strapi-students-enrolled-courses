import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::matricula.matricula', ({ strapi }) => ({
  async create(ctx) {
    try {
      const body = ctx.request.body;
      console.log('📥 Body recibido:', body);
  
      // Ajustar los nombres de los campos para que coincidan con tu petición
      const { curso, estudiante, fechaMatricula } = body.data || {};
      const fecha = new Date(fechaMatricula);
      
      // Usar el periodo proporcionado en la petición
      const periodo = body.data.periodo || determinarPeriodo(fecha);
  
      console.log('📅 Fecha de matrícula:', fecha);
      console.log('📘 Curso ID:', curso);
      console.log('👤 Estudiante ID:', estudiante);
      console.log('🗓️ Periodo:', periodo);
  
      const yaExiste = await existeMatricula(strapi, curso, estudiante, periodo);
      console.log('🧐 ¿Ya existe matrícula?:', yaExiste);
  
      if (yaExiste) {
        return ctx.badRequest('El estudiante ya está inscrito en este curso y periodo.');
      }
  
      // Pasar el periodo específico a la función de verificación de cupos
      const cupos = await hayCuposDisponibles(strapi, curso, periodo);
      console.log('📊 ¿Hay cupos disponibles?:', cupos);
  
      if (!cupos) {
        return ctx.badRequest('No hay cupos disponibles en este curso.');
      }
  
      // Mantener coherencia con los nombres de campos
      const matricula = await strapi.db.query('api::matricula.matricula').create({
        data: { 
          curso, 
          estudiante, 
          periodo,
          fechaMatricula: fecha
        }
      });
  
      console.log('✅ Matrícula creada:', matricula);
  
      return { data: matricula }; // Formato estándar de respuesta de Strapi
    } catch (error) {
      console.error('💥 ERROR EN CREATE:', error);
      return ctx.internalServerError('Error interno al crear la matrícula.');
    }
  },

    async find(ctx) {
        const { curso, periodo } = ctx.params;
        const matriculas = await strapi.db.query('api::matricula.matricula').findMany({ where: { curso, periodo } });
        return { matriculas };
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
    // funcion para mostrar estudiantes matriculados a un curso en especifico en un periodo
    async mostrarEstudiantesMatriculados(ctx) {
        const { curso, periodo } = ctx.params;
        const matriculas = await strapi.db.query('api::matricula.matricula').findMany({ where: { curso, periodo } });
        const estudiantes = matriculas.map(matricula => matricula.estudiante);
        return ctx.send({ estudiantes });
    },
    
    // funcion para mostrar estudiantes matriculados a un curso en especifico en un periodo
    async mostrarEstudiantesMatriculadosEnPeriodo(ctx) {
        const { curso, periodo } = ctx.params;
        const matriculas = await strapi.db.query('api::matricula.matricula').findMany({ where: { curso, periodo } });
        const estudiantes = matriculas.map(matricula => matricula.estudiante);
        return estudiantes;
    },
    
    // Primera funcion para mostrar cursos matriculados a un estudiante en especifico
    async mostrarCursosMatriculados(ctx) {
        const { estudiante } = ctx.params;
        const matriculas = await strapi.db.query('api::matricula.matricula').findMany({ where: { estudiante } });
        const cursos = matriculas.map(matricula => matricula.curso);
        return ctx.send({ cursos });
    }
}));

// Funciones auxiliares
function determinarPeriodo(fecha) {
    return fecha.getMonth() + 1 <= 6 ? 1 : 2;
}

async function existeMatricula(strapi, curso, estudiante, periodo) {
    const matricula = await strapi.db.query('api::matricula.matricula').findOne({ where: { curso, estudiante, periodo } });
    return !!matricula;
}

async function hayCuposDisponibles(strapi, curso, periodo) {
  console.log(`Verificando cupos para curso ${curso} en periodo ${periodo}`);
  
  if (!curso) {
    console.log('⚠️ ID de curso no proporcionado');
    return false;
  }
  
  try {
    const cursoInfo = await strapi.db.query('api::curso.curso').findOne({ 
      where: { id: curso }, 
      select: ['capacidadCurso'] 
    });
    
    console.log('Información del curso:', cursoInfo);
    
    if (!cursoInfo) {
      console.log(`⚠️ No se encontró el curso con ID: ${curso}`);
      return false;
    }
    
    const matriculados = await strapi.db.query('api::matricula.matricula').count({ 
      where: { curso, periodo } 
    });
    
    console.log(`Capacidad del curso: ${cursoInfo.capacidadCurso}, Matriculados en periodo ${periodo}: ${matriculados}`);
    
    return matriculados < cursoInfo.capacidadCurso;
  } catch (error) {
    console.error('Error al verificar cupos disponibles:', error);
    return false;
  }
}