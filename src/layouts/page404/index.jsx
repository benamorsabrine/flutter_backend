import page404 from './page404.css'
import logo from '../../assets/img/navbar/tu.png'
import React from 'react'

const Page404 = () => {
  return (
    <div className='h-screen block'><body class="bg-purple">
        
    <div class="stars">
        <div class="custom-navbar">
            <div class="brand-logo">
                <img src={logo} width="200px" height="200px" alt=''/>
            </div>
        </div>
        <div id="main">
    	<div class="fof">
        		<h1>Error 404</h1>
    	</div>
    </div>

    </div>

</body></div>
  )
}

export default Page404