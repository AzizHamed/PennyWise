import { useSelector } from "react-redux"
import Card from "../home-page/Card"
import SubTitleText from "../SubTitleText"
import TitleText from "../TitleText"
import "./styles/expansesPage.css"
import { getSpendingSelector } from "../../utility/redux/slices/SpendingSlice"
import AppTextField from "../AppTextField"
import { useEffect, useState } from "react"
import ExpensesTable from "./ExpensesTable"
const ExpansesPage = () => {
  const pageSize = 6;
  const [pageNumber, setPageNumber] = useState(1);
  const thisMonth = new Date().toLocaleString('en-US', {
    month: 'long',
  })
  const selector = useSelector(getSpendingSelector)
  const comparisonText = `${selector.percentageWithPrevMonth.toFixed(2)}% ${selector.totalThisMonth >= selector.prevMonthTotal ? 'more' : 'less'} than last month`
  const [category, setCategory] = useState<string>("Select")
  const [date, setDate] = useState<string>("Select Date")
  const [searchText, setSearchText] = useState<string>("");
  const filteredExpenses = selector.expenses.filter((exp) => {
    if (!exp || !exp.date) return false;
    const matchesCategory = category === "Select" || exp.category === category;
    const matchesSearch = exp.title.toLowerCase().includes(searchText.toLowerCase());

    const expenseMonth = new Date(exp.date).toLocaleString('en-US', { month: 'long' });
    const matchesDate = date === "Select Date" || expenseMonth === date;

    return matchesCategory && matchesDate && matchesSearch;
  });

  const numberOfPages = Math.max(1, Math.ceil(filteredExpenses.length / pageSize));

  let maximumCategoryTotal = Math.max(
    selector.shoppingTotal,
    selector.foodTotal,
    selector.housingTotal,
    selector.transportationTotal,
    selector.otherTotal
  );

  const maximumCategory = selector.shoppingTotal === maximumCategoryTotal ? "Shopping" :
                          selector.foodTotal === maximumCategoryTotal ? "Food" :
                          selector.housingTotal === maximumCategoryTotal ? "Housing" :
                          selector.transportationTotal === maximumCategoryTotal ? "Transportation" :
                          selector.otherTotal === maximumCategoryTotal ? "Other" : "";

  useEffect(() => {
    setPageNumber((current) => Math.min(current, numberOfPages));
  }, [numberOfPages]);

  useEffect(() => {
    setPageNumber(1);
  }, [category, date, searchText]);

  const startIndex = (pageNumber - 1) * pageSize;
  const expensesToShow = filteredExpenses.slice(startIndex, startIndex + pageSize);

  return (
  <div className='expansesPageContainer'>
      <div className="titleAndSubtitleContainer">
        <TitleText text="Expenses"/>
        <SubTitleText text="Review, filter, and manage all of your spending." key={"expanses"}/>
      </div>

      <div className="cardsContainer">
        <Card
          amount={`$${selector.totalThisMonth}`}
          subtitle={comparisonText}
          title={`${thisMonth} spending`}
          key={`${thisMonth}-spending`}
        />
        <Card
          amount={`$${selector.averageExpense.toFixed(0)}`}
          subtitle={`Across ${selector.numberOfExpenses} transactions`}
          title={`Average expense`}
          key={`average-expense`}
        />
        <Card
          amount={`$${maximumCategoryTotal}`}
          subtitle={`${maximumCategory} · ${(maximumCategoryTotal / selector.totalSpending * 100).toFixed(0)}%`}
          title={`Largest category`}
          key={`largest-category`}
        />
      </div>

      <div className="filterArea">
        <div className="filterContainer">
          <AppTextField 
          isRequired={false} 
          value={searchText}
          onChange={(e)=>{setSearchText(e.target.value)}} 
          textAbove="" 
          textInside="Search Expenses"
          key={"filter Area"}
          />

          <select 
                className="select"
                name="category" 
                required 
                value={category}
                style={{height: 'clamp(20px,40px,50px)'}}
                // value={formData.category}
                  
                onChange={(e)=>{setCategory(e.target.value)}}>
                    <option value="Select">Select</option>
                    <option value="Food">Food</option>
                    <option value="Housing">Housing</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Other">Other</option>


                </select>

                <select 
                style={{height: 'clamp(20px,40px,50px)' }}
                className="select"
                name="date"
                value={date}
                onChange={(e)=>{setDate(e.target.value)}}
                >
                    <option value="Select Date">Select Date</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                </select>


                
                <div onClick={()=>{
                  setCategory("Select");
                  setDate("Select Date");
                  setSearchText("");
                }} 
                style={{color : 'var(--primary-color)', fontWeight : '500', cursor: 'pointer', marginLeft : '10px'}}
                >Reset</div>
        </div>


        <div className="description1Container">
          <p className="desStyle">{selector.numberOfExpenses} · ${selector.totalSpending} total</p>
          <p className="desStyle">Newest first · </p>

        </div>

        

      </div>

      <ExpensesTable
        numberOfPages={numberOfPages}
        totalCount={filteredExpenses.length}
        pageNumber={pageNumber}
        expensesToShow={expensesToShow}
        setPageNumber={setPageNumber}
        key={"expenses"}
      />
    </div>
  )
}

export default ExpansesPage
