import "./styles/chart.css"
import { TrendingDown } from "lucide-react";
import { CircleCheck } from "lucide-react";

const Chart = () => {
  const chartData = [
  { month: "Apr", value: 45 },
  { month: "May", value: 65 },
  { month: "Jun", value: 55 },
  { month: "Jul", value: 80 },
  { month: "Aug", value: 72 },
  { month: "Sep", value: 60 },
];
  return (

    <div className="chartContainer">
      <div className="upperText">
        <p className="monthGlance">Your month, at a glance</p>
        <p className="month">September</p>
      </div>

      <div className="middlePart">
        <p className="monthlySpendingText">Monthly spending</p>
        <div className="amountContainer">
          <p className="amount">3,284.20</p>
          <div className="percentageContainer">
            <TrendingDown size={16} color='var(--primary-color)'/>
            <p className="less">8.4% less</p>
          </div>
        </div>
      </div>

      <div className="chart">
      {chartData.map(({ month, value }) => (
        <div className="chartColumn" key={month}>
          <div className="chartBar">
            <div
              className={`chartFill${month === "Sep" ? "active" : ""}`}
              style={{ height: `${value}%` }}
            />
          </div>

          <span>{month}</span>
        </div>
      ))}
    </div>


      <div className="bottomText">
        <CircleCheck size={12}  color='var(--primary-color)'/>
        <p className="spendingText">A little less spending. A little more breathing room.</p>
      </div>


    </div>
  )
}

export default Chart
