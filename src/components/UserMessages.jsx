import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { toast } from 'react-toastify'
import Spin from './Spin'
import { Backend_BASE_URL } from '../api/apiConfig';
import { useData } from '../context/ContextAPI'
import DeleteConfirmationPopUp from './DeleteConfirmationPopUp'

const UserMessages = () => {
    const { isAPICalling, setisAPICalling, confirmation, setconfirmation, showDeletePopUp, setshowDeletePopUp,setIsDeleting } = useData();
    const [allMessage, setallMessage] = useState(null);
    const [deletemessageId, setdeletemessageId] = useState(null);


    const getAllMessageFromUser = async () => {
        setisAPICalling(true);
        try {
            const response = await fetch(`${Backend_BASE_URL}/api/contact-form/get-allmessage`);

            const data = await response.json();
            // console.log("get mess:",data);
            if (response.ok) {
                setallMessage(data);
            } else {
                console.log("get mess:",data);
                toast.error(data.detail);
            }
        } catch (error) {

            console.log("Something went wrong in User message", error);
        } finally {
            setisAPICalling(false);
        }
    }

    useEffect(() => {
        getAllMessageFromUser();
    }, [])



    const deleteMessageIdHandler = (id) => {
        setdeletemessageId(id);
        setshowDeletePopUp(true);
    }


    const deleteConfirmationMessageMainHandler = async () => {
        // console.log("hello delete", deletemessageId)

        setisAPICalling(true);
        setIsDeleting(true);
        try {

            const response = await fetch(`${Backend_BASE_URL}/api/contact-form/delete-message/${deletemessageId}`, {
                method: "DELETE",

            });
            // console.log("delete message:",response.message);

            const data=await response.json();
            
            //  console.log("2 message:",data)
            if (response.ok) {
                console.log(deletemessageId)
                const updateMessage = allMessage.filter((item) => item.id != deletemessageId)
                setallMessage(updateMessage);
                toast.success(data.message);
            } else {
                toast.error(data.detail);
            }

        } catch (error) {
            toast.error("Something went wrong in deletion. Please try again later!");
            console.log("Some went wrong in message deletion:", error);
        } finally {
            setisAPICalling(false);
            setshowDeletePopUp(false);
            setdeletemessageId(null);
            setconfirmation(null);
            setIsDeleting(false);
            console.log("main delete: ", deletemessageId)
        }
    }

    const cancelConfirmationMessageMainHandler = () => {
        console.log("main cancel: ", deletemessageId);
        setshowDeletePopUp(false);
        setdeletemessageId(null);
        setconfirmation(null);
        console.log("main cancel 2: ", deletemessageId);
    }

    useEffect(() => {
        if (confirmation === "Yes") {
            deleteConfirmationMessageMainHandler();
        }
        if (confirmation === "Cancel") {
            cancelConfirmationMessageMainHandler();
        }
    }, [confirmation]);






    if (isAPICalling) {
        return (
            <div className='flex justify-center items-center mt-10'>
                <Spin w="10" />
            </div>
        )
    }


    return (
        <>
            <section>
                <h2 className='text-xl sm:text-2xl font-semibold m-4'>User <span className='text-background-secondary'>Message</span></h2>

                <div
                    className='w-full grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'
                >
                    {
                        allMessage && allMessage.length > 0 ?
                            (
                                allMessage.map((msg, index) => {

                                    return (
                                        <motion.div
                                            initial={{ y: 30, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.2, delay: 0.15 * index }}
                                            viewport={{ once: false, amount: 0.25 }}
                                            key={index} className="bg-[#1e293b] border border-gray-700 rounded-xl p-5 shadow-lg flex flex-col h-full hover:shadow-[0_8px_24px_rgba(32,178,166,0.2)]">

                                            {/* HEADER: Name and Email */}
                                            <div className="mb-4">
                                                <h3 className="text-lg font-bold text-white tracking-wide">
                                                    From: {msg.name}
                                                </h3>
                                                <a
                                                    href={`mailto:${msg.email}`}
                                                    className="text-background-secondary text-sm font-medium hover:underline transition-all"
                                                >
                                                    {msg.email}
                                                </a>
                                            </div>
                                            <div className='mb-4 flex justify-between'>
                                                <p><strong>Date:</strong> {new Date(msg.createdAt + "Z").toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</p>
                                                <p><strong>Time:</strong> {new Date(msg.createdAt+"Z").toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:true})}</p>
                                            </div>



                                            <div className="bg-gray-800 border border-gray-700/50 p-4 rounded-lg grow mb-5">
                                                <p className="text-gray-300 text-sm sm:text-[16px] leading-relaxed">
                                                    {msg.message}
                                                </p>
                                            </div>

                                            <div className="flex gap-3 mt-auto">
                                                <a
                                                    href={`mailto:${msg.email}`}
                                                    className="flex-1 text-center flex items-center justify-center bg-background-secondary hover:bg-[#188c83] text-white py-2 rounded-lg text-sm font-semibold transition-colors"
                                                >
                                                    Reply
                                                </a>
                                                <button
                                                    onClick={() => deleteMessageIdHandler(msg.id)}
                                                    className="flex-1 text-center bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 py-2 rounded-lg text-sm font-semibold transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>

                                        </motion.div>

                                    )
                                })

                            ) : (
                                <>
                                    <div className='p-2'>
                                        <h1 className='sm:text-xl text-center'>No Message Found</h1>
                                        <p className='text-center text-red-500'>Please check your internet connection...</p>
                                    </div>
                                </>
                            )
                    }

                </div>

                {
                    showDeletePopUp &&
                    <DeleteConfirmationPopUp message="message" />
                }

            </section>
        </>

    )
}

export default UserMessages