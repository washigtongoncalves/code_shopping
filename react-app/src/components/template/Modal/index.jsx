import React from 'react';

function Modal(props) {
    return (
        <div className="modal" tabIndex="-1" role="dialog" id={props.modalId}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {props.title}
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {props.body}
                    </div>
                    <div className="modal-footer">
                        {props.footer}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Modal;
