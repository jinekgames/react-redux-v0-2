import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const schema = new mongoose.Schema(
    {
        email: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        password: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        token: {
            type: mongoose.Schema.Types.String,
            default: uuidv4,
        },
        userId: {
            type: mongoose.Schema.Types.String
        },
        name: {
            type: mongoose.Schema.Types.String
        }
    },
    {
        timestamps: true
    }
);

export default schema;
