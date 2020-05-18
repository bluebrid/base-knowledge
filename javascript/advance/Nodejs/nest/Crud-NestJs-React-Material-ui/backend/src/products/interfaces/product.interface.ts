import { Document } from 'mongoose';

export interface Product extends Document {
    readonly codigo: number;
    readonly name: string; 
    readonly description: string; 
    readonly price: number
}