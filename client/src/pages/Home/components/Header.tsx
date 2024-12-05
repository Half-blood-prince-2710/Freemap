import { BiLogOut} from "react-icons/bi";
import { Link} from "react-router-dom"
import useLogout from "../../../hooks/useLogout";
import { useAuthContext } from "../../../context/AuthContext";
// import { useState } from "react";

const Header = () => {
  // const [name,setName] = useState<string>("User")
  const { user } = useAuthContext()

  const {loading , logout} = useLogout()
  const handleClick = async() => {
    await logout();
    
  }
  // console.log(user, "user header")
  // if (user) {
  //   console.log(user,'if condition')
  //   setName(user?.name.toUpperCase());
  // }
  const name = user?.name.toUpperCase()
  return (
    <header className='flex items-center justify-between gap-4 px-6 py-4'>
      <h1 className='text-3xl font-bold'>
        Free Map
      </h1>
      {user ? (
        <div className='flex gap-4 items-center'>
          <h1 className='text-lg'>
            {name}
            {/* Manish Gupta */}
          </h1>
          <button
            className='flex gap-2 text-red-500 p-2 border-red-500 border-2 rounded-xl'
            onClick={handleClick}>
            {" "}
            {loading ? (
              <div className='animate-spin'>
                ...
              </div>
            ) : (
              <>
                <BiLogOut
                  size={20}
                  className=''
                />
                <span className='text-sm hidden sm:block'>
                  Logout
                </span>
              </>
            )}
          </button>
        </div>
      ) : (
        <ul className='flex gap-4'>
          <li className='text-lg hover:scale-105 hover:font-bold'>
            <Link to='/login'>
              Login
            </Link>
          </li>
          <li className='text-lg hover:scale-105 hover:font-bold '>
            <Link to='/signup'>
              SignUp
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}

export default Header
