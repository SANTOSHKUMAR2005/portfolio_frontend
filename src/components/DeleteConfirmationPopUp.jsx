import React from 'react'
import { MdDelete } from "react-icons/md";
import { useData } from '../context/ContextAPI';
import Spin from './Spin';

const DeleteConfirmationPopUp = ({message}) => {

   const {setconfirmation,isDeleting}=useData();

    //DELETE Confirmation pop-up Handler
    const deleteConfirmationHandler = () => {
       setconfirmation("Yes");
    }

    //CANCEL Confirmation pop-up Handler
    const cancelConfirmationHandler = () => {
        setconfirmation("Cancel");
    }


    return (
        <>
            {/* CONFIRMATION POP-UP BEFORE ACTUAL DELETION */}
            {

                <div id="deleteProject" className="fixed inset-0 z-50 bg-body-color/20 backdrop-blur-lg transition-opacity">

                    <div className='flex justify-center items-center h-full w-full'>
                        <div id="projectCard" className="w-full max-w-md scale-95 transform rounded-2xl border border-gray-700 bg-background-primary p-8 text-center shadow-2xl transition-all duration-300">

                            <div className="mb-5">
                                <MdDelete className='mx-auto text-red-500 text-3xl' />
                            </div>

                            <h2 className="mb-2 text-2xl font-semibold text-white">Delete action confirmation?</h2>
                            <p className="mb-8 text-gray-400">Are you sure you want to delete this <strong className='text-background-secondary'>{message}</strong>? This action cannot be undone and the data will be permanently removed.</p>

                            <div className="flex gap-4">

                                <button
                                    onClick={() => cancelConfirmationHandler()}
                                    className="flex-1 rounded-lg border border-[#20b2a6] px-5 py-2 font-semibold text-[#20b2a6] transition-colors hover:bg-[#20b2a6]/10 active:scale-95">
                                    Cancel
                                </button>

                                <button
                                    onClick={() => deleteConfirmationHandler()}
                                    className="flex-1 rounded-lg bg-red-500 px-5 py-2 font-semibold flex justify-center text-white transition-all hover:bg-red-600 hover:shadow-[0_5px_15px_rgba(239,68,68,0.4)] active:scale-95">
                                    {isDeleting?(<Spin/>):("Yes")}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default DeleteConfirmationPopUp