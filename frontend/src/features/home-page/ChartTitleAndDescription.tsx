
const ChartTitleAndDescription = ({title, description} : {title: string, description: string}) => {
  return (
    <div className="linechartTitleAndDescriptionContainer">
        <p style={{fontSize : 18, color : 'var(--black-color)'}}>{title}</p>
        <p style={{fontSize : 12, color : "#69746D"}}>{description}</p>
      </div>
  )
}

export default ChartTitleAndDescription
