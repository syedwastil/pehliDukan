import React from 'react'
import Menu from './menu'

function Layout({title="Title",description="Description will be added soon...",children,className}) {
  return (
<div>
    <Menu/>
    <div className="jumbotron">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
    </div>
    
    <div className={className}>
        {children}
    </div>
  

</div>
  )
}

export default Layout