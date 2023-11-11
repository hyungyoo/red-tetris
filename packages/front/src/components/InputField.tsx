import { ChangeEvent, useCallback } from 'react'

interface InputFieldProps {
  label: string
  type: string
  name: string
  value: string
  setValue: (value: string) => void
}
function InputField(props: InputFieldProps) {
  const { label, type, name, value, setValue } = props

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])
  return (
    <div className='flex gap-1 justify-between'>
      <label className='capitalize'>{label}</label>
      <input className='border dark:text-neutral-900' type={type} name={name} value={value} onChange={onChange} />
    </div>
  )
}
export default InputField
