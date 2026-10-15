import "./styles/balance.css"
import Chart from './Chart'
import TitleText from '../TitleText'
import SubTitleText from '../SubTitleText'
const Balance = () => {
  return (
        <div className='balanceContainer'>
            <p className='text1'>A LITTLE CLARITY. EVERY DAY.</p>
            <TitleText text="Know your spending. Find your balance." />
            <SubTitleText text="Keep your expenses in view and your budget on track. Small habits, a clearer picture of your money." />
          <Chart/>

          
        </div>
  )
}

export default Balance
