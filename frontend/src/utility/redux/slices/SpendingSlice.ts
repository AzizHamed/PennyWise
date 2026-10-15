import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Expense } from "../../../entities/Expense";

export interface Spending {
    monthlyBudget: number;
    totalThisMonth: number;
    totalSpending: number;
    percentageWithPrevMonth: number;
    monthlyBudgetLeft: number;
    prevMonthTotal: number;
    numberOfExpenses: number;
    averageExpense: number;
    expenses: Expense[];
    foodTotal: number;
    housingTotal: number;
    transportationTotal: number;
    otherTotal: number;
    shoppingTotal: number;
}

export interface SpendingState {
    spendings: Spending;
}

const initialState: SpendingState = {
    spendings: {
        monthlyBudget: 0,
        totalThisMonth: 0,
        totalSpending: 0,
        percentageWithPrevMonth: 0,
        monthlyBudgetLeft: 0,
        prevMonthTotal: 0,
        numberOfExpenses: 0,
        averageExpense: 0,
        expenses: [],
        foodTotal: 0,
        housingTotal: 0,
        transportationTotal: 0,
        otherTotal: 0,
        shoppingTotal: 0,
    },
};

const recalculateSpending = (spending: Spending) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const previousMonthDate = new Date(currentYear, currentMonth - 1, 1);
    const previousMonth = previousMonthDate.getMonth();
    const previousMonthYear = previousMonthDate.getFullYear();
    let totalThisMonth = 0;
    let prevMonthTotal = 0;
    let totalSpending = 0;
    let foodTotal = 0;
    let housingTotal = 0;
    let transportationTotal = 0;
    let otherTotal = 0;
    let shoppingTotal = 0;

    for (const expense of spending.expenses) {
        const amount = Number(expense.amount) || 0;
        const date = new Date(expense.date);
        totalSpending += amount;

        if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
            totalThisMonth += amount;
        }
        if (date.getMonth() === previousMonth && date.getFullYear() === previousMonthYear) {
            prevMonthTotal += amount;
        }

        switch (expense.category) {
            case "Food":
                foodTotal += amount;
                break;
            case "Housing":
                housingTotal += amount;
                break;
            case "Transportation":
                transportationTotal += amount;
                break;
            case "Shopping":
                shoppingTotal += amount;
                break;
            case "Other":
                otherTotal += amount;
                break;
        }
    }

    spending.totalThisMonth = totalThisMonth;
    spending.prevMonthTotal = prevMonthTotal;
    spending.totalSpending = totalSpending;
    spending.numberOfExpenses = spending.expenses.length;
    spending.averageExpense = spending.numberOfExpenses === 0 ? 0 : totalSpending / spending.numberOfExpenses;
    spending.percentageWithPrevMonth = prevMonthTotal === 0 ? 100 : (totalThisMonth / prevMonthTotal) * 100;
    spending.monthlyBudgetLeft = spending.monthlyBudget - totalThisMonth;
    spending.foodTotal = foodTotal;
    spending.housingTotal = housingTotal;
    spending.transportationTotal = transportationTotal;
    spending.otherTotal = otherTotal;
    spending.shoppingTotal = shoppingTotal;
};

const spendingSlice = createSlice({
    name: "spending",
    initialState,
    reducers: {
        setExpensesReducer: (state, action: PayloadAction<Expense[]>) => {
            state.spendings.expenses = action.payload;
            recalculateSpending(state.spendings);
        },
        setMonthlyBudgetReducer: (state, action: PayloadAction<number>) => {
            state.spendings.monthlyBudget = action.payload;
            recalculateSpending(state.spendings);
        },
    },
    selectors: {
        getSpendingSelector: (state) => state.spendings,
    },
});

export const {setExpensesReducer, setMonthlyBudgetReducer} = spendingSlice.actions;
export const {getSpendingSelector} = spendingSlice.selectors;
export default spendingSlice;

