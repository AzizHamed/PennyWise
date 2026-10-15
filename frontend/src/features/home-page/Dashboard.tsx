import { useEffect, useState } from 'react';
import type { User } from '../../entities/User';
import SubTitleText from '../SubTitleText'
import TitleText from '../TitleText'
import Card from './Card';
import DonatChart from './DonatChart';
import "./styles/dashboard.css"
import {
  WalletCards,
  CalendarDays,
  Target,
  
} from "lucide-react";
import LineChart from './LineChart';
import getCurrentUser from '../../hooks/auth/getCurrentUser';
import { useDispatch, useSelector } from 'react-redux';
import { getSpendingSelector, setMonthlyBudgetReducer } from '../../utility/redux/slices/SpendingSlice';
import { setUserReducer } from '../../utility/redux/slices/UserSlice';
const Dashboard = () => {
  const { fetchData : fetchCurrentUserData,  data : currentUserData } = getCurrentUser();
  const dispatch = useDispatch();
  const spending = useSelector(getSpendingSelector);
    const [currentUser, setCurrentUser] = useState<User>({
      name: "",
      budget: 0,
      id : "0",
      email: "",
    });
    useEffect(() => {
        fetchCurrentUserData()
    },[])
    
    useEffect(()=>{
        if(currentUserData){
            setCurrentUser(currentUserData);
            dispatch(setUserReducer(currentUserData));
            dispatch(setMonthlyBudgetReducer(Number(currentUserData.budget) || 0));
        }
    },[currentUserData, dispatch])

  const { expenses, totalThisMonth, totalSpending, percentageWithPrevMonth, monthlyBudgetLeft, prevMonthTotal } = spending;

  
  return (
    <div className="dashboardContainer">

        {expenses.length > 0 ?
        <>
        
        <div className="titlesContainer">
          <TitleText text={`Good morning, ${currentUser?.name || "undefined"}`}/>
          <SubTitleText text="Here’s how your spending is looking this month."/>
        </div>
  
  
        <div className='cardsGrid'>
          <Card title='Total spending' amount={`$${totalSpending}`} subtitle='Across all recorded expenses' icon={<WalletCards size={21} color='var(--primary-color)' />}/>
          <Card title={`${new Date().toLocaleString('en-US',{
            month: 'long'
          })} spending`} amount={`$${totalThisMonth}`} subtitle= {`${percentageWithPrevMonth.toFixed(2)}% ${totalThisMonth >= prevMonthTotal ? 'more' : 'less'} than last month`} icon={<CalendarDays size={21} color='var(--primary-color)' />}/>
          <Card title='Monthly budget left' amount={`$${monthlyBudgetLeft}`} subtitle='Amount saved this month' icon={<Target size={21} color='var(--primary-color)' />}/>
        </div>
  

  {
    expenses &&
        <div className='analyticsContainer'>

          
        <LineChart budget={currentUser?.budget} expanses={expenses}/>
        <DonatChart budget={currentUser?.budget} expanses={expenses}/>
        </div>
  }
        </> 
        : <div style={{height : "100%", width : "100%" , display : "flex", alignItems : "center", justifyContent : "center"}}>No expenses recorded.</div>
        }        
      </div>
      )
}

export default Dashboard
