import { createFileRoute, Link ,useNavigate} from '@tanstack/react-router'
import { useState } from 'react';
import { loginUser } from '../../../api/auth';
import { useAuth } from '../../../context/AuthContext';
import { useMutation } from '@tanstack/react-query';

export const Route = createFileRoute('/(auth)/login/')({
  component: LoginPage,
})

function LoginPage() {
    const navgate=useNavigate();
    const {setAccessToken,setUser}=useAuth();
   const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError]=useState("");
    const {mutateAsync,isPending}=useMutation({
      mutationFn:loginUser,
      onSuccess:(data)=>{
        setAccessToken(data.accessToken);
        setUser(data.user);
        navgate({to:'/ideas'})
      },
      onError:(err:any)=>{
        setError(err.message)
      }
    })

    const handleSubmit=async (e:React.FormEvent)=>{
      e.preventDefault();
      setError('');
      await mutateAsync({email,password});
    }
  return <div className='max-w-md mx-auto '>
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      {
        error &&(
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )
      }
    <form  onSubmit={handleSubmit} className='space-y-4'>
     
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition disabled:opacity-50"
          disabled={isPending}>
          {isPending ? 'Logging In...' : 'Login'}
          </button>
          
    </form>
        <p className="text-sm text-center mt-4">
          Don`t  have an account?{' '}
          <Link to='/register' className='text-blue-600 hover:underline font-medium'>
          Register
          </Link>
        </p>
    </div>
}
