import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react';
import { BsCloudUploadFill } from "react-icons/bs";
import { useData } from '../context/ContextAPI';
import { toast } from 'react-toastify';
import { Backend_BASE_URL } from '../api/apiConfig';
import Spin from './Spin';

const AddProject = () => {

    const { projectInputData, setprojectInputData, isAddingProject, setIsAddingProject } = useData();

    const inputFileRef = useRef();
    const [previewUrl, setpreviewUrl] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [filename, setfilename] = useState(null);


    // ADD PROJECT INPUT HANDLER
    const projectDataInputHandler = (e) => {
        let { name, value } = e.target;
        setprojectInputData({
            ...projectInputData,
            [name]: value
        })
        // console.log("object afte setfun: ", projectInputData);
    }


    //=============================
    //  ADD PROJECT FILE (PHOTO) SELECTION HANDLER
    //=============================
    const selectPhoto = (e) => {
        const file = e.target.files[0];

        const maxFileSize = 2 * 1024 * 1024;

        if (file) {

            // console.log("file type:", file.type)
            if (file.type == "image/jpeg" || file.type == "image/png") {
                if (file.size <= maxFileSize) {
                    URL.revokeObjectURL(previewUrl);
                    const imgUrl = URL.createObjectURL(file);
                    setpreviewUrl(imgUrl);
                    setImageFile(file);
                    setfilename(file.name);
                } else {
                    toast.info("File size should be less than or equal to 2MB")
                    return;
                }

            } else {
                toast.info("Image type should be .jpeg or .png or .jpg");
                return;
            }

        } else {
            toast.info("Image Not Selected")
            return;
        }

    }


    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        }
    }, [previewUrl]);


    // ADD PROJECT MAIN API CALL HANDLER
    const addProjectMainHandler = async (e) => {
        e.preventDefault();
        setIsAddingProject(true);

        // SPLIT THE STRING TECHSTACK FIELD PROJECTINPUTDATA ON BAISIS OF COMMA(,)
        const newArray = projectInputData.techstack.split(',');

        // TRIM IF ANY SPACE IS THER WITH ANY WORD
        const trimedArray = newArray.map((tech) => {
            return tech.trim();
        });

        // NOW FILTER THE ARRAY IF ANY SPACE IS PRESENT IN ARRAY
        const finalArray = trimedArray.filter((tech) => {
            if (tech !== "") {
                return tech;
            }
        });

        // CREATING FINAL OBJECT TO BE SEND
        const dataToSend = {
            ...projectInputData,
            techstack: finalArray
        }

        const formdata = new FormData();
        formdata.append('file', imageFile);
        formdata.append('project_textdata', new Blob([JSON.stringify(dataToSend)], { type: 'application/json' }));
        console.log("Data to send: ", dataToSend);

        try {
            const response = await fetch(`${Backend_BASE_URL}/api/admin/add-new-project`, {
                method: "POST",
                body: formdata
            });

            // console.log("Projectinput response: ", response)
            const data = await response.json();
            // console.log("Projectinput data: ", data)
            if (response.ok) {
                toast.success(data.message);
                setprojectInputData({
                    title: "",
                    description: "",
                    techstack: "",
                    githubUrl: "",
                    liveLink: "",
                })
                if (inputFileRef.current) {
                    inputFileRef.current.value = "";

                }
                setpreviewUrl(null)
                setImageFile(null);
                setfilename(null);
            } else {
                toast.error(data.detail)
            }

        } catch (error) {
            toast.error("Something went wrong during add project call");
            console.log("Something went wrong with project adding call", error);
        } finally {
            setIsAddingProject(false);
        }
    }

    return (
        <>
            <div className='py-2 my-6 border border-gray-700 rounded-lg bg-gray-800 sm:p-4'>
                <h1 className='text-center px-8 pt-3 pb-6 text-xl sm:text-2xl sm:px-20 font-semibold'>Add <span className='text-background-secondary'>New Project</span></h1>
                <form
                    onSubmit={(e) => addProjectMainHandler(e)}
                    className='flex flex-col justify-start items-center gap-8 py-8 p-2 sm:p-8 ' >

                    <div className='flex flex-col relative w-11/12 sm:w-2/3 md:w-2/3 lg:w-1/3'>
                        <input
                            className='peer p-2 w-full outline-none bg-gray-800 text-background-secondary border border-gray-700 rounded-md'
                            id='title'
                            name='title'
                            type="text"
                            value={projectInputData.title}
                            onChange={(e) => projectDataInputHandler(e)}
                            placeholder=' '
                            autoComplete='off'
                            required
                        />
                        <label
                            htmlFor="title"
                            className='absolute left-2 -top-4 bg-gray-800 peer-placeholder-shown:translate-y-6 peer-focus:translate-y-0 duration-300'
                        >
                            Enter Title
                        </label>
                    </div>

                    <div className='flex flex-col relative w-11/12 sm:w-2/3 md:w-2/3 lg:w-1/3'>
                        <input
                            className='peer p-2 w-full outline-none bg-gray-800 text-background-secondary border border-gray-700 rounded-md'
                            id='description'
                            name='description'
                            type="text"
                            value={projectInputData.description}
                            onChange={(e) => projectDataInputHandler(e)}
                            placeholder=' '
                            autoComplete='off'
                            required
                        />
                        <label
                            className='absolute left-2 -top-4 bg-gray-800 peer-placeholder-shown:translate-y-6 peer-focus:translate-y-0 duration-300'
                            htmlFor="description">
                            Enter Description
                        </label>
                    </div>

                    <div className='flex flex-col relative w-11/12 sm:w-2/3 md:w-2/3 lg:w-1/3'>
                        <input
                            className='peer p-2 w-full outline-none bg-gray-800 text-background-secondary border border-gray-700 rounded-md'
                            id='techstack'
                            name='techstack'
                            type="text"
                            value={projectInputData.techstack}
                            onChange={(e) => projectDataInputHandler(e)}
                            placeholder=' '
                            autoComplete='off'
                            required
                        />
                        <label
                            className='absolute left-2 -top-4 bg-gray-800 peer-placeholder-shown:translate-y-6 peer-focus:translate-y-0 duration-300'
                            htmlFor="teckstack">Enter TeckStack with Comma(,)</label>
                    </div>

                    <div className='flex flex-col relative w-11/12 sm:w-2/3 md:w-2/3 lg:w-1/3'>
                        <input
                            className='peer p-2 w-full outline-none bg-gray-800 text-background-secondary  border border-gray-700 rounded-md'
                            id='githubUrl'
                            name='githubUrl'
                            type="text"
                            value={projectInputData.githubUrl}
                            onChange={(e) => projectDataInputHandler(e)}
                            placeholder=' '
                            autoComplete='off'
                            required
                        />
                        <label
                            className='absolute left-2 -top-4 bg-gray-800 peer-placeholder-shown:translate-y-6 peer-focus:translate-y-0 duration-300'
                            htmlFor="githubUrl">GitHub Repo Url
                        </label>
                    </div>

                    <div className='flex flex-col relative w-11/12 sm:w-2/3 md:w-2/3 lg:w-1/3'>
                        <input
                            className='peer p-2 w-full outline-none bg-gray-800 text-background-secondary border border-gray-700 rounded-md'
                            id='liveLink'
                            name='liveLink'
                            type="text"
                            value={projectInputData.liveLink}
                            onChange={(e) => projectDataInputHandler(e)}
                            placeholder=' '
                        />
                        <label
                            className='absolute left-2 -top-4 bg-gray-800 peer-placeholder-shown:translate-y-6 peer-focus:translate-y-0 duration-300'
                            htmlFor="liveLink">Enter Deployed Link</label>
                    </div>

                    <div className='flex flex-col justify-center items-center relative w-11/12  border border-gray-600 rounded-md py-6 px-8 sm:w-2/3 md:w-2/3 lg:w-1/3 '>
                        <input
                            className='hidden p-2 w-full outline-none bg-gray-800 border border-gray-700 rounded-md'
                            id='photo'
                            name='photo'
                            type="file"
                            ref={inputFileRef}
                            onChange={(e) => selectPhoto(e)}
                        // required
                        />
                        <label htmlFor="photo" className='cursor-pointer'>
                            {
                                !previewUrl && (<BsCloudUploadFill className='text-3xl' />)
                            }
                            {
                                !previewUrl ?
                                    (<p className='absolute left-2 -top-4 bg-gray-800'>Upload Photo</p>) :
                                    (<p className='absolute left-2 -top-4 p-[0.3rem] px-2 rounded-md bg-background-secondary'>Replace Photo</p>)
                            }

                        </label>

                        <div>
                            {
                                previewUrl && (<img className='w-full h-full object-cover mt-4' src={previewUrl} alt="Project_Image" />)
                            }
                        </div>
                        <div className='overflow-hidden w-full'>
                            {
                                filename && (<p className='text-white text-center mt-4'>{filename}</p>)
                            }
                        </div>

                        <div className='text-center py-2'>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                className='mx-auto border px-10 rounded-full text-background-secondary'
                                type='submit'
                            >
                                {isAddingProject && <p>Uploading image to cloud...</p>}
                            </motion.button>
                        </div>

                    </div>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className='py-2 px-10 rounded-full bg-background-secondary'
                        type='submit'
                    >
                        {isAddingProject ? (<Spin />) : ("Add Project")}
                    </motion.button>

                </form>

            </div>
        </>
    )
}

export default AddProject