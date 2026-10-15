import { useSelector } from "react-redux"
import type { Expense } from "../../entities/Expense"
import CategoryDot from "./CategoryDot"
import ChartTitleAndDescription from "./ChartTitleAndDescription"
import "./styles/donatChart.css"
import { getSpendingSelector } from "../../utility/redux/slices/SpendingSlice"
const DonatChart = ({expanses,budget} : {expanses: Expense[], budget: number}) => {  
  const thisMonth = new Date().toLocaleString('en-US', {month : 'long'})
  const thisYear = new Date().getFullYear()
  const thisMonthNumber = new Date().getMonth() + 1
  let   housingExpenses = 0
  let FoodExpenses           = 0
  let transportaionExpenses   = 0
  let shoppingExpenses = 0
  let otherExpenses = 0

  let housingExpansesPrevMonth = 0;
  let FoodExpensesPrevMonth = 0
  let transportaionExpensesPrevMonth = 0
  let shoppingExpensesPrevMonth = 0
  let otherExpensesPrevMonth = 0
  const prevMonthNumber = thisMonthNumber === 1 ? 12 : thisMonthNumber - 1
  expanses.forEach((expense)=>{
    const expenseMonth = new Date(expense.date).getMonth() + 1
    const amount = Number(expense.amount) || 0
    const isThisMonth = expenseMonth === thisMonthNumber
    const isPrevMonth = expenseMonth === prevMonthNumber

    switch(expense.category){
      case "Housing":
        if(isThisMonth) housingExpenses += amount
        if(isPrevMonth) housingExpansesPrevMonth += amount
        break
      case "Food":
        if(isThisMonth) FoodExpenses += amount
        if(isPrevMonth) FoodExpensesPrevMonth += amount
        break
      case "Transportation":
        if(isThisMonth) transportaionExpenses += amount
        if(isPrevMonth) transportaionExpensesPrevMonth += amount
        break
      case "Shopping":
        if(isThisMonth) shoppingExpenses += amount
        if(isPrevMonth) shoppingExpensesPrevMonth += amount
        break
      case "Other":
        if(isThisMonth) otherExpenses += amount
        if(isPrevMonth) otherExpensesPrevMonth += amount
        break
    }
  })

  const selector = useSelector(getSpendingSelector);

  const spending = expanses.reduce((total, expense) => total + expense.amount, 0)
  const spendingPercentage =
  budget > 0 ? (selector.totalThisMonth / budget) * 100 : 0;

const progress = Math.min(100, Math.max(0, spendingPercentage));
const displayedProgress = Math.round(progress);

const highestCategorySpending = Math.max(selector.housingTotal, selector.foodTotal, selector.transportationTotal, selector.shoppingTotal, selector.otherTotal);
const highestCategorySpendingThisMonth = highestCategorySpending === selector.housingTotal ? "Housing" :
                                         highestCategorySpending === selector.foodTotal ? "Food" :
                                         highestCategorySpending === selector.transportationTotal ? "Transportation" :
                                         highestCategorySpending === selector.shoppingTotal ? "Shopping" :
                                         highestCategorySpending === selector.otherTotal ? "Other" : "";
const lessCategorySpendingThisMonth = Math.min(housingExpenses, FoodExpenses , transportaionExpenses,shoppingExpenses, otherExpenses);
const lessCategorySpendingThisMonthName = lessCategorySpendingThisMonth === housingExpenses ? "Housing" :
                                           lessCategorySpendingThisMonth === FoodExpenses ? "Food" :
                                           lessCategorySpendingThisMonth === transportaionExpenses ? "Transportation" :
                                           lessCategorySpendingThisMonth === shoppingExpenses ? "Shopping" :
                                           lessCategorySpendingThisMonth === otherExpenses ? "Other" : "";


  return (
    <div className="donatChartContainer">

      <div className="titleContainerDonat">
        <ChartTitleAndDescription title={"Spending by category"} description={`${thisMonth} ${thisYear}`}/>
        <p style={{color : 'var(--black-color)', fontSize : 14}}>{`$${spending}`}</p>
      </div>

      <div className="donatAndSpendingCatgsContainer">


      <div className="donatContainer">

        <div className="donatChart" style={{background : `conic-gradient(
          from ${360 - progress * 3.6}deg,
          #F5F7F9 0% ${progress}%,
          var(--primary-color) ${progress}% 100%
          )`
          }} aria-label={`${displayedProgress}%`} >

          <div className="donatCenter">
            <span className="donatPercentage">{displayedProgress}%</span>
            <span className="ofBudgetText">of Budget</span>  
          </div>
        </div>
      </div>


      <div className="categorySpends">
        <CategoryDot color="var(--primary-color)" allSpendings={selector.totalThisMonth} text="Housing" categorySpending={housingExpenses} key={"Housing"}/>
        <CategoryDot color="#E9A23B" allSpendings={selector.totalThisMonth} text="Food" categorySpending={FoodExpenses} key={"Food"}/>
        <CategoryDot color="#4D7CBE" allSpendings={selector.totalThisMonth} text="Transportation" categorySpending={transportaionExpenses} key={ "Transportation"}/>
        <CategoryDot color="#D86A5A" allSpendings={selector.totalThisMonth} text="Shopping" categorySpending={shoppingExpenses} key={ "Shopping"}/>
        <CategoryDot color="#8573C7" allSpendings={selector.totalThisMonth} text="Other" categorySpending={otherExpenses} key={ "Other"}/>
      </div>
  
    </div>

    <p style={{fontSize : 12, color : "#69746D"}}>{highestCategorySpendingThisMonth} is your largest category. {lessCategorySpendingThisMonthName} is lowest category spending this month</p>    
    </div>
  )
}

export default DonatChart
