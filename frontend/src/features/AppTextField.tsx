import React from 'react'
import "./styles/appTextField.css"
const AppTextField = ({textAbove,textInside,isRequired,onChange,type,value, name} : {name ?: string,textAbove?: string, textInside: string, isRequired: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type?: string, value?: string}) => {
  return (
    <div className='textFieldContainer'>

      {textAbove && 
      
    <div className='textAboveContainer'>
      <p className='textAbove'>{textAbove}</p>
      {isRequired && <span className='requiredDot'>*</span>}
    </div>
      }
      <input name={name} type={type || 'text'} className='textInput' value={value} onChange={onChange} placeholder={textInside} required={isRequired}/>
    </div>
  )
}

export default AppTextField
