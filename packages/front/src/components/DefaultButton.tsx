interface DefaultButtonProps {
  label: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}
function DefaultButton(props: DefaultButtonProps) {
  const { label, type, onClick } = props
  return (
    <button type={type} onClick={onClick} className='border font-semibold'>
      {label}
    </button>
  )
}

export default DefaultButton
