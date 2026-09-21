import React from 'react'
import { createContext, useContext, useState } from 'react'

const Context = createContext();
const ContextAPI = ({children}) => {
    const [resumeURL, setResumeURL]= useState(null);


   const [buildText, setBuildText] = useState([
      { 'id': 1, 'text':'secure & scalable web apps'},
      { 'id': 2, 'text': 'Java backend systems' },
      { 'id': 3, 'text': 'modern React experiences' },
      { 'id': 4, 'text': 'full-stack solutions' },
      { 'id': 5, 'text': "AI/ML and Generative AI solutions"},
      { 'id': 6, 'text': "Database Schemas" }
   ]);

   const [confirmation, setconfirmation] = useState(null);
   const [isDeleting, setIsDeleting] = useState(false);
   const [isAPICalling, setisAPICalling] = useState(false);
   const [isAddingProject, setIsAddingProject] = useState(false);
   const [showDeletePopUp, setshowDeletePopUp] = useState(false);
   
   const [allProjects, setAllProjects] = useState(null);
   const [projectInputData, setprojectInputData] = useState({
      title: "",
      description: "",
      techstack: "",
      githubUrl: "",
      liveLink: "",
   });

    const adminLogOut=()=>{
        localStorage.removeItem('jwtToken');
    }

  return (
     <Context.Provider value={{
        resumeURL, setResumeURL,
        adminLogOut,
        buildText, setBuildText,
        confirmation, setconfirmation,
        isDeleting, setIsDeleting,
        isAPICalling, setisAPICalling,
        showDeletePopUp, setshowDeletePopUp,
        allProjects, setAllProjects,
        projectInputData, setprojectInputData,
        isAddingProject, setIsAddingProject

     }}
       
     >
        {children}
     </Context.Provider>
  )
}

export const useData=()=>{
    return useContext(Context);
}

export default ContextAPI