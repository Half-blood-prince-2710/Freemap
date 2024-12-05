import { Link } from "react-router-dom";
import { useState } from "react";
import useLogin from "../../../hooks/useLogin";
const Login = () => {
  const { loading, login } = useLogin();
  const [loginData, setLoginData] =
    useState({
      email: "",
      password: "",
    });
  const handleChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit: React.FormEventHandler<
    HTMLFormElement
  > = async (e) => {
    e.preventDefault();
    await login(loginData);
  };

  return (
    <div className='flex justify-center items-center h-full w-full '>
      <div className='flex flex-col gap-4 items-center justify-center min-w-72 mx-auto border-2 p-12 rounded-2xl shadow-xl shadow-black'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Login
          <span className='text-[#ff8a86c7]'>
            {" "}
            MapBox
          </span>
        </h1>

        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-2 '>
          <div>
            <label htmlFor='name'>
              Email
            </label>
            <input
              type='text'
              placeholder='Enter email'
              name='email'
              onChange={handleChange}
              value={loginData.email}
              className='w-full  h-10 text-black p-2  rounded-lg hover:scale-105'
            />
          </div>

          <div>
            <label htmlFor='password'>
              Password
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              name='password'
              value={loginData.password}
              onChange={handleChange}
              className='w-full  h-10 text-black p-2  rounded-lg hover:scale-105'
            />
          </div>
          <Link
            to='/signup'
            className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
            {"Don't"} have an account?
          </Link>

          <div>
            <button
              className='border-2 p-3 font-medium rounded-xl mt-1  border-white'
              disabled={loading}>
              {loading ? (
                <div className=''>
                  ...
                </div>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
