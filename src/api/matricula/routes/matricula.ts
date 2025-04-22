/**
 * matricula router
 */
import { factories } from '@strapi/strapi';

export default {
  routes: [
    // Rutas CRUD básicas
    {
      method: 'GET',
      path: '/matriculas',
      handler: 'matricula.find',
      config: {
        policies: []
      }
    },
    {
      method: 'POST',
      path: '/matriculas',
      handler: 'matricula.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/matriculas/:id',
      handler: 'matricula.findOne',
      config: {
        policies: []
      }
    },
    {
      method: 'PUT',
      path: '/matriculas/:id',
      handler: 'matricula.update',
      config: {
        policies: []
      }
    },
    {
      method: 'DELETE',
      path: '/matriculas/:id',
      handler: 'matricula.delete',
      config: {
        policies: []
      }
    },
    
    // Rutas personalizadas
    {
      method: 'GET',
      path: '/matriculas/estudiante/:estudiante',
      handler: 'matricula.mostrarCursosMatriculados',
      config: {
        policies: []
      }
    },
    {
      method: 'GET',
      path: '/matriculas/curso/:curso/periodo/:periodo/cantidad',
      handler: 'matricula.contarEstudiantes',
      config: {
        policies: []
      }
    },
    
    // Rutas de filtrado (opcional - pueden manejarse con el find estándar y query params)
    {
      method: 'GET',
      path: '/matriculas/filtro/curso/:curso',
      handler: 'matricula.find',
      config: {
        policies: []
      }
    },
    {
      method: 'GET',
      path: '/matriculas/filtro/curso/:curso/periodo/:periodo',
      handler: 'matricula.find',
      config: {
        policies: []
      }
    },
    {
      method: 'GET',
      path: '/matriculas/filtro/estudiante/:estudiante',
      handler: 'matricula.find',
      config: {
        policies: []
      }
    },
  ]
}