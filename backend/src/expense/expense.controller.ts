import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put } from '@nestjs/common';
import { ExpenseService } from './expense.service.js';
import { PinoLogger } from 'nestjs-pino';
import { CurrentUser } from '@nestjs/authentication';
import { CreateExpenseDto } from './dtos/create-expanse.dto.js';
import { ValidateMongoIdPipe } from '../common/pipes/ValidateMongoId.pipe.js';
import { UpdateExpenseDto } from './dtos/update-expense.dto.js';

@Controller('expense')
export class ExpenseController {
    constructor(
        private readonly expenseService : ExpenseService,
        private readonly logger : PinoLogger
    ){
        this.logger.setContext(ExpenseController.name);
    }


    @Post()
    async addExpense(
        @Body() createExpenseDto: CreateExpenseDto,
        @CurrentUser('id') userId: string,
    ){
        this.logger.info('Received request to add a new expense');
        this.logger.debug({ createExpenseDto }, 'Creating a new expense with the following data');
        const createdExpense = await this.expenseService.addExpense(createExpenseDto, userId);
        this.logger.info({ createdExpense }, 'Successfully created a new expense');
        return createdExpense;
    }

    @Get('')
    async getAllExpenses(
        @CurrentUser('id') authenticatedUserId: string,
    ){
        this.logger.info('Received request to get all expenses');
        const expenses = await this.expenseService.getAllExpenses(authenticatedUserId);
        this.logger.info({ expenses }, 'Successfully retrieved all expenses');
        return expenses;
    }


    @Put()
    async updateExpense(@Body() updateExpenseDto : UpdateExpenseDto,
        @CurrentUser('id') authenticatedUserId: string,
    ){
        this.logger.info('Received request to update an expense');
        this.logger.debug({ updateExpenseDto }, 'Updating expense with the following data');
        const updatedExpense = await this.expenseService.updateExpense(updateExpenseDto,authenticatedUserId);
        this.logger.info({ updatedExpense }, 'Successfully updated the expense');
        return updatedExpense;
    }

    @Delete(':id')
    async deleteExpense(@CurrentUser('id') authenticatedUserId: string, @Param('id', ValidateMongoIdPipe) expenseId: string){
        this.logger.info(`Received request to delete expense with id ${expenseId}`);
        const deletedExpense = await this.expenseService.deleteExpense(expenseId, authenticatedUserId);
        this.logger.info({ deletedExpense }, `Successfully deleted expense with id ${expenseId}`);
        return deletedExpense;
    }
    
}
