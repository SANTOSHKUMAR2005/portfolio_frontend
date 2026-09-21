import React from 'react'
import { useState, useEffect } from 'react'
import { useData } from '../context/ContextAPI'
import Spin from '../components/Spin'
import { Backend_BASE_URL } from '../api/apiConfig'
import { toast } from 'react-toastify'

const UploadResume = () => {

    const { resumeURL, setResumeURL } = useData();
    const [isLoading, setIsLoading] = useState(false);

    const getResumeURL = async () => {
        if (resumeURL == null) {
            try {
                const response = await fetch(`${Backend_BASE_URL}/get/resumeURL`);
                if (response.ok) {
                    const data = await response.json();
                    const url = data.resumeURL;
                    setResumeURL(url);
                }else{
                    toast.error(response.message);
                    console.log(response);
                }
            } catch (e) {
                console.log(e.message);
            }
        }
    }

    useEffect(() => {
        getResumeURL();
    }, [])

    const UploadResume = async (e) => {
        e.preventDefault();
        const fileInputs = e.target.elements.new_resume;
        const resume = fileInputs.files[0];
        if (!resume) {
            toast.error("Please select a valid PDF file");
            return;
        }

        const formData = new FormData();
        formData.append('resume', resume);

        try {
            const response = await fetch(`${Backend_BASE_URL}/upload/resume`, {
                method: 'post',
                body: formData
            })

            const data = await response.json();

            if (!response.ok) {
                toast.error(`faild to Upload: ${data.message} `);
                return;
            }

            const newURL = data.resumeURL;
            setResumeURL(newURL);
            toast.success("Resume updated successfully");
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error.message);
        }
    }

    return (
        <div
            className='flex flex-col justify-center items-center gap-5 p-2 py-10 border border-gray-700 bg-gray-800 w-full h-full rounded-md sm:w-full sm:px-2 sm:py-10 lg:w-2/3 lg:px-8'
        >
            <p className='p-2 px-4  border-gray-600 rounded-full '> Current Resume </p>

            <div className="w-full max-w-125 lg:w-125 h-185 mx-auto border border-gray-300 rounded-lg overflow-hidden bg-background-primary flex items-center justify-center">
                {isLoading && <Spin />}
                {!isLoading &&
                    <iframe
                        src={resumeURL}
                        title="Resume Preview"
                        className="w-full h-full"
                        frameBorder="0"
                    />
                }
            </div>

            <form
                onSubmit={UploadResume}
                className='flex flex-col items-center gap-4 p-5'
            >
                <input type="file" name='new_resume' required accept='application/pdf' placeholder='select resume' className='bg-background-primary rounded-2xl px-5 py-2' />
                <button type='submit' className='bg-background-secondary w-50 py-2 rounded-2xl cursor-pointer'>Update</button>
            </form>
        </div>

    )
}

export default UploadResume