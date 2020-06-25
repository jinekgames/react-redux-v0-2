import Joi from '@hapi/joi';
import controllers from './controllers.js';

export default [
    {
        method: 'GET',
        path: '/hello',
        handler: controllers.hello,
        options: {
            cors: { origin: ['*'] },
            auth: {
                 strategy: 'user',
            },
        }
    },
    {//
        method: 'GET',
        path: '/info',
        handler: controllers.info,
        options: {
            auth: {
                strategy: 'admin'
            },
        }
    },
    {
        method: 'POST',
        path: '/login',
        handler: controllers.login,
        options: {
            cors: { origin: ['*'] },
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required(),
                    password: Joi.string().min(8).required(),
                }),
            },
        }
    },
    {
        method: 'POST',
        path: '/register',
        handler: controllers.register,
        options: {
            cors: { origin: ['*'] },
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required(),
                    password: Joi.string().min(8).required(),
                    name: Joi.string(),
                }),
            }
        }
    },
    {
        method: 'GET',
        path: '/users',
        handler: controllers.users,
        options: {
            cors: { origin: ['*'] },
        }
    },
    {
        method: 'GET',
        path: '/posts',
        handler: controllers.posts,
        options: {
            cors: { origin: ['*'] },
        }
    },
    {
        method: 'POST',
        path: '/createpost',
        handler: controllers.createPost,
        options: {
            cors: { origin: ['*'] },
            // auth: {
            //      strategy: 'user',
            // },
        }
    },
    {
        method: 'GET',
        path: '/delete',
        handler: controllers.delete,
        options: {
            cors: { origin: ['*'] },
            auth: {
                strategy: 'user',
            },
        }
    },
    {
        method: 'POST',
        path: '/edit',
        handler: controllers.edit,
        options: {
            cors: { origin: ['*'] },
            // auth: {
            //      strategy: 'user',
            // },   //на пост запросах не работает станлартная аутентификация
        }
    },
    {//
        method: 'GET',
        path: '/{file*}',
        handler: {
            directory: {
                path: './public',
                redirectToSlash: true,
                index: true,
            }
        }
    },
];
