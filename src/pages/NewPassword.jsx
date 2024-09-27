import React from 'react'
import HeaderAuth from '../components/HeaderAuth'

const NewPassword = () => {
  return (
    <>
    <HeaderAuth />
    <div className="flex gap-16">
      <img src="images/newpassword.png" alt="" className="h-screen" />
      <div className="w-full px-20 py-5">
        <h1 className="font-bold text-5xl text-#333333 mb-3">Create New Password</h1>
        <p className='mb-5 text-#807D7E'>Your new password must be different from previous used passwords.</p>
        <form action="" className="flex flex-col gap-5 text-#3C4242">
          <div className="flex flex-col">
            <label htmlFor="" className="text-lg  mb-2">Email address</label>
            <input type="email" required className="border-2 rounded-lg py-3 px-5 w-full outline-none "/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-lg  mb-2">Password</label>
            <input type="password" required className="border-2 rounded-lg py-3 px-5 w-full outline-none "/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-lg  mb-2">Confirm Password</label>
            <input type="password" required className="border-2 rounded-lg py-3 px-5 w-full outline-none "/>
          </div>
          <button className="text-white bg-#8A33FD px-5 py-3 hover:opacity-80 rounded-lg w-1/5">Reset Password</button>
        </form>
      </div>
    </div>
  </>
  )
}

export default NewPassword