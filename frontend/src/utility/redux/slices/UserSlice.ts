import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { User } from "lucide-react";
interface User {
    id: string;
    name: string;
    email: string;
    budget : number
    // password: string;
}

interface UserState{
    user: User;
}
const initialState: UserState = {
    user : {
        id: "",
        name: "",
        email: "",
        budget: 0
    }
} 

const UserSlice = createSlice({
    initialState : initialState,
    name: "user",
    reducers : {
        setUserReducer(state, action : PayloadAction<User>) {
            state.user = action.payload;
        }


    },

    selectors :{
        getCurrentUserSelector: (state: UserState) => state.user
    }


})

export const { setUserReducer } = UserSlice.actions;
export const {getCurrentUserSelector} = UserSlice.selectors;
export default UserSlice;