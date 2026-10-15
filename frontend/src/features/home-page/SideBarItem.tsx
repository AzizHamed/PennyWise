import React from 'react'
import "./styles/sideBarItem.css"
const SideBarItem = ({ id, isActive, title, logo, onClick }: { id: number; isActive: string; title: string; logo: React.ReactNode; onClick?: () => void }) => {
  return (
    <div key={id} className={`sideBarItemContainer ${isActive === "true" ? "active" : ""}`} onClick={onClick}>
      {logo}
      <p>{title}</p>
    </div>
  )
}

export default SideBarItem
