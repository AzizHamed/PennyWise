import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Expense {
    @Prop({ required: true })
    title: string;
    
    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    date: Date;

    @Prop({ required: true })
    category: string;

    @Prop({ 
        type : Types.ObjectId,
        ref: 'User',
        required: true
     })
    user: Types.ObjectId;

    @Prop()
    description: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);