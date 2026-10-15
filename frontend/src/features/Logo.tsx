import "./styles/logo.css"
import { WalletCards } from "lucide-react";

const Logo = () => {
  return (

    <div className='appLogo'>
    <div className='logoContainer'>   
     <WalletCards size={22} color='white'/>    
    </div>

    <p>Pennywise</p>

    </div>
  )
}

export default Logo
