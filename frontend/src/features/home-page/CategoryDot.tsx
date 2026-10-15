import "./styles/categoryDot.css"
const CategoryDot = ({color, text,allSpendings,categorySpending} : {color: string, text: string, categorySpending: number, allSpendings: number}) => {
  return (
    <div className='categoryDotContainer'>
        <div className="categoryContainer">

      <div className='categoryDot' style={{backgroundColor: color}}></div>
      
      <span className='categoryText'>{text}</span>
        </div>

        <div className="amountsContainer1">

      <span className="spendingText">${categorySpending}</span>
      <span className="percentageText">{(categorySpending / allSpendings * 100).toFixed(0)}%</span>

        </div>
    </div>
  )
}

export default CategoryDot
