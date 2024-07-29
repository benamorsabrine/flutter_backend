import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import EquipementTicket from "views/Modals/EquiementTicket";
import 'react-toastify/dist/ReactToastify.css';
import HelpDeskList from "views/Modals/ListeHelpdesk";
const AddPhoneTicket = () => {
  const [users, setUsers] = useState([]);
  const type = "PHONE";
  const status = "ASSIGNED"
  const [emptyFields, setEmptyFields] = useState([]);
  const [note, setNote] = useState("");
  const [call_time, setCallTime] = useState("");
  const [service_station, setservice_station] = useState("");
  const [service_type, setServiceType] = useState("");
  const [reference, setReferenceNumber] = useState("");
  const [isTechnicienModalOpen, setTechnicienModalOpen] = useState(false);
  const [isEquipementModalOpen, setEquipementModalOpen] = useState(false);
  //// Helpdesk ////
  const [helpdesk, setHelpdesk] = useState("");
  const [nameHelpdesk, setNameHelpdesk] = useState("");
  const [lastname, setLastName] = useState("");
  /// Equipement Data //////
  const [equipement, setequipement] = useState('')
  const [selectedEquipementSn, setselectedEquipementSn] = useState([])
  const [equipement_type, setEquipementType] = useState("");
  const [client, setClient] = useState('');
  const [clientId, setClientId] = useState('');
  const [StartGarantie_Date, setStartGarantieDate] = useState("");
  const [EndGarantie_Date, setEndGarantieDate] = useState("");
  const [service_status, setServiceStatus] = useState("");
  ////////////////////////////////////////////////////////
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  const handleHelpDeskSelection = (helpdesk) => {
    setHelpdesk(helpdesk._id)
    setNameHelpdesk(helpdesk.firstname)
    setLastName(helpdesk.lastname)
  }
  const handleEquipementSelection = (equipement) => {
    setequipement(equipement._id)
    setservice_station(equipement.adresse)
    setServiceStatus(equipement.status)

    if (equipement.client && equipement.client.length > 0) {
      equipement.client.forEach((item, index) => {
        console.log(`Element ${index}:`, item);
      });
      const firstClient = equipement.client[0];
      setClient(firstClient.client || '');
      setClientId(firstClient._id || '');
    } else {
      setClient('');
      setClientId('');
    }
    if (equipement.service && equipement.service.length > 0) {
      const formattedEffectiveDate = new Date(equipement.service[0].effective_date || '').toISOString().split('T')[0];
      setStartGarantieDate(formattedEffectiveDate);
      const formattedTerminationDate = new Date(equipement.service[0].termination_date || '').toISOString().split('T')[0];
      setEndGarantieDate(formattedTerminationDate)
    }
    setEquipementType(equipement.equipement_type)

    setselectedEquipementSn(equipement.equipement_sn);
    console.log("Selected equipement ID:", equipement._id);
    closeEquipementModal();
  };

  const [contacts, setContact] = useState("")
  const [selectedContact, setSelectedContact] = useState("");


  useEffect(() => {
    if (clientId) {
      fetchContacts();
    }
  }, [clientId]);

  // Define fetchContacts function
  const fetchContacts = async () => {
    try {
      const response = await fetch(`/api/client/contact/${clientId}`);
      const contactData = await response.json();

      if (response.ok) {
        setContact(contactData);
      } else {
        console.error("Erreur lors de la récupération des utilisateurs");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs", error);
    }
  };

  const openTechnicienModal = () => {
    setTechnicienModalOpen(true);
  };

  const closeTechnicienModal = () => {
    setTechnicienModalOpen(false);
  };

  const openEquipementModal = () => {
    setEquipementModalOpen(true);
  };

  const closeEquipementModal = () => {
    setEquipementModalOpen(false);
  };

  const [selectedContactId, setSelectedContactId] = useState('');

  const handleContactChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedContact(selectedValue);
    setSelectedContactId(selectedValue);
    console.log(selectedContactId)
  };;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const ticketData = {
      equipement,
      technicien: helpdesk,
      service_type,
      equipement_type,
      garantie_end_date: EndGarantie_Date,
      garantie_start_date: StartGarantie_Date,
      service_station,
      contact: selectedContactId,
      service_status,
      client: clientId,
      description:note,
      call_time,
      type,
      status,
      reference
    };
    const response = await fetch('/api/ticket/phone', {
      method: 'POST',
      body: JSON.stringify(ticketData),
      headers: {
        'Content-type': 'application/json'
      }
    });
    const json = await response.json();
    if (!response.ok) {
      console.log(json);
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setEmptyFields([]);
      setClient('');
      setselectedEquipementSn('')
      setHelpdesk('')
      setServiceStatus('')
      setContact('')
      setEquipementType('')
      setStartGarantieDate('')
      setEndGarantieDate('')
      setHelpdesk('') 
      setReferenceNumber('')  
      setServiceType('')
      setservice_station('')
      setCallTime('')
      setNote('')
      setError(null);
      setSuccessMessage("Ticket ajouté avec succès");
      console.log('Request sent successfully');
      setEmptyFields([]);
      toast.success('Ticket ajouté avec succès');
      setError(null);
    }
  }
  console.log(call_time)
  return (
    <>
      <ToastContainer />
      <h1 className="mx-0  mb-2.5 text-center text-[1.7em] font-semibold text-navy-700 dark:text-gray-500">
        Ajouter Phone Ticket :
      </h1>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Equipement S/N
              </label>
              <div className="mt-2">
                <input
                  value={selectedEquipementSn}
                  onChange={(e) => setselectedEquipementSn(e.target.value)}
                  type="text"
                  onClick={openEquipementModal}
                  className="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Client
              </label>
              <div className="mt-2">
                <input
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  type="text"
                  className="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="user-list"
                className="block font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Technicien
              </label>
              <div className="mt-2">
                <input
                  value={`${nameHelpdesk} ${lastname}`}
                  onChange={(e) => setNameHelpdesk(e.target.value)}
                  type="text"
                  onClick={openTechnicienModal}
                  className="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                />

              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="call_time"
                className="block font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Call in time
              </label>
              <div className="mt-2">
                <input
                  value={call_time}
                  onChange={(e) => setCallTime(e.target.value)}
                  type="datetime-local"
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="service-type"
                className="block font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Service Type
              </label>
              <div className="mt-2">
                <select
                  value={service_type}
                  onChange={(e) => setServiceType(e.target.value)}
                  name="service-type"
                  id="service-type"
                  className="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                >
                  <option value="">Sélectionnez type de service</option>

                  <option value="Corrective Maintenance">Corrective Maintenance</option>
                  <option value="Preventive Maintenance">Preventive Maintenance</option>
                  <option value="Staging Service">Staging Service</option>
                  <option value="Installation-Onsite inpection">Installation-Onsite inpection</option>
                  <option value="Installation-Physical Installation">
                    Installation-Physical Installation
                  </option>
                  <option value="Installation-Online Activation">
                    Installation-Online Activation
                  </option>
                  <option value="Hardware-Online update">Hardware-Online update</option>
                  <option value="Software-upgrade update">Software-upgrade update</option>
                  <option value="Removal">Removal</option>
                  <option value="Disable">Disable</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Service Status
              </label>
              <div className="mt-2">
                <input
                  value={service_status}
                  onChange={(e) => setServiceStatus(e.target.value)}
                  type="text"
                  className="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Reference number
              </label>
              <div className="mt-2">
                <input
                  value={reference}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  type="text"
                  className="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Contact Person
              </label>
              <div className="mt-2">
                <select
                  value={selectedContact}
                  onChange={handleContactChange}
                  className="sm:block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                >
                  <option value="">Sélectionner contact</option>
                  {Array.isArray(contacts) ? (
                    contacts.map((contact) => (
                      <option key={contact._id} value={contact._id}>
                        {contact.name} {contact.mobile} 
                      </option>
                    ))
                  ) : (
                    <option disabled>Loading contacts...</option>
                  )}
                </select>


              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Equipement type
              </label>
              <div className="mt-2">
                <input
                  value={equipement_type}
                  onChange={(e) => setEquipementType(e.target.value)}
                  type="text"
                  className="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Service station
              </label>
              <div className="mt-2">
                <input
                  value={service_station}
                  onChange={(e) => setservice_station(e.target.value)}
                  type="text"
                  className="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Garantie End Date
              </label>
              <input
                value={EndGarantie_Date}
                onChange={(e) => setEndGarantieDate(e.target.value)}
                type="date"
                className="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
              />
              <div className="mt-2"></div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Garantie Start Date
              </label>
              <input
                value={StartGarantie_Date}
                onChange={(e) => setStartGarantieDate(e.target.value)}
                type="date"
                className="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
              />
              <div className="mt-2"></div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block  font-medium leading-6 text-gray-900 dark:text-gray-600"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  id="about"
                  name="about"
                  rows="3"
                  className="sm: block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isTechnicienModalOpen && (
        <HelpDeskList handleClose={closeTechnicienModal} handleHelpDeskSelection={handleHelpDeskSelection} />
      )}
      {isEquipementModalOpen && (
        <EquipementTicket handleClose={closeEquipementModal} handleEquipementSelection={handleEquipementSelection} />
      )}
{error && <div className="error border rounded mx-0 my-5 p-2.5 border-solid bg-red-300">{error}</div>}

{successMessage && <div className="success border rounded mx-0 my-5 p-2.5 border-solid bg-green-300">{successMessage}</div>}
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className=" font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2  font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
        
      </div>
    </>
  );
};
export default AddPhoneTicket;
