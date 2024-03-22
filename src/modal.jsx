import React,{useState} from "react";
import './modal.css';

function Modal(){
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    return(
        <div onClick={toggleModal} style={{ width: '100px', height: '100px', backgroundColor: 'gray'}}>

            {isOpen && (
            <div className="modal" onClick={toggleModal}>
                <div className="modal-content">
                    
                    
                </div>
            </div>

            )}
        </div>
    );
}

export default Modal;