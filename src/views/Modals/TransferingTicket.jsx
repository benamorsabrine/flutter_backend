import React, { useState, useParams } from 'react';
import Swal from "sweetalert2";
import TechnicienList from './ListeTechnicien';

const TransferingTicket = ({ handleClose, ticket }) => {
  console.log(ticket)
  const [note, setNote] = useState('');
  const [technicien, setTechnicien] = useState('');

  const handleTransfer = async () => {
    const confirmationResult = await Swal.fire({
      icon: "success",
      title: "Confirmation de transfert",
      text: "Voulez-vous transférer cette à un technicien ?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui",
      cancelButtonText: "Annuler",
    });

    if (confirmationResult.isConfirmed) {
      if (!note || !technicien) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Les champs ne doivent pas être vides'
        });
        return;
      }

      try {
        const solvingData = {
          raison_transfert: note,
          technicien: technicien
        };

        const response = await fetch(`/api/ticket/transfer/${ticket}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(solvingData)
        });

        if (!response.ok) {
          throw new Error('Failed to mark ticket as transfered');
        }

        const updatedTicket = await response.json();
        console.log(updatedTicket);

        handleClose();
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        });
      }
    }
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const openTechnicienModal = () => {
    setModalOpen(true);
  };
  const closeTechnicienModal = () => {
    setModalOpen(false);
  };
 const handleTechnicienSelection = (technicien) => {
  setTechnicien(technicien._id)
  setName(technicien.firstname)
  setLastName(technicien.lastname)
}

  return (
    <>
      <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg rounded-md bg-white p-8 border-2 shadow-lg border-tunisys-100 dark:bg-gray-900">
          <div className="overflow-x-auto">
            <h1 className="text-[1.7em] mb-2.5 mx-0 text-center font-semibold dark:text-gray-700">Transfering Ticket  :</h1>
            <div className="space-y-1">
              <div className="mt-10 sm:grid-cols-6 space-y-4 ">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="technicien"
                    className="block font-medium leading-6 text-gray-900 dark:text-gray-600"
                  >
                    Choisir technicien
                  </label>
                  <div className="mt-2">
                    <input
                    value={`${name} ${lastname}`}
                      onClick={openTechnicienModal}
                      onChange={(e) => setTechnicien(e.target.value)}
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="note"
                    className="block font-medium leading-6 text-gray-900 dark:text-gray-600"
                  >
                    Note
                  </label>
                  <input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                  />
                  <div className="mt-2"></div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" onClick={handleClose} className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Cancel</button>
              <button type="button" onClick={handleTransfer} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
            </div>
          </div>
        </div>
        {isModalOpen && <TechnicienList handleClose={closeTechnicienModal} handleTechnicienSelection={handleTechnicienSelection} />}

      </div>
    </>
  )
}

export default TransferingTicket