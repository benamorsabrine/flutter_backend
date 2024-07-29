import { useState } from "react"
import { useSignup } from "../auth/hooks/useSignup"

const Signup = () => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(firstname,lastname,email, password)
  }

  return (
    
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">

    <form className="signup" onSubmit={handleSubmit}>
      <h3 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">Sign Up</h3>
      <label className='dark:text-white'>First Name:</label>
      <input  className='w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid border-[#ddd]'
        type="text" 
        onChange={(e) => setFirstname(e.target.value)} 
        value={firstname} 
      />
      <label className='dark:text-white'>Last Name:</label>
      <input className='w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid border-[#ddd]'
        type="text" 
        onChange={(e) => setLastname(e.target.value)} 
        value={lastname} 
      />
      
      <label className='dark:text-white'>Email address:</label>
      <input className='w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid border-[#ddd]'
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label className='dark:text-white'>Password:</label>
      <input className='w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid border-[#ddd]'
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      <button disabled={isLoading} className="linear mt-2 w-full rounded-xl bg-rose-950	py-[12px] text-base font-medium  transition duration-200 bg-tunisys-100 hover:bg-red-500 active:bg-red-500 dark:bg-tunisys-100 dark:text-white dark:hover:bg-red-500 dark:active:bg-red-200">Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
    <div className="mt-4">
        <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
         You already have account ?
        </span>
        <a
  href="/auth/sign-in"
  className="ml-1 text-sm font-medium text-brand	text-tunisys-100 hover:text-tunisys-100 dark:text-tunisys-100"
>

          Log in
        </a>
      </div>
    </div>
    </div>

  )
}

export default Signup