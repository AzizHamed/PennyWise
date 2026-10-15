import { Expense } from "../../entities/Expense";
import AddExpenseHook from "../../hooks/expense/AddExpenseHook";
import AppButton from "../AppButton";
import AppTextField from "../AppTextField";
import Spinner from "../Spinner";
import "./styles/addExpensePage.css"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getSpendingSelector, setExpensesReducer } from "../../utility/redux/slices/SpendingSlice";
import { getCurrentUserSelector } from "../../utility/redux/slices/UserSlice";
import getAllExpansesHook from "../../hooks/expense/GetAllExpansesHook";
const AddExpensePage = () => {
    const { fetchData, isLoading, data, status } = AddExpenseHook()
    const { fetchData: fetchExpenses } = getAllExpansesHook();
    const dispatch = useDispatch();
    const spendingSelector = useSelector(getSpendingSelector);
    const userSelector = useSelector(getCurrentUserSelector);
    const handleSubmit = async (e ?: React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault();
        const formDateMonth = new Date(formData.date).getMonth();
        const formDateYear = new Date(formData.date).getFullYear();
        const thisMonth = new Date().getMonth()
        const thisYear = new Date().getFullYear();
      
        if(spendingSelector.monthlyBudgetLeft - formData.amount < 0 && formDateMonth === thisMonth && formDateYear === thisYear){
            alert("Adding this expense exceeds your budget.");
            return;
        }


        if(formDateMonth !== thisMonth || formDateYear !== thisYear){
            const formDateMonthSpendings = spendingSelector.expenses.filter(expense => {
                const expenseDate = new Date(expense.date);
                return expenseDate.getMonth() === formDateMonth && expenseDate.getFullYear() === formDateYear;
            }).reduce((total, expense) => total + expense.amount, 0);


            if(formDateMonthSpendings + formData.amount > userSelector.budget){
                alert("Adding this expense exceeds your budget for that month.");
                return;
            }
        }
    
        const today = new Date();
        let errorMsg = ""
        if(!formData.title){
            errorMsg += "Title cannot be empty.\n";
        }

         if(formData.category === "Select"){
            errorMsg += "Please select a category.\n";
        }

        if(!formData.date){
            errorMsg += "Date cannot be empty.\n";
        }
        if(formData.date > today){
            errorMsg += "Date cannot be in the future.\n";
        }

        if(!formData.amount){
            errorMsg += "Amount cannot be empty.\n";
        }
        if(formData.amount <= 0){
            errorMsg += "Amount must be greater than zero.\n";
        }

        if(errorMsg){
            alert(errorMsg);
            return;
        }
        
        
        try {
            await fetchData({ expense: formData as Expense });
            const latestExpenses = await fetchExpenses();
            dispatch(setExpensesReducer(latestExpenses));
        } catch {
            return;
        }
    }


    const [formData, setFormData] = useState<Expense>({
        title : "",
        category : "Select",
        date : new Date(),
        amount : 0
    } as Expense);


  return (
    <div className='addExpensePage'>

        <p style={{fontWeight : 'bold', fontSize :32, color : 'var(--black-color)'}}>Add Expense</p>


        <form className="formAddExpense" >
            <AppTextField isRequired={true}  onChange={(e)=>setFormData({...formData, ["title"]: e.target.value})} 
            textAbove="Description"
            textInside="e.g., Client dinner at Blue Hill, Server hosting, etc."
            key={1}
            />

            <div className="catgAndDateContainer">

                <div className="selectContainer">
                    <div className="textAboveContainer">
                <p className="textAbove">Category </p>
                <span className="requiredDot">*</span>

                    </div>
                <select 
                className="select"
                name="category" 
                defaultValue={"Select"} 
                required 
                value={formData.category}
                  
                onChange={(e)=>{setFormData({...formData, [e.target.name] : e.target.value})}}>
                    <option value="Select">Select</option>
                    <option value="Food">Food</option>
                    <option value="Housing">Housing</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Other">Other</option>


                </select>

                </div>

                <AppTextField isRequired={true}  onChange={(e)=>setFormData({...formData, ["date"]: new Date(e.target.value)})} 
                textAbove="Date"
                textInside="Select Date"
                key={2}
                type="date"
                /> 

            </div>


            <div className="amountTextField">
                <AppTextField 
                isRequired={true}
                textAbove="Amount"
                textInside="0.0" 
                key={"amount"} 
                type="number" 
                onChange={(e)=>setFormData({...formData, ["amount"] : parseFloat(e.target.value)})}/>


            </div>


            <AppButton text="Save Expense" width="100%" key={"save Expense"} 
            onClick={(e) => handleSubmit(e)}/>
        </form>

        { status===201 && 
        <p style={{color : 'var(--primary-color)'}}>Expense added successfully!</p>
        }

        {status!==201 && data && 
        <p style={{color : 'red'}}>Failed to add expense.</p>
        }

        {isLoading && <Spinner isLoading={isLoading}/>}
    </div>
  )
}

export default AddExpensePage
