type Props = {
  children: React.ReactNode
}

function NavbarContainer(props: Props) {
  const { children } = props
  return (
    <header className='sticky top-0 z-20 border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm animate-in fade-in-50 slide-in-from-top-2'>
      <div className='mx-auto max-w-7xl px-4'>{children}</div>
    </header>
  )
}

export default NavbarContainer
