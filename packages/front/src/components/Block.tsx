interface BlockProps {
  title: string
  children: React.ReactNode
}

function Block(props: BlockProps) {
  return (
    <div className='block relative border py-10 px-4 m-3 h-full rounded-md'>
      <h2 className='absolute -top-3 left-2 bg-white text-lg font-bold'>{props.title}</h2>
      {props.children}
    </div>
  )
}

export default Block
