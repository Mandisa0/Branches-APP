import React, { ReactNode, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faBars } from '@fortawesome/free-solid-svg-icons';
import { hideModal } from '../services/modal/modalService';
import { modalContext } from '../Context';

interface ModalProps {
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({children }) => {

   const modalContent = useContext(modalContext);

   const closeModal = () => {

    modalContent?.setModalContent('');
    hideModal();
    

   }

    return (
        <div id="modal" className="modal" tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <small className="modal-title"></small>
                        <button onClick={() =>closeModal()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body" id="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
