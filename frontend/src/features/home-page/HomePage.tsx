
import SideBar from "./SideBar"
import "./styles/homePage.css"
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import getAllExpansesHook from "../../hooks/expense/GetAllExpansesHook";
import { setExpensesReducer } from "../../utility/redux/slices/SpendingSlice";
import Spinner from "../Spinner";

const HomePage = () => {
  const dispatch = useDispatch();
  const { fetchData, isLoading, data } = getAllExpansesHook();

  useEffect(() => {
    void fetchData();
  }, []);

  useEffect(() => {
    if (Array.isArray(data)) {
      dispatch(setExpensesReducer(data));
    }
  }, [data, dispatch]);

  return (
    <div className='homePageContiner'>

      <SideBar/>

      <Outlet/>

      {isLoading && <Spinner isLoading={isLoading} />}
      
    </div>
  )
}

export default HomePage
