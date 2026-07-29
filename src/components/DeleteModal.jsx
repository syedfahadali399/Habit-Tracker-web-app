import { useDispatch, useSelector } from "react-redux"
import { closeDeleteModal } from "../store/Feature/DeleteModalSlice"
import { deleteHabit } from "../store/Feature/HabitSlice"
import { toast } from "react-toastify"

const DeleteModal = ({id}) => {

    const isOpen = useSelector((state) => state.deleteModal.isOpen)
    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(closeDeleteModal())
    }

    const deleteUserHabit = (id) => {

        toast.success("Successfully Deleted Habit")
        dispatch(deleteHabit(id))
        setTimeout(() => {
            dispatch(closeDeleteModal())
        }, 100)
    }
    return (
        <>
        {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={closeModal}></div>
                <div className="relative bg-gray-300 border border-gray-300 rounded-xl shadow-sm p-4 md:p-6 w-full max-w-sm z-10 animate-in zoom-in-95 duration-300">
                    <button onClick={closeModal} type="button" className="absolute cursor-pointer top-3 end-2.5 text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="popup-modal">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" /></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 md:p-5 text-center">
                        <svg className="mx-auto mb-4 text-fg-disabled w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                        <h3 className="mb-6 text-body">Are you sure you want to delete this habit?</h3>
                        <div className="flex items-center space-x-4 justify-center">
                            <button onClick={() => deleteUserHabit(id)} className="text-white bg-red-600 rounded-xl cursor-pointer box-border border border-red-600 hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                                Yes, I'm sure
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
            

        </>
    )
}

export default DeleteModal