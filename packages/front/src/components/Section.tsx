interface SectionProps {
  title: string
  children: React.ReactNode
  center?: boolean
}

function Section(props: SectionProps) {
  return (
    <div className={`section relative border p-4 m-2 rounded-md h-fit`}>
      <h2 className='capitalize absolute -top-3 left-2 bg-white dark:bg-neutral-900 font-semibold px-2'>
        {props.title}
      </h2>
      <div className={`${props.center ? 'flex justify-center items-center' : ''} h-full`}>{props.children}</div>
    </div>
  )
}

export default Section
