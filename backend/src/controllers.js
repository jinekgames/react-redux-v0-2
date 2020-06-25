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
        console.log('Logged in (id): ' + req.auth.credentials.userId);
        return { 
            name: req.auth.credentials.name,
            userId: req.auth.credentials.userId,
            email: req.auth.credentials.email,
            img: req.auth.credentials.img,
            bio: req.auth.credentials.bio,
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

            //console.log('Logged in: ' + req.payload.email);
            if (!foundUser) {
                return Boom.badRequest('user with such email doednt exist');
            }

            const { password } = req.payload;
            const passwordHash = generateHash(password);
            if (passwordHash === foundUser.password) {
                return { token: foundUser.token}
            }

            return {
                token: foundUser.token
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
        console.log("some boy wanna see da users");

        let users = [];
        //console.log(usersDefault.length());
        for(let i in usersDefault)
        {
            //console.log("шаг ", i);
            users.push( {
                name: usersDefault[i].name,
                email: usersDefault[i].email,
                userId: usersDefault[i].userId,
                bio: usersDefault[i].bio,
                img: usersDefault[i].img,
            });
        }
        console.log(users);

        return { users };
    },
    posts: async (req, k) => {
        const posts = await database.post.find();
        console.log("some boy wanna see da posts");
        //console.log(posts);
        posts.reverse();
        return { posts };
    },
    createPost: async (req, k) => {
        try {
            const date = +(new Date);
            const { user, userId, ...restFields } = req.payload;

            if (!restFields.img) {
                return Boom.badRequest();
            }

            const foundUser = await database.user.findOne({ token: restFields.userToken });

            //добавление поста в бд
            const nPost = new database.post({
                user: foundUser.name,   //req.auth.credentials.name,
                date: date, id: uuidv4(),
                userId: foundUser.userId,   //req.auth.credentials.userId,
                img: restFields.img,
                name: restFields.name,
            });

            nPost.save((err, post) => {
                if (err) {
                  console.log('err', err);
                }
                console.log('saved post (id):', post.id);
            });

            return 'success';
        } catch (e) {
            console.log(e);
            return Boom.badImplementation('Произошла ошибка при добавлении поста, попробуйте позднее ' + e.message);
        }
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

        if (req.payload.password && req.payload.password.length() < 8) {
            return Boom.badRequest("Слшиком короткий пароль");
        }

        if (req.payload.img) {
            database.user.updateOne({ token:  req.payload.token }, { img: req.payload.img }, function(err, res) {});
        }
        if (req.payload.bio) {
            database.user.updateOne({ token:  req.payload.token }, { bio: req.payload.bio }, function(err, res) {});
        }
        if (req.payload.password) {
            database.user.updateOne({ token:  req.payload.token }, { password: req.payload.password }, function(err, res) {});
        }
        if (req.payload.name) {
            database.user.updateOne({ token:  req.payload.token }, { name: req.payload.name }, function(err, res) {});
        }

        let msg = "Профиль был отредактирован";
        console.log("user (token) modified his profile:", req.payload.token);
        return msg;
        } catch (e) {
            console.log(e);
            return Boom.badImplementation();
        }
    },

}
