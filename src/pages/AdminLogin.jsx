import React, { useState } from 'react'
import Spin from '../components/Spin'
import { motion } from 'motion/react'
// import { useState } from 'react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { Backend_BASE_URL } from '../api/apiConfig'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

const AdminLogin = () => {

  const navigate = useNavigate();

  const [credential, setCredential] = useState({
    email: "",
    password: ""
  });

  const [isOpenEye, setIsOpenEye] = useState(false);
  const [isLoginAPICalling, setIsLoginAPICalling] = useState(false);

  const inputHandlerAdminLogin = (e) => {
    const { name, value } = e.target;
    setCredential({
      ...credential,
      [name]: value
    })
  }

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoginAPICalling(true);
    try {
      const response = await fetch(`${Backend_BASE_URL}/api/admin/auth/admin-login`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(credential)
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        localStorage.removeItem('jwtToken');
        localStorage.setItem('jwtToken', JSON.stringify(data.jwt_token));
        navigate("/admin-dashboard");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Please check your internet connection !")
      console.log("Something went wrong in admin login in catch", error.message)
    } finally {
      setCredential({
        email: "",
        password: ""
      });
      setIsLoginAPICalling(false);
    }

  }


  return (
    <section className="w-full h-[80vh] px-3 pt-20 pb-8 flex justify-center items-center relative sm:h-[86vh] sm:px-0 sm:pt-20 sm:pb-8">
      <div className='flex flex-col justify-center items-center w-full sm:w-[45%]'>

        <h1 className='p-1 pt-9 sm:pt-2 text-xl font-semibold'>Admin <span className='text-background-secondary'>Login</span></h1>
        <h3 className='p-1 pb-4 text-center'>Enter credential to access the Dashboard</h3>

        <form
          onSubmit={(e) => loginHandler(e)}
          className='flex flex-col justify-center items-center gap-5 p-3 py-10 border border-gray-700 bg-gray-800 w-full h-full rounded-md sm:w-full sm:px-2 sm:py-14 lg:w-2/3 lg:px-8'
        >
          <div
            className='flex flex-col w-full p-2 sm:w-full sm:p-2 md:w-full md:px-2 lg:w-full lg:px-2 relative'
          >
            <input
              className='peer bg-transparent w-full p-2 outline-none border rounded-md border-gray-600'
              type="email"
              id='email'
              name='email'
              value={credential.email}
              onChange={inputHandlerAdminLogin}
              placeholder=' '
              autoComplete='off'
              required
            />

            <label
              className='text-background-secondary bg-gray-800 absolute left-3.5 -top-2 duration-300 peer-placeholder-shown:translate-y-6 peer-focus:translate-y-0'
              htmlFor="email"
            >
              Enter Email
            </label>
          </div>

          <div className='flex flex-col w-full p-2 sm:w-full sm:p-2 md:w-full md:px-2 lg:w-full lg:px-2 relative'>
            <input
              className='peer bg-transparent p-2 outline-none border border-gray-600 rounded-md'
              type={`${isOpenEye ? "text" : "password"}`}
              id='password'
              name='password'
              placeholder=' '
              value={credential.password}
              onChange={inputHandlerAdminLogin}
              autoComplete='off'
              required


            />
            <label
              className='text-background-secondary bg-gray-800 absolute left-3.5 -top-2 duration-300 peer-placeholder-shown:translate-y-6 peer-focus:translate-y-0'
              htmlFor="password"
            >
              Enter Password
            </label>
            {
              isOpenEye ? (<BsEye onClick={() => setIsOpenEye(!isOpenEye)} className='absolute top-5 right-5 text-xl cursor-pointer' />) : (<BsEyeSlash onClick={() => setIsOpenEye(!isOpenEye)} className='absolute top-5 right-5 text-xl cursor-pointer' />)
            }
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className='py-2 px-16 rounded-full bg-background-secondary'
            type='submit'
          >
            {isLoginAPICalling ? <Spin /> : <p>Login</p>}
          </motion.button>

        </form>

      </div>
    </section>
  )
}

export default AdminLogin