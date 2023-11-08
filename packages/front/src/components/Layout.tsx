import { useEffect, useState } from 'react'

//TODO: to implement later dark/light toggle
function Navbar() {
  const [darkToggle, setDarkToggle] = useState(false)

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkToggle])
  function toggleDarkMode() {
    localStorage.theme = darkToggle ? 'light' : 'dark'
    setDarkToggle(!darkToggle)
  }
  return (
    <nav className='w-full flex justify-between z-10 absolute top-0 left-0 p-4'>
      <div>RED Tetris</div>
      <div className={`w-10 h-full border rounded-full`} onClick={toggleDarkMode}>
        <div
          className={`w-4 h-4 bg-neutral-900 dark:bg-white rounded-full m-0.5 ${darkToggle ? 'translate-x-4' : ''}`}
        ></div>
      </div>
    </nav>
  )
}
function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className='w-full h-screen relative dark:bg-neutral-900 dark:text-white'>
      <Navbar />
      <div className='w-full h-screen absolute top-0 left-0 p-20'>{children}</div>
    </div>
  )
}
export default Layout
