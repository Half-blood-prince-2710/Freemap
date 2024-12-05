import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import useSignup from "../../../hooks/useSignUp";
const SignUp = () => {
  const [signupData, setSignupData] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
     
    });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const { loading, signup } =
    useSignup();
  const handleSubmit: React.FormEventHandler<
    HTMLFormElement
  > = async (e) => {
    e.preventDefault();
    console.log(signupData);
    await signup(signupData);
  };

    return (
      <div className='flex justify-center items-center h-full w-full '>
        <div className='flex flex-col gap-4 items-center justify-center min-w-80 mx-auto border-2 p-12 rounded-2xl shadow-xl shadow-black'>
          <h1 className='text-3xl font-semibold text-center text-gray-300'>
            Sign Up{" "}
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
                Name
              </label>
              <input
                type='text'
                placeholder='Enter Full Name'
                name='name'
                value={signupData.name}
                onChange={handleChange}
                className='w-full  h-10 text-black p-2  rounded-lg hover:scale-105'
              />
            </div>

            <div>
              <label
                htmlFor='email'
                className=''>
                Email
              </label>
              <input
                type='text'
                placeholder='Enter email'
                name='email'
                value={signupData.email}
                onChange={handleChange}
                className='w-full input input-bordered h-10 text-black p-2  rounded-lg hover:scale-105'
              />
            </div>

            <div>
              <label className='label'>
                <span className='text-base label-text'>
                  Password
                </span>
              </label>
              <input
                type='password'
                placeholder='Enter Password'
                name='password'
                value={
                  signupData.password
                }
                onChange={handleChange}
                className='w-full input input-bordered h-10 text-black p-2  rounded-lg hover:scale-105'
              />
            </div>

            <div>
              <label className='label'>
                Confirm Password
              </label>
              <input
                type='password'
                placeholder='Confirm Password'
                name='confirmPassword'
                value={
                  signupData.confirmPassword
                }
                onChange={handleChange}
                className='w-full input input-bordered h-10 text-black p-2  rounded-lg hover:scale-105'
              />
            </div>

            <Link
              className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
              to='/login'>
              Already have an account?
            </Link>

            <div>
              <button
                className='border-2 p-3 font-medium rounded-xl mt-2  border-white'
                  disabled={loading}
              >
                {loading ? (
                <div className='' > ... </div>
              ) : (
                "Sign Up"
              )}
            
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};
export default SignUp;
