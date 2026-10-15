import { configureStore } from "@reduxjs/toolkit";
import spendingReducer from "./slices/SpendingSlice"
import userReducer from "./slices/UserSlice"

export const store = configureStore({
    reducer : {
        spending: spendingReducer.reducer,
        user: userReducer.reducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;