import React from 'react'
import { useState, useEffect } from 'react'
import { useData } from '../context/ContextAPI'
import Spin from '../components/Spin'
import { Backend_BASE_URL } from '../api/apiConfig'
import { toast } from 'react-toastify'
import UploadResume from '../components/UploadResume'
import UserMessages from '../components/UserMessages'
import AddProject from '../components/AddProject'
import Projects from '../pages/Projects'




const AdminDashboard = () => {
  const [getPage, setGetPage] = useState(1);


  

  return (
    <>
      <section className='min-h-screen px-0 pt-24 pb-12 sm:px-3 md:px-8 lg:px-16 xl:px-28'>
        <h1 className='text-center mb-4 px-1 pt-3 pb-6 text-2xl sm:text-3xl font-semibold sm:px-20'>Admin <span className='text-background-secondary'>Dashboard</span>
        </h1>
        <div
          className='flex flex-wrap justify-center items-center gap-6 pb-4 border-b border-b-gray-600 px-2'
        >
          <p onClick={() => setGetPage(1)} className={`p-2 px-4 border border-gray-600 rounded-full cursor-pointer ${getPage == 1 ? "bg-background-secondary" : ""}`}>Messages</p>
          <p onClick={() => setGetPage(2)} className={`p-2 px-4 border border-gray-600 rounded-full cursor-pointer ${getPage == 2 ? "bg-background-secondary" : ""}`}> Add Project </p>
          <p onClick={() => setGetPage(3)} className={`p-2 px-4 border border-gray-600 rounded-full cursor-pointer ${getPage == 3 ? "bg-background-secondary" : ""}`}> Update Resume </p>
          <p onClick={() => setGetPage(4)} className={`p-2 px-4 border border-gray-600 rounded-full cursor-pointer ${getPage == 4 ? "bg-background-secondary" : ""}`}> Update Build </p>
        </div>

        
        {getPage === 1 && <UserMessages />}
        {getPage === 2 && 
        <div>
          <AddProject />
          <Projects btn1="Edit" btn2="Delete" />
        </div>}
        <div className='flex justify-center'>
          {getPage === 3 && <UploadResume />}
        </div>
      </section>
    </>
  )
}

export default AdminDashboard