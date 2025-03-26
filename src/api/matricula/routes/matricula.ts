/**
 * matricula router
 */

import { factories } from '@strapi/strapi';
import { Routes } from 'react-router-dom';

export default {
    routes: [
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
            handler: 'matricula.create', // No 'post', debe ser 'create'
            config: {
              policies: [],
              middlewares: [],
            },
          },
        {
            method: 'GET',
            path: '/matriculas/findOneById/:id',
            handler: 'matricula.findOneById',
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
        {
            method: 'GET',
            path: '/matriculas/create',
            handler: 'matricula.create',
            config: {
                policies: []
            }
        },
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
        },
        {
            method: 'GET',
            path: '/matriculas/curso/:curso/periodo/:periodo/estudiante/:estudiante',
            handler: 'matricula.find',
            config: {
                policies: []
            }
        },
        {
            method: 'GET',
            path: '/matriculas/curso/:curso/estudiante/:estudiante',
            handler: 'matricula.find',
            config: {
                policies: []
            }
        }
    ]
}