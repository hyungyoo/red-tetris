interface DefaultButtonProps {
  label: string
  type?: 'button' | 'submit' | 'reset'
  textSize?: 'text-sm' | 'text-md' | 'text-lg'
  onClick?: () => void
}
function DefaultButton(props: DefaultButtonProps) {
  const { label, type, onClick, textSize } = props
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-1 px-2 rounded bg-neutral-700 text-white capitalize ${textSize ?? ''}`}
    >
      {label}
    </button>
  )
}

export default DefaultButton
