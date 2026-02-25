import axios from 'axios'
import React from 'react'

const DeleteModal = ({ setDelModal, todoId, getAll }) => {

    const deleteText = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken")
            await axios.delete(
                `http://localhost:8004/todo/delete/${todoId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )
            getAll()
            setDelModal(false)

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-500 opacity-75" />
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />
                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <div className='flex justify-between mb-3'>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Delete Text
                                </h3>
                                <button
                                    onClick={() => { setDelModal(false) }}
                                    id="closeModalButton"
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <svg
                                        className="h-4 w-4 inline-block ml-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                        data-slot="icon"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18 18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="mt-2">
                                <p className="text-sm leading-5 text-gray-500">
                                    Are you sure you want to delete the text?
                                </p>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                <button
                                    onClick={deleteText}
                                    type="button"
                                    className="bg-cyan-700 px-2 rounded text-white"
                                >
                                    Delete
                                </button>
                            </span>
                            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                                <button
                                    onClick={() => { setDelModal(false) }}
                                    type="button"
                                    className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                >
                                    Cancel
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default DeleteModal