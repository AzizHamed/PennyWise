
const AppSelect = ({ formData, onChange, options, name }: { formData: any, onChange: (e: { target: { value: string; name: string } }) => void, options: string[], name: string }) => {
  return (
    <select 
      className="select"
      name={name}
      defaultValue={"Select"}
      required
      value={formData?.[name] ?? "Select"}
      onChange={onChange}
    >
      <option value="Select">Select</option>
      {options.map((option: string) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  )
}

export default AppSelect
