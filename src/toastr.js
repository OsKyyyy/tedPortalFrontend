import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastrClass = (type,message) => {

    type == "error" ? toast.error(message):
        (
            type == "success" ? toast.success(message) :
                type == "info" ? toast.info(message):
                    toast(message)
        )
}

