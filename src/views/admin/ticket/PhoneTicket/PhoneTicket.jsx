import React from "react";
import {
  IoMdAdd,
  IoMdDoneAll,
  IoMdEye,
} from "react-icons/io";
import { format } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import { MdDelete, MdEdit, MdShare } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SolvingTicket from "views/Modals/SolvingTicket";
import TransferingTicket from "views/Modals/TransferingTicket";
import ModifyPhoneTicket from "./ModifyPhoneTicket";
const PhoneTicket = () => {
  const [phoneticketData, setPhoneTicketData] = useState([]);
  const [selectedPhoneTicketIds, setselectedPhoneTicketIds] = useState([]);

  useEffect(() => {
    fetch("/api/ticket/phone")
      .then((response) => response.json())
      .then((data) => setPhoneTicketData(data))
      .catch((error) => console.error("Error fetching contrat data:", error));
  }, []);

  const handleCheckboxChange = (phoneticketId) => {
    setselectedPhoneTicketIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(phoneticketId)) {
        return prevSelectedIds.filter((id) => id !== phoneticketId);
      } else {
        return [...prevSelectedIds, phoneticketId];
      }
    });
    console.log(phoneticketId);
  };

  const onDelete = async (phoneticketId) => {
    try {
      console.log("Deleting ticket with ID:", phoneticketId);
      const response = await fetch(`/api/ticket/${phoneticketId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("La suppression a été effectuée avec succès.");
      } else {
        throw new Error("ticket deletion failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Une erreur est survenue lors de la suppression");
    }
  };
  const handleDeleteClick = () => {
    Swal.fire({
      icon: "warning",
      title: "Confirmation de suppression",
      text: "Êtes-vous sûr de vouloir supprimer ce ticket ?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        selectedPhoneTicketIds.forEach((phoneticketId) =>
          onDelete(phoneticketId)
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log("Suppression annulée");
      }
    });
  };

  const [scnquery, setSCNQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalModifyOpen, setIsModalModifyOpen] = useState(false);
  const [isModalTicketOpen, setIsModalTicketOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState([]);
  const handleCloseModifyModal = () => {
    setIsModalModifyOpen(false);
  };
  const handleOpenModifyModal = selectedTicket => {
    setSelectedTicket(selectedTicket);
    setIsModalModifyOpen(true);
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = selectedTicket => {
    setSelectedTicket(selectedTicket);
    setIsModalOpen(true);
  }
  const handleCloseTransferModal = () => {
    setIsModalTicketOpen(false);
  };

  const handleOpenTransfeModal = (selectedTicket) => {
    setSelectedTicket(selectedTicket);
    setIsModalTicketOpen(true);
  }
  const getBackgroundColor = (status) => {
    switch (status) {
      case 'ASSIGNED':
        return 'bg-red-500';
      case 'SOLVED':
        return 'bg-blue-500';
      case 'APPROVED':
        return 'bg-green-500';
      case 'ACCEPTED':
        return 'bg-pink-500';
      case 'LOADING':
        return 'bg-orange-500';
        case 'REPORTED':
        return 'bg-gray-500';
      default:
        return '';
    }
  };
  return (
    <>
    <ToastContainer/>
    <div>
      <div className="relative mt-9 overflow-x-auto shadow-lg sm:rounded-lg ">
        <div className="ml-2 flex flex-wrap items-center space-x-5 ">
          <a href="/admin/add/phone">
            <button className="    flex text-gray-900 dark:text-gray-300 dark:text-gray-600">
              <IoMdAdd className="h-6 w-6" />
              Add
            </button>
          </a>
          <a href="/admin/add/technicien/phone">
            <button className="    flex text-gray-900 dark:text-gray-300 dark:text-gray-600">
              <IoMdAdd className="h-6 w-6" />
              Add to technicien
            </button>
          </a>
          <Link
            to={
              selectedPhoneTicketIds.length === 1
                ? `/admin/phone/${selectedPhoneTicketIds[0]}`
                : "#"
            }
          >
            <button
              className={`flex text-gray-900 dark:text-gray-300 dark:text-gray-600 ${selectedPhoneTicketIds.length !== 1 ? "cursor-not-allowed" : ""
                }`}
              onClick={() => {
                if (selectedPhoneTicketIds.length !== 1) {
                  Swal.fire({
                    icon: "warning",
                    title: "Please select one ticket",
                  });
                }
              }}
            >
              <IoMdEye className="h-6 w-6" />
              View
            </button>
          </Link>
          <button
            className={`flex text-gray-900 dark:text-gray-300 dark:text-gray-600 ${selectedPhoneTicketIds.length !== 1 ? "cursor-not-allowed" : ""
              }`}
            onClick={() => {
              if (selectedPhoneTicketIds.length !== 1) {
                Swal.fire({
                  icon: "warning",
                  title: "Please select one Ticket",
                });
              } else {
                handleOpenModal(selectedPhoneTicketIds);
              }
            }}
          >
            <IoMdDoneAll className="h-6 w-6" />
            Solved
          </button>
          <button
            className={`flex text-gray-900 dark:text-gray-300 dark:text-gray-600 ${selectedPhoneTicketIds.length !== 1 ? "cursor-not-allowed" : ""
              }`}
            onClick={() => {
              if (selectedPhoneTicketIds.length !== 1) {
                Swal.fire({
                  icon: "warning",
                  title: "Please select one Ticket",
                });
              } else {
                handleOpenTransfeModal(selectedPhoneTicketIds);
              }
            }}
          >
            <MdShare className="h-6 w-6" />
            Transfer to field ticket
          </button>
          <button
            className={`flex text-gray-900 dark:text-gray-300 dark:text-gray-600 ${selectedPhoneTicketIds.length !== 1 ? "cursor-not-allowed" : ""
              }`}
            onClick={() => {
              if (selectedPhoneTicketIds.length !== 1) {
                Swal.fire({
                  icon: "warning",
                  title: "Please select one Ticket",
                });
              } else {
                handleDeleteClick();
              }
            }}
          >
            <MdDelete className="h-6 w-6" />
            Delete
          </button>
        </div>
        <br />
        <div className="ml-4 flex flex-wrap items-center space-x-5">
          <label
            htmlFor="search"
            className=" text-gray-700    dark:text-gray-300"
          >
            Ticket N :
          </label>
          <input
            type="text"
            id="search"
            className="block w-40 rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search"
            onChange={(e) => setSCNQuery(e.target.value)}
          />
          <button
            type="button"
            className="ml-[-5px] inline-flex items-center  rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            <svg
              className="h-5 w-5 text-red-700    dark:text-gray-300"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
            Search
          </button>
        </div>
        <div className="border-b border-gray-900/10 pb-6"></div>
        <div className="overflow-x-auto ">
          <table className="min-w-full dark:text-white text-left text-sm text-gray-900 rtl:text-right dark:text-gray-900  sm:table lg:table">
            <thead className="overflow-x-auto bg-gray-50 text-xs uppercase dark:bg-gray-900 ">
              <tr className="">
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900   dark:text-gray-300"
                >
                  Ticket No
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Equipement S/N
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Service Station
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Service type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  TYPE
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Client
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Call in Time
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Receiving Time
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Technicien
                </th>


                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Resolving time
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {phoneticketData
                .filter((phoneticket) =>
                  Object.values(phoneticket)
                    .filter((value) => typeof value === "string")
                    .some((value) =>
                      value.toLowerCase().includes(scnquery.toLowerCase())
                    )
                )
                .map((phoneticket, index) => (
                  <tr
                    key={index}
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-table-search-${index}`}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                          checked={selectedPhoneTicketIds.includes(
                            phoneticket._id
                          )}
                          onChange={() => handleCheckboxChange(phoneticket._id)}
                        />
                        <label
                          htmlFor={`checkbox-table-search-${index}`}
                          className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {phoneticket.reference || ''}
                    </td>
                    <td className={`px-6 py-4 ${getBackgroundColor(phoneticket.status)}`}>
                          {phoneticket.status || ''}
                    </td>
                    <td className="px-6 py-4">{phoneticket.equipement?.equipement_sn || ''}</td>

                    <td className="px-6 py-4">{phoneticket.service_station || ''}</td>
                    <td className="px-6 py-4">{phoneticket.service_type || ''}</td>
                    <td className="px-6 py-4">{phoneticket.type || ''}</td>

                    <td className="px-6 py-4">{phoneticket.client ? (
                      <>
                        {phoneticket.client.client || ''}
                      </>
                    ) : (
                      "N/A"
                    )}</td>
                    <td className="px-6 py-4"> {phoneticket.call_time ? format(new Date(phoneticket.call_time), 'yyyy/MM/dd HH:MM') : 'Not yet'}</td>
                    <td className="px-6 py-4"> {phoneticket.created_at ? format(new Date(phoneticket.created_at), 'yyyy/MM/dd HH:MM ') : 'Not yet'}</td>
                    <td className="px-6 py-4">
                      {phoneticket.technicien ? (
                        <>
                          {phoneticket.technicien.firstname || ''} {phoneticket.technicien.lastname || ''}
                        </>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="px-6 py-4">  {phoneticket.solving_time ? format(new Date(phoneticket.solving_time), 'yyyy/MM/dd ') : 'Not yet'}</td>
                    <td className="px-6 py-4">
                      <button
                        scope="row"
                        onClick={() => handleOpenModifyModal(phoneticket)}
                        className=" whitespace-nowrap px-6   font-medium text-gray-900 dark:text-white"
                      >
                        <MdEdit className="h-6 w-6" />
                      </button> </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {isModalOpen && <SolvingTicket handleClose={handleCloseModal} ticket={selectedTicket} />}
          {isModalTicketOpen && <TransferingTicket handleClose={handleCloseTransferModal} ticket={selectedTicket} />}
          {isModalModifyOpen && <ModifyPhoneTicket handleClose={handleCloseModifyModal} ticket={selectedTicket} />}


        </div>
      </div>
      <nav
        className="flex-column flex flex-wrap items-center justify-between pt-4 md:flex-row"
        aria-label="Table navigation"
      >
        <span className="mb-4 block  w-full    text-sm font-normal text-gray-900 dark:text-gray-300 md:mb-0 md:inline md:w-auto">
          Showing
          <span className="font-semibold text-gray-900 dark:text-white">1-10</span>
          of
          <span className="font-semibold text-gray-900 dark:text-white">1000</span>
        </span>
        <ul className="inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse">
          <li>
            <a
              href="#"
              className="flex h-8 items-center justify-center border border-gray-300 bg-white  px-3 leading-tight text-gray-900 ms-0 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="flex h-8 items-center justify-center border border-gray-300 bg-blue-50 px-3 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex h-8 items-center justify-center border border-gray-300  bg-white px-3 leading-tight text-gray-900 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex h-8 items-center justify-center border border-gray-300  bg-white px-3 leading-tight text-gray-900 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex h-8 items-center justify-center border border-gray-300  bg-white px-3 leading-tight text-gray-900 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex h-8 items-center justify-center border border-gray-300  bg-white px-3 leading-tight text-gray-900 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex h-8 items-center justify-center border border-gray-300  bg-white px-3 leading-tight text-gray-900 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
    </>
  );
};

export default PhoneTicket;
