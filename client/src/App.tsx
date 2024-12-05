import Login from "./pages/Auth/Login/Login"
import Home from "./pages/Home/Home"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { useAuthContext } from "./context/AuthContext"
import { Toaster } from "react-hot-toast"
import SignUp from "./pages/Auth/SignUp/Signup"



function App() {
  const { user } = useAuthContext();
  // console.log(user, "user");

  const routes = [
    {
      path: "/",
      element: 
        <Home />
     
    },
    {
      path: "/login",
      element: !user ? (
        <Login />
      ) : (
        <Navigate to='/' />
      ),
    },
    {
      path: "/signup",
      element: !user ? (
        <SignUp />
      ) : (
        <Navigate to='/' />
      ),
    },
    {
      path: "*",
      element: <Navigate to='/login' />,
    },
  ];

  const router =
    createBrowserRouter(routes);

  return (
    
      <div className="h-screen bg-gray-950 text-white w-full overflow-x-hidden">

        <RouterProvider router={router} />
        <div>
          <Toaster/>
        </div>
      </div>
  
  )
}

export default App
