function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className='w-full h-screen relative'>
      <div className='w-full h-screen backdrop-blur-sm flex justify-center absolute top-0 left-0 p-32'>{children}</div>
    </div>
  )
}
export default Layout