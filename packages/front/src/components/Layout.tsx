function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className='w-full h-screen relative dark:bg-neutral-900 dark:text-white'>
      <div className='w-full h-screen absolute top-0 left-0 p-32'>{children}</div>
    </div>
  )
}
export default Layout
