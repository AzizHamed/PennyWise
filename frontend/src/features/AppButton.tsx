import type React from "react"
import "./styles/appButton.css"

const AppButton = ({
  text,
  width,
  onClick,
  type = "button",
}: {
  text: string,
  width: string,
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void,
  type?: "button" | "submit" | "reset",
}) => {
  return (
    <button className='appButton' style={{ width }} type={type} onClick={onClick}>
      {text}
    </button>
  )
}

export default AppButton
