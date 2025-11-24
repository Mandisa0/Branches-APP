import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faBars } from '@fortawesome/free-solid-svg-icons';

interface ModalProps {
    title: string;
}

const Modal: React.FC<ModalProps> = ({ title }) => {
    return (
        <div id="modal" className="modal" tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"></h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body" id="modal-body">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
