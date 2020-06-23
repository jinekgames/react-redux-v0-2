import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const schema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        date: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        id: {
            type: mongoose.Schema.Types.String,
            default: uuidv4,
        },
        userId: {
            type: mongoose.Schema.Types.String,
            required: true,
        },
        img: {
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
