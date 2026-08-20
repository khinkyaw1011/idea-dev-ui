import { Link,useNavigate } from '@tanstack/react-router';
import { Lightbulb } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../api/auth';
export default function Header() {
  const navgate=useNavigate();
  const {user,setUser,setAccessToken}= useAuth();
  const handleLogout=async()=>{
    try{
      await logoutUser();
      setAccessToken(null);
      setUser(null);
      navgate({to:'/'})
    }catch(err:any){
      console.log('Logout Failed',err)
    }
  }
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and Home Link */}
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-800">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          <span>IdeaDrop</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex space-x-4 items-center">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Ideas
          </Link>
          {
            user && (
                <Link
            to="/ideas/new"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + New Idea
          </Link>
            )
          }
          
        </nav>
        <div className="flex items-center space-x-2 ">
        {
          !user ? (
              
         <>
          <Link to='/login' className='text-gray-600 hover:text-gray-700 font-medium transition px-3 py-2 leading-none'>
          Login
          </Link>
          <Link to='/register' className='bg-gray-100 hover:text-gray-200 
          text-gray-800 font-medium transition px-3 py-2 leading-none'>
          Register
          </Link>
     
         </>
          ) : (
            <>
            <span className='hidden sm:block text-gray-700 font-medium px-2'>
              Welcome, {user.name}
            </span>
            <button onClick={handleLogout} className='text-red-600 hover:text-red-900 font-medium transition px-3 py-2 leading-none'>Logout</button>
            </>
          )
        }
           </div>
      </div>
    </header>
  );
}