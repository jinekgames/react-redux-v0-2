import { generateHash } from './helpers.js';
import database from './database/connection.js';
import { v4 as uuidv4 } from 'uuid';
import Boom from '@hapi/boom';

// бд лежат тут:
// C:\Program Files\MongoDB\Server\4.2\data\

export default {
    index: async (req, h) => {
        return 'Hello World!';
    },
    hello: async (req, h) => {
        console.log(req.auth.credentials);
        return { 
            name: req.auth.credentials.name,
            userId: req.auth.credentials.userId,
            email: req.auth.credentials.email,
        };
    },
    info: async (req, h) => {
        return {
            info: 'here is some serious admin info, dont look if u r user',
        };
    },
    login: async (req, h) => {
        try {
            // req.auth.credentials;
            const foundUser = await database.user.findOne({ email: req.payload.email });

            console.log('foundUser = ' + foundUser);
            if (!foundUser) {
                return Boom.badRequest('user with such email doednt exist');
            }

            const { email, password } = req.payload;
            const passwordHash = generateHash(password);
            if (passwordHash === foundUser.password) {
                return { token: foundUser.token}
            }

            return {
                token: user.token
            }

        } catch (e) {
            console.log(e);
            return 'ошибка'
        }
    },
    register: async (req, k) => {
        try {
            const { email, password, name = 'noname', ...restFields } = req.payload;

            const alreadyRegistered = await database.user.findOne({ email });
            if (alreadyRegistered) {
                return Boom.badRequest('Данный email уже занят, попробуйте другой');
            }

            const passwordHash = generateHash(password);

            //добавление пользователя в бд
            const nUser = new database.user({ email: email, password: passwordHash, userId: uuidv4(), name: name});

            nUser.save((err, user) => {
                if (err) {
                  console.log('err', err)
                }
                console.log('saved user', user)
            });

            return 'success';
        } catch (e) {
            console.log(e);
            return Boom.badImplementation('Произошла ошибка при регистрации пользователя, попробуйте позднее ' + e.message);
        }
    },
    users: async (req, k) => {
        const usersDefault = await database.user.find();
        console.log(usersDefault);

        let users = [];
        //console.log(usersDefault.length());
        for(let i in usersDefault)
        {
            console.log("шаг ", i);
            users.push( {
                name: usersDefault[i].name,
                email: usersDefault[i].email,
                userId: usersDefault[i].userId,
            });
        }
        console.log(users);

        return { users };
    },
    posts: async (req, k) => {
        const posts = await database.post.find();
        console.log(posts);
        return { posts };
    },
    createPost: async (req, k) => {
        try {
            const date = +(new Date);
            const { user, userId, ...restFields } = req.payload;

            //добавление поста в бд
            const nPost = new database.post({ user: user, date: date, id: uuidv4(), userId: userId, img: restFields.img || "", name: restFields.name || "" });

            nPost.save((err, post) => {
                if (err) {
                  console.log('err', err);
                }
                console.log('saved post', post);
            });

            return 'success';
        } catch (e) {
            console.log(e);
            return Boom.badImplementation('Произошла ошибка при добавлении поста, попробуйте позднее ' + e.message);
        }
    },
    getinfoadmin: async (req, k) => {
        if (req.params.token == 'admin')
            return {
                msg: 'сообщение для админа',
            }
        return 'ты не админ';
    },
    delete: async (req, k) => {
        try {
        console.log('user for deleting:', req.auth.credentials);
        database.user.deleteOne({ token:  req.auth.credentials.token }, function (err) {
            if (err) return handleError(err);
        });
        let msg = `Привет, ${req.auth.credentials.name}, твой профиль был удален :(`;
        return msg;
        } catch (e) {
            console.log(e);
            return 'ошибка'
        }
    },
    edit: async (req, k) => {
        try {
        console.log('user for before:', req.auth.credentials);

        const { name } = req.payload;
        if (name) {
        database.user.updateOne({ token:  req.auth.credentials.token }, { name: name }, function(err, res) {
            // Updated at most one doc, `res.modifiedCount` contains the number
            // of docs that MongoDB updated
        });
        }

        console.log('user for now:', database.user.findOne({ token: req.auth.credentials.token }));
        let msg = `Привет, ${req.auth.credentials.name}, твой профиль был отредактирован`;
        return msg;
        } catch (e) {
            console.log(e);
            return 'ошибка'
        }
    },

}
