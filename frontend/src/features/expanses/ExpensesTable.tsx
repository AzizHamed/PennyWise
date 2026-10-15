import { useDispatch, useSelector } from "react-redux"
import "./styles/expansesTable.css"
import { getSpendingSelector, setExpensesReducer } from "../../utility/redux/slices/SpendingSlice"
import { Check, Pencil, Trash2, X } from "lucide-react";
import type { Expense } from "../../entities/Expense";
import { useEffect, useState } from "react";
import UpdateExpenseHook from "../../hooks/expense/UpdateExpenseHook";
import DeleteExpenseHook from "../../hooks/expense/DeleteExpenseHook";
import getAllExpansesHook from "../../hooks/expense/GetAllExpansesHook";
import Spinner from "../Spinner";


const ExpensesTable = ({expensesToShow, setPageNumber, pageNumber, numberOfPages, totalCount } : {expensesToShow: Expense[], setPageNumber: (pageNumber: number) => void, pageNumber: number, numberOfPages: number, totalCount: number}) => {
    const selector = useSelector(getSpendingSelector);
    const visibleStart = totalCount === 0 ? 0 : (pageNumber - 1) * 6 + 1;
    const visibleEnd = Math.min(pageNumber * 6, totalCount);
    const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
    const [editData,setEditData] =useState<Expense | null>(null)
    const dispatch = useDispatch();

    const startEditing = (expense : Expense)=>{
        setEditingExpense(expense);
        setEditData({...expense});
    }

    const cancelEditing = () => {
        setEditingExpense(null);
        setEditData(null);
    }

    const [resultText, setResultText] = useState<string | null>(null);

    const getExpenseId = (expense: Expense) => expense.id ?? (expense as Expense & { _id?: string })._id;

    const updateField = <K extends keyof Expense>(field : K, value : Expense[K]) => {
        setEditData((prev)=> prev ? {...prev , [field] : value} : prev);
    }

    
    const {fetchData: fetchUpdateExpense, isLoading: isUpdating, error: updateError, status: updateStatus} = UpdateExpenseHook();
    const {fetchData: fetchDeleteExpense, isLoading: isDeleting, error: deleteError, status: deleteStatus} = DeleteExpenseHook();
    const {fetchData: fetchLatestExpenses} = getAllExpansesHook();

    const saveEditing = async () => {
        const expenseId = editingExpense ? getExpenseId(editingExpense) : undefined;
        if (!expenseId || !editData) {
            setResultText("Invalid expense data.");
            return;
        }

        await fetchUpdateExpense({
            expenseId,
            expense: {
                title: editData.title,
                category: editData.category,
                amount: editData.amount,
                date: editData.date,
            },

            
        });

        const latestExpenses = await fetchLatestExpenses();
        dispatch(setExpensesReducer(latestExpenses));
        cancelEditing();
    }

    const deleteExpense = async (expenseId?: string) => {   
        if (!expenseId) {
            setResultText("Invalid expense id.");
            return;
        }

        await fetchDeleteExpense({ expenseId });
        const latestExpenses = await fetchLatestExpenses();
        dispatch(setExpensesReducer(latestExpenses));
    }

    useEffect(()=>{
        if (updateStatus == null) {
            return;
        }

        setResultText(updateStatus === 200 || updateStatus === 201 ?  "Expense updated successfully" : `${updateError?.message ?? ""}` );
        setTimeout(()=>{
            setResultText("");
        },3000)

    },[updateStatus, updateError])

    useEffect(()=>{
        if (deleteStatus == null) {
            return;
        }

        setResultText(deleteStatus === 200 ?  "Expense deleted successfully" : `${deleteError?.message ?? ""}` );
        setTimeout(()=>{
            setResultText("");
        },3000)
    },[deleteStatus, deleteError])
    return (
    <div className="expansesContainer">

          <div className="headerContainer">
            <p style={{fontSize : '18px' , color : 'var(--black-color)'}}>All Expenses</p>

            <p style={{color : '#69746D', fontSize : '12px', display : 'flex', alignItems: 'center', gap: '4px'}}>
               <span style={{fontSize : '30px' , color : 'var(--primary-color)'}}>·</span> Showing populated results</p>
          </div>


          <div className="expensesTableContainer">

            <table className="expensesTable">

                <thead>
                    <tr>
                        <th>Expense</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th >Amount</th>
                        <th >Actions</th>
                    </tr>
                </thead>


                <tbody>
                    {expensesToShow.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((expense, index)=>(
                        <tr key={`${expense.id ?? "expense"}-${index}`}>

                            <td> 
                                {editingExpense === expense ?
                                <input className="editInputs" type="text" value={editData?.title ?? expense.title} onChange={(e) => {updateField('title', e.target.value)}}/> 
                                : expense.title
                                }
                            </td>

                            <td > 
                                {editingExpense === expense ? 
                                <select className="editInputs" value={editData?.category ?? expense.category} onChange={(e) => {updateField('category', e.target.value)}}>
                                    <option value="Food">Food</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Utilities">Utilities</option>
                                    <option value="Other">Other</option>
                                </select>
                                : (
                                <div style={{backgroundColor : '#F3F6F7',
                                     borderRadius : '20px',
                                      padding : '6px 10px',
                                      display : 'flex',
                                      alignItems : 'center',
                                      justifyContent : 'center',
                                      color : "#69746D"
                                      }}>

                                {expense.category}
                                </div>
                                )}
                            </td>

                            <td style={{color : '#69746D' , fontSize : '12px'}}>
                                {editingExpense === expense ? (
                                    <input className="editInputs" type="date" value={new Date(editData?.date ?? expense.date).toISOString().split('T')[0]} onChange={(e) => {updateField('date', new Date(e.target.value))}}/>
                                ) : (
                                    new Date(expense.date).toLocaleDateString(
                                        "en-US",
                                        {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                        }
                                    )
                                )}
                            </td>
                            <td>
                                {editingExpense === expense ? (
                                    <input style={{width : '70%'}} className="editInputs" key={"edit amount"} type="number" value={editData?.amount.toString() ?? expense.amount.toString()} onChange={(e) => {updateField('amount', Number(e.target.value))}}/>
                                ) : (
                                    `$${expense.amount.toString()}`
                                )}
                            </td>

                            <td className="tdActions">

                                {
                                    editingExpense === expense ? ( 
                                    <div className="tableIconContainer" style={{backgroundColor : '#FBEDEA'}} onClick={()=>saveEditing()}>
                                    <Check size={16} color="#69746D" />
                                    </div>  
                                    ) : (  
                                    <div className="tableIconContainer" style={{backgroundColor : '#FBEDEA'}} onClick={()=>startEditing(expense)}>
                                        <Pencil size={16} color="#69746D" />
                                    </div>  
) 
                                }

                                {editingExpense === expense ? (
                                    <div className="tableIconContainer" style={{backgroundColor : '#E6EBE8'}} onClick={()=>cancelEditing()}>
                                    <X size={16} color="#69746D" />
                                    </div>  
                                ) : (<div className="tableIconContainer" style={{backgroundColor : '#E6EBE8'}} onClick={()=>deleteExpense(getExpenseId(expense))}>
                                    <Trash2 size={16} color="#E36B60" />
                                    </div>) 
                            
                            }
                                    
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>


            {(isUpdating || isDeleting) && 
            <Spinner isLoading={isUpdating || isDeleting}/> 
            }

            {
                resultText && (
                    <div style={{textAlign: 'center', padding: '20px', color: '#69746D'}}>
                        {resultText}
                    </div>
                )
            }

            {selector.expenses.length ===0 && (
              <div style={{textAlign: 'center', padding: '20px', color: '#69746D'}}>
                No expenses found.
              </div>
            )}

          </div>

          <div className="pagingContainer">
            <p className="pagingText">
                Showing {totalCount === 0 ? 0 : visibleStart}-{visibleEnd} of {totalCount}
            </p>
            <div className="pagingButtonsContainer">
                <button className="pageButton" style={{color : pageNumber === 1 ? '#98A19B' : 'var(--black-color)'}} onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}> Previous</button>
                 {Array.from({ length: numberOfPages }, (_, index) => (
                <div key={index} className="pageNumber" style={{
                    color : pageNumber === index + 1 ? 'white' : '#69746D',
                    backgroundColor : pageNumber === index + 1 ? 'var(--primary-color)' : 'transparent'
                    }} onClick={() => setPageNumber(index + 1)}>
                    {index + 1}
                </div>
                ))}
                <button className="pageButton" style={{color : pageNumber === numberOfPages ? '#98A19B' : 'var(--black-color)'}} onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber === numberOfPages}> Next</button>
            </div>

          </div>
        </div>


  )
}

export default ExpensesTable
