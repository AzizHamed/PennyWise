import SideBarItem from './SideBarItem'
import { LayoutGrid, LogOut, ReceiptText } from 'lucide-react'
import Logo from '../Logo'
import "./styles/sideBar.css"
import getCurrentUser from '../../hooks/auth/getCurrentUser'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LogoutHook from '../../hooks/auth/LogoutHook'
import Spinner from '../Spinner'
const SideBar = () => {
    const { fetchData,  data } = getCurrentUser();
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [selectedSideBarItem, setSelectedSideBarItem] = useState<number>(1);
    const {fetchData : logout, status : logoutStatus,isLoading:logoutIsLoading} = LogoutHook();
    const navigate = useNavigate();
    useEffect(() => {
        fetchData()
    },[])

    useEffect(()=>{
        if(data){
            setCurrentUser(data);
        }
    },[data])


    useEffect(()=>{
        if(logoutStatus === 204){
            navigate('/');
        }
    },[logoutStatus])
  return (
    <div className="sideBar">
        <div className='logoAnSideBarItemsContainer'>

        <div className="logoSideBar">
          <Logo/>
        </div>
        

        <div className='sideBarItemsContainer'>
        <SideBarItem id={1} isActive={selectedSideBarItem === 1 ? "true" : "false"} title="Dashboard" logo={<LayoutGrid  size={18} color='#69746D'/>} onClick={() => {setSelectedSideBarItem(1)
        navigate('/home');
          
         } }/>
        <SideBarItem id={2} isActive={selectedSideBarItem === 2 ? "true" : "false"} title="Add Expense" logo={<LayoutGrid  size={18} color='#69746D'/>} onClick={() => {setSelectedSideBarItem(2)
        navigate('/addExpense');
        } }/>
        <SideBarItem id={3} isActive={selectedSideBarItem === 3 ? "true" : "false"} title="Expanses" logo={<ReceiptText  size={18} color='#69746D'/>} onClick={() => {setSelectedSideBarItem(3)
        navigate('/expanses');
        } }/>
        <SideBarItem id={4} isActive={selectedSideBarItem === 4 ? "true" : "false"} title="Logout" logo={<LogOut  size={18} color='#69746D'/>} onClick={() => {setSelectedSideBarItem(4)
        logout();
        } }/>


        <Spinner isLoading={logoutIsLoading}/>
        
        </div>

        </div>
        <div className="userInfoContainer">
          <img 
          className='userImage'
          src="https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg" alt=""  height={36} width={36}/>
          <div>
            <p className='nameText'>{currentUser?.name || "undefined"}</p>
            <p className='accountText'>Personal Account</p>
          </div>
        </div>
      </div>
  )
}

export default SideBar
