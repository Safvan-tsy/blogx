import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

interface AlertModalProps {
  text: string;
  onYes: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ text, onYes }) => {
  return (
    <>
      <button
        className="btn btn-sm"
        onClick={() => {
          const modal = document.getElementById('alert_modal') as HTMLDialogElement;
          if (modal) {
            modal.showModal();
          }
        }}
      >
        <FaTrashAlt />
      </button>
      <dialog id="alert_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">{text}</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <a className="btn text-success" onClick={() => onYes()}>
                Yes
              </a>
              <button className="btn text-warning">No</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AlertModal;
