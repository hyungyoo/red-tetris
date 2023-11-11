import React from 'react'
import Navbar from './Navbar'
function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className='w-full h-screen bg-gray-100 text-neutral-600 dark:bg-neutral-900 dark:text-white text-xs'>
      <Navbar />
      <div className='w-full h-[calc(100%_-_40px)] flex items-center justify-center'>{children}</div>
    </div>
  )
}
export default Layout
