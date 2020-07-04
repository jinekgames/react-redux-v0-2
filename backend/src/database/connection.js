import userSchema from './userSchema.js';
import postsSchema from './postsSchema.js';
import mongoose from 'mongoose';

const host = process.env.MONGO_HOST || 'localhost';
const port = process.env.MONGO_PORT || 27017;
const dbName = 'mySite'

const uri = `mongodb://${host}:${port}/${dbName}`;

mongoose.connect(uri, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', (err) => {
    console.error('произошла ошибка при подключении к Монге', err);
});

db.once('open', () => {
    console.log('успешно подключились к Монге');
});

const user = mongoose.model('user', userSchema);
const post = mongoose.model('post', postsSchema);

export default {
    post,
    // comment,
    user,
}
