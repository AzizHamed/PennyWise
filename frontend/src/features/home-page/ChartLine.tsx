import "./styles/chartLine.css"
const ChartLine = ({greenPercent,isLastMonth, monthName} : {greenPercent: number, isLastMonth: boolean, monthName: string}) => {
  return (
    <div className="chartLineContainerContainer">

    <div style={{backgroundColor : '#F5F7F9' }} className='chartLineContainer'>
        <div className="greenPart" style={{height : `${greenPercent}%`, backgroundColor :  isLastMonth ? 'var(--primary-color)' : '#E8F3ED'}}>
        </div>
    </div>

    <span key={monthName} style={{fontSize : 11,color : "#69746D"}}>{monthName}</span>

    </div>    
  )
}

export default ChartLine
