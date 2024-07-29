import { useState } from 'react';
import { useLogin } from '../auth/hooks/useLogin'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()
  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }
  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
      <form className="login " onSubmit={handleSubmit}>
        <h3 className="mb-2.5 text-6xl font-bold text-navy-700 text-center dark:text-white">Se Connecter</h3>

        <label className='dark:text-white text-xl'>Adresse email </label>
        <input className='w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid border-[#ddd]'
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label className='dark:text-white text-xl'>Mot de passe</label>
        <input className='w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid border-[#ddd]'
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button disabled={isLoading} className="linear mt-2 w-full rounded-xl bg-rose-950	py-[12px] text-xl font-medium  transition text-white duration-200 bg-tunisys-100 hover:bg-red-500 active:bg-red-500 dark:bg-tunisys-100 dark:text-white dark:hover:bg-red-500 dark:active:bg-red-200">Log in</button>
        {error && <div className="error">{error}</div>}
      </form>
    
    </div>
    </div>
  );
}
