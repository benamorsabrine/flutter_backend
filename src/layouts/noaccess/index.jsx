import logo from '../../assets/img/navbar/tu.png'
import React from 'react'
import Icon from 'react-icons-kit'
import {

  MdArrowLeft,
  MdHome,

  
} from "react-icons/md";
import {useLogout} from 'views/auth/hooks/useLogout'
import { useAuthContext } from 'views/auth/hooks/useAuthContext';


const NoAccess = () => {
  const {logout} = useLogout()
  const { user, state } = useAuthContext(); 
  console.log("User:", user); // Add this log
  console.log("User Role:", user?.role);
  const handleClick= () =>{
    
    logout()
    console.log("disconnected")
  }
  return (
    <div className='h-screen block'><body class="bg-purple">
        
    <div class="stars">
        <div class="custom-navbar">
            <div class="brand-logo flex">
            <MdArrowLeft className="h-9 w-9 mt-5 text-tunisys-100 " onClick={handleClick} />
                <img src={logo} width="200px" height="200px" alt='' onClick={handleClick}/>
            </div>
        </div>
        <div id="main">
    	<div class="fof">
        		<h1>No Access</h1> 
    	</div>
    </div>

    </div>

</body></div>
  )
}

export default NoAccess;