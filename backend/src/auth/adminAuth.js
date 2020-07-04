export default function (server) {
    server.auth.strategy('admin', 'bearer-access-token', {
        validate: (req, token, h) => {
            console.log('in validate', token);
            const isValid = process.env.ADMIN_TOKEN === token;

            return {
                isValid,
                credentials: {},
                artifacts: {},
            };
        },
    });
}
