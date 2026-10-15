import "./styles/card.css"
const Card = ({title,amount,subtitle,icon} : {title: string, amount: string, subtitle: string, icon?: React.ReactNode}) => {
  return (  

    <div className="cardContainer">
    <div className="amountsContainer">
      <p style={{color : "var(--background-color)", fontSize: "clamp(12px,13px,14px)"}}>{title}</p>
      <p style={{color : "var(--black-color)", fontSize : "clamp(26px,28px,30px)"}}>{amount}</p>
      <p style={{color : "var(--primary-color)", fontSize : "clamp(11px,12px,13px)"}}>{subtitle}</p>
    </div>

{icon && 

    <div className="iconContainer">
      {icon}    
    </div>
}

    </div>
  )
}

export default Card
