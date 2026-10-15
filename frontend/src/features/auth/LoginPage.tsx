import { useEffect, useState, type FormEvent } from 'react'
import "./styles/loginPage.css"
import AppTextField from '../AppTextField'
import TitleText from '../TitleText'
import SubTitleText from '../SubTitleText'
import AppButton from '../AppButton'
import LoginHook from '../../hooks/auth/LoginHook'
import { useNavigate } from 'react-router-dom'
import Spinner from '../Spinner'
import PennyWiseBalance from './PennyWiseBalance'
import FinanceText from './FinanceText'

const LoginPage = () => {
  const [loginData, setLoginData] = useState<{ email: string; password: string }>({ email: '', password: '' })
  const { fetchData, isLoading, data, error, status } = LoginHook(loginData)
  const navigate = useNavigate();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void fetchData().catch((e) => e)
    
    
  }

  useEffect(()=>{
    if(status === 201){
      console.log('Login successful', data);
      navigate("/home");
    }
  },[data])

  return (
    
    <div className="loginContainer">

      <PennyWiseBalance/>
      <div className='loginPartContainer'>

        <div className='loginPart'>

        <div className='titleContainer'>

        <TitleText text='Welcome Back'/>
        <SubTitleText text='Sign in to pick up where you left off.'/>
        </div>
        
        <form className='form' onSubmit={handleSubmit}>

        <AppTextField textAbove='Email address' textInside='you@example.com' isRequired={false} onChange={(e)=>{
          setLoginData((prev)=>({...prev, email : e.target.value}))
        }} />
        <AppTextField type='password' textAbove='Password' textInside='Enter your password' isRequired={false} onChange={(e)=>{
          setLoginData((prev)=>({...prev, password : e.target.value}))
        }}/>
          <AppButton
            text={isLoading ? 'Signing in...' : 'Sign In'}
            width='100%'
            type='submit'
          />
          {/* {error && <p role='alert'>{error instanceof Error ? error.message : 'Unable to sign in.'}</p>} */}

        </form>

        <FinanceText/>
        
        </div>

        <Spinner isLoading={isLoading} />

        {error && <p role='alert'>{error?.message || 'Login failed.'}</p>}
        <div className='signupNavigationTextContainer'>

          <span className='pennyWiseText'>© 2026 Pennywise</span>
          <p className='pennyWiseText'>New to Pennywise? <span className='createAccount' onClick={()=>{navigate("/signup")}}>Create Account</span></p>

        </div>



      </div>

      </div>
    )
  
}

export default LoginPage