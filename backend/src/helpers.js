import crypto from 'crypto';

export const generateHash = data =>
    crypto
        .createHash('md5')
        .update(data)
        .digest('hex');

