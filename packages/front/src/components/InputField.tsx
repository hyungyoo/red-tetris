import { ChangeEvent } from 'react'

interface InputFieldProps {
  label: string
  type: string
  name: string
  value: string
  setValue: (value: string) => void
}
function InputField(props: InputFieldProps) {
  const { label, type, name, value, setValue } = props

  // TODO: replace logic with redux
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }
  return (
    <div className='flex gap-1 justify-between'>
      <label className='capitalize'>{label}</label>
      <input className='border' type={type} name={name} value={value} onChange={onChange} />
    </div>
  )
}
export default InputField
