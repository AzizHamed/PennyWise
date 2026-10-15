import { useEffect, useState, type MouseEvent } from "react"
import PennyWiseBalance from "./PennyWiseBalance"
import TitleText from "../TitleText";
import SubTitleText from "../SubTitleText";
import "./styles/signup.css"
import AppTextField from "../AppTextField";
import AppButton from "../AppButton";
import FinanceText from "./FinanceText";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import SignupHook from "../../hooks/auth/SignupHook";
const SignupPage = () => {
  const [signupData,setSignupData] = useState<{name: string; email: string; password: string,confirmPassword: string, budget : number}>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    budget: 0
  })

  const navigate = useNavigate();

  const { signup: signupFn, isLoading, error, status } = SignupHook()
  const handleSignup = async (e?: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    const { confirmPassword, ...dataWithoutConfirmPassword } = signupData;
    console.log(dataWithoutConfirmPassword.budget)
    let alertMsg = "";
    if(dataWithoutConfirmPassword.name.trim() === ""){
      alertMsg += "Name is required\n";
    }
    if(dataWithoutConfirmPassword.email.trim() === ""){
      alertMsg += "Email is required\n";
      
    }
    if(dataWithoutConfirmPassword.password.trim() === ""){
      alertMsg += "Password is required\n";

    }
    if(dataWithoutConfirmPassword.budget <= 0){
      alertMsg += "Budget must be greater than 0\n";
    }

    if(dataWithoutConfirmPassword.password !== signupData.confirmPassword){
      alertMsg += "Passwords do not match\n";
    }

    if(alertMsg !== ""){
      alert(alertMsg);
      return;
    }

    await signupFn({ signupData: dataWithoutConfirmPassword });
  }


  useEffect(() => {
    if (status && status >= 200 && status < 300) {
      navigate("/home");
    }
  }, [status, navigate])


  useEffect(()=>{
    // alert(error?.message)
  },[error])
  return (
    <div className="signupPageContainer">

      <PennyWiseBalance/>

      <div className="signupFormContainer">

        <form className="signupForm" >

        <TitleText text="Create your account" key={"create account"}/>

        <SubTitleText text="A clearer picture of your money starts here." key={"clear pic"}/>

        <AppTextField
         name="name"
         isRequired={false} 
        onChange={(e)=>{setSignupData((prev)=>({...prev, [e.target.name] : e.target.value}))}}
        textInside="Enter your full name"
        textAbove="Name"
        key={"signup name"}
        type="text"
        value={signupData.name}
        />

        <AppTextField
         name="email"
         isRequired={false}
        onChange={(e)=>{setSignupData((prev)=>({...prev, [e.target.name] : e.target.value}))}}
        textInside="You@example.com"
        textAbove="Email address"
        key={"signup email"}
        type="text"
        value={signupData.email}
        />

        <AppTextField
         name="password"
         isRequired={false}
        onChange={(e)=>{setSignupData((prev)=>({...prev, [e.target.name] : e.target.value}))}}
        textInside="Enter your password"
        textAbove="Password"
        key={"signup password"}
        type="password"
        value={signupData.password}
        />

        <AppTextField
         name="confirmPassword"
         isRequired={false}
        onChange={(e)=>{setSignupData((prev)=>({...prev, [e.target.name] : e.target.value}))}}
        textInside="Re-enter your password"
        textAbove="Confirm Password"
        key={"signup confirm password"}
        type="password"
        value={signupData.confirmPassword}
        />

        <AppTextField
         name="budget"
         isRequired={false}
        onChange={(e)=>{setSignupData((prev)=>({...prev, budget : Number(e.target.value)}))}}
        textInside="Enter your budget"
        textAbove="Budget"
        key={"signup budget"}
        type="number"
        value={signupData.budget.toString()}
        />

        <AppButton
          text={isLoading ? "Creating account..." : "Create account"}
          width="100%"
          key={"create accountB"}
          onClick={handleSignup}
        />
        <FinanceText />
        </form>

        {error && <p className="errorText">{error.message}</p>}
        
            <div className='signupNavigationTextContainer'>

          <span className='pennyWiseText'>© 2026 Pennywise</span>
          <p className='pennyWiseText'>Already have an account? <span className='createAccount' onClick={()=>{navigate("/")}}>Login</span></p>

        </div>

        <Spinner isLoading={isLoading} />


      </div>
    </div>
  )
}

export default SignupPage
