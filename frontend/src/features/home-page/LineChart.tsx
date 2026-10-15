import type { Expense } from "../../entities/Expense"
import ChartLine from "./ChartLine"
import ChartTitleAndDescription from "./ChartTitleAndDescription"
import "./styles/lineChart.css"
const LineChart = ({budget, expanses} : {budget: number, expanses : Expense[]}) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const now = new Date()
  // Last 6 months, oldest first
  const months = Array.from({length: 6}, (_, i) => new Date(now.getFullYear(), now.getMonth() - (5 - i), 1))
  const expansesByMonth = months.map((m) =>
    expanses.reduce((total, expense) => {
      const d = new Date(expense.date)
      return d.getFullYear() === m.getFullYear() && d.getMonth() === m.getMonth()
        ? total + (Number(expense.amount) || 0)
        : total
    }, 0)
  )
  const toPercent = (value: number) => budget > 0 ? Math.min(100, value / budget * 100) : 0
  const formatMoney = (value: number) => value >= 1000 ? `$${+(value / 1000).toFixed(1)}k` : `$${Math.round(value)}`
  return (



    <div className="lineChartContainer">
      
    <ChartTitleAndDescription title="Monthly spending" description="Last 6 months"/>
      <div className="chartContainer8">

        <div className="chartNumbersContainer">
          <p className="chartNumber">{formatMoney(budget)}</p>
          <p className="chartNumber">{formatMoney(budget / 2)}</p>
          <p className="chartNumber">$0</p>
        </div>

        {months.map((m, i) => (
          <ChartLine key={`${m.getFullYear()}-${m.getMonth()}`} greenPercent={toPercent(expansesByMonth[i])} isLastMonth={i === 5} monthName={monthNames[m.getMonth()]} />
        ))}
      </div>

      
    </div>
  )
}

export default LineChart
