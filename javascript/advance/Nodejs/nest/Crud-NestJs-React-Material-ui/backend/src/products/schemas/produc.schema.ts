import * as mongoose from 'mongoose';
export const ProductSchema = new mongoose.Schema(
    {
        codigo: Number,
        name: String, 
        description: String, 
        price: Number
    }
)