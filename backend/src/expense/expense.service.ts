import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './Expense.js';
import { Model } from 'mongoose';
import { CreateExpenseDto } from './dtos/create-expanse.dto.js';
import { PinoLogger } from 'nestjs-pino';
import { th } from 'zod/locales';
import { UpdateExpenseDto } from './dtos/update-expense.dto.js';

@Injectable()
export class ExpenseService {
    constructor(
        @InjectModel(Expense.name) private readonly expenseModel : Model<Expense>,
        private readonly logger : PinoLogger
    ){
        this.logger.setContext(ExpenseService.name);
    }




    async addExpense(expenseDto: CreateExpenseDto, userId: string): Promise<Expense> {
        this.logger.info('Adding a new expense');
        this.logger.info('Create Expense object from dto')
        this.logger.debug(`ExpenseDto data: ${JSON.stringify(expenseDto)}`);
        const newExpense = await this.expenseModel.create({ ...expenseDto, user: userId });
        this.logger.trace('New Expense object created');
        const expense = await newExpense.save();
        this.logger.info('Expense saved successfully');
        return expense;
    }

    async getAllExpenses(userId: string) : Promise<Expense[]> {
        this.logger.info('Fetching all Expenses from DB');
        const expenses = await this.expenseModel.find({ user: userId }).exec();
        this.logger.info(`Fetched ${expenses.length} expenses from DB`);
        return expenses;
    }

    async updateExpense(updateExpenseDto: UpdateExpenseDto, userId :  string): Promise<Expense> {
        this.logger.info('Updating an expense');
        const exp = await this.expenseModel.findById(updateExpenseDto.id).exec();
        if(!exp){
            this.logger.error(`Expense with id ${updateExpenseDto.id} not found`);
            throw new NotFoundException(`Expense with id ${updateExpenseDto.id} not found`);
        }
        if(exp.user.toString() !== userId){
            this.logger.error(`User ${userId} is not authorized to update this expense`);
            throw new ConflictException(`User ${userId} is not authorized to update this expense`);
        }
        const { id, ...expenseUpdates } = updateExpenseDto;
        Object.assign(exp, expenseUpdates);
        const updatedExpense = await exp.save();
        this.logger.info('Expense updated successfully');
        return updatedExpense;
    }

    async deleteExpense(expenseId: string, userId: string): Promise<Expense | null> {
        this.logger.info(`Deleting expense with id ${expenseId}`);
        const exp = await this.expenseModel.findById(expenseId).exec();
        if(!exp){
            this.logger.error(`Expense with id ${expenseId} not found`);
            throw new NotFoundException(`Expense with id ${expenseId} not found`);
        }
        if(exp.user.toString() !== userId){
            this.logger.error(`User ${userId} is not authorized to delete this expense`);
            throw new ConflictException(`User ${userId} is not authorized to delete this expense`);
        }
        const deletedExpense = await this.expenseModel.findByIdAndDelete(expenseId).exec();
        this.logger.info(`Expense with id ${expenseId} deleted successfully`);
        return deletedExpense;
    }
}
