import { Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller.js';
import { ExpenseService } from './expense.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense, ExpenseSchema } from './Expense.js';

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService],
  imports : [MongooseModule.forFeature([{name : 'Expense', schema: ExpenseSchema}])]
})
export class ExpenseModule {}
