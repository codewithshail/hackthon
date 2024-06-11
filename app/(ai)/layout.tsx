import React from 'react'
import AiNavbar from './_components/Navbar'

type Props = { children: React.ReactNode }

const Layout = (props: Props) => {
  return (
    <div className="flex overflow-hidden h-screen">
      <div className="w-full">
        <AiNavbar />
        {props.children}
      </div>
    </div>
  )
}

export default Layout
