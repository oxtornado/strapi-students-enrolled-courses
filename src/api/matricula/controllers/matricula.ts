import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::matricula.matricula', ({ strapi }) => ({
    async create(ctx) {
        const { curso, estudiante, fechaMatricula } = ctx.request.body;
        const fecha = new Date(fechaMatricula);
        const periodo = determinarPeriodo(fecha);

        // Validaciones
        if (await existeMatricula(strapi, curso, estudiante, periodo)) {
            return ctx.badRequest('El estudiante ya está inscrito en este curso y periodo.');
        }

        if (!(await hayCuposDisponibles(strapi, curso))) {
            return ctx.badRequest('No hay cupos disponibles en este curso.');
        }

        // Crear matrícula
        const matricula = await strapi.db.query('api::matricula.matricula').create({
            data: { curso, estudiante, periodo, fechaMatricula: fecha }
        });

        return { matricula };
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

async function hayCuposDisponibles(strapi, curso) {
    const cursoInfo = await strapi.db.query('api::curso.curso').findOne({ where: { id: curso }, select: ['capacidadCurso'] });
    if (!cursoInfo) return false;
    
    const matriculados = await strapi.db.query('api::matricula.matricula').count({ where: { curso } });
    return matriculados < cursoInfo.capacidadCurso;
}

// funcion para mostrar estudiantes matriculados a un curso en especifico en un periodo
async function mostrarEstudiantesMatriculados(strapi, curso, periodo) {
    const matriculas = await strapi.db.query('api::matricula.matricula').findMany({ where: { curso, periodo } });
    const estudiantes = matriculas.map(matricula => matricula.estudiante);
    return estudiantes;
}

// funcion para mostrar estudiantes matriculados a un curso en especifico en un periodo
async function mostrarEstudiantesMatriculadosEnPeriodo(strapi, curso, periodo) {
    const matriculas = await strapi.db.query('api::matricula.matricula').findMany({ where: { curso, periodo } });
    const estudiantes = matriculas.map(matricula => matricula.estudiante);
    return estudiantes;
}

// funcion para mostrar cursos en los que esta matriculado un estudiante específico
async function mostrarCursosMatriculados(strapi, estudiante) {
    const matriculas = await strapi.db.query('api::matricula.matricula').findMany({ where: { estudiante } });
    const cursos = matriculas.map(matricula => matricula.curso);
    return cursos;
}