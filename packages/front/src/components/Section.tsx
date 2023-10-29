interface SectionProps {
  title: string
  children: React.ReactNode
}

function Section(props: SectionProps) {
  return (
    <div className='section relative border p-4 m-2 rounded-md'>
      <h2 className='capitalize absolute -top-3 left-2 bg-white font-semibold px-2'>{props.title}</h2>
      {props.children}
    </div>
  )
}

export default Section
