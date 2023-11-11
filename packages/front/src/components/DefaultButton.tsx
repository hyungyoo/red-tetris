interface DefaultButtonProps {
  label: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}
function DefaultButton(props: DefaultButtonProps) {
  const { label, type, onClick } = props
  return (
    <button type={type} onClick={onClick} className='py-1 px-2 rounded bg-neutral-700 text-white'>
      {label}
    </button>
  )
}

export default DefaultButton
