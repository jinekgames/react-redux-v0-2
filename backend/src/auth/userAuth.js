import database from '../database/connection.js';

export default function (server) {
    server.auth.strategy('user', 'bearer-access-token', {
        validate: async (req, token, h) => {
            console.log('in validate', token);
            const user = await database.user.findOne({ token });
            if (user) {
                return {
                    isValid: true,
                    credentials: user,
                    artifacts: {},
                };
            }

            return {
                isValid: false,
                credentials: user,
                artifacts: {},
            };
        },
    });
}
