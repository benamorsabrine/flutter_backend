import React, { useState, useEffect } from "react";
import { IoMdAdd, IoMdDoneAll, IoMdEye } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { format, differenceInMonths } from "date-fns";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ManagementEquipement = () => {
  const [equipementData, setEquipementData] = useState([]);
  const [selectedEquipementIds, setSelectedEquipementIds] = useState([]);
  const [selectedEquipement, setSelectedEquipement] = useState([]);
  const handleCheckboxChange = (equipementId) => {
    setSelectedEquipementIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(equipementId)) {
        return prevSelectedIds.filter((id) => id !== equipementId);
      } else {
        return [...prevSelectedIds, equipementId];
      }
    });
    console.log(equipementId);
  };
  useEffect(() => {
    fetch("/api/equi/list")
      .then((response) => response.json())
      .then((data) => setEquipementData(data))
      .catch((error) => console.error("Error fetching contrat data:", error));
  }, []);
  const onDelete = async (equipementId) => {
    try {
      console.log("Deleting equipement with ID:", equipementId);
      const response = await fetch(`/api/equi/${equipementId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("La suppression a été effectuée avec succès.");
      } else {
        throw new Error("equipement deletion failed");
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
      text: "Êtes-vous sûr de vouloir supprimer ce client et ses contacts associés ?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        selectedEquipementIds.forEach((equipementId) => onDelete(equipementId));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log("Suppression annulée");
      }
    });
  };
  const [scnquery, setSCNQuery] = useState("");
  return (
    <div>
      <ToastContainer />
     
      <div className="relative mt-9 overflow-x-auto shadow-lg sm:rounded-lg">
        <div className="ml-2 flex flex-wrap items-center space-x-5">
          <a href="/admin/add/equipement">
            <button className="flex text-gray-900 dark:text-gray-300 dark:text-gray-600">
              <IoMdAdd className="h-6 w-6" />
              Add
            </button>
          </a>
          {/* <Link to={selectedEquipementIds.length === 1 ? /admin/equipement/${selectedEquipementIds[0]} : '#'}>*/}
          <Link
            to={
              selectedEquipementIds.length === 1
                ? `/admin/equipement/details/${selectedEquipementIds[0]}`
                : "#"
            }
          >
            <button
              className={`flex text-gray-900 dark:text-gray-300 dark:text-gray-600 ${selectedEquipementIds.length !== 1 ? "cursor-not-allowed" : ""
                }`}
              onClick={() => {
                if (selectedEquipementIds.length !== 1) {
                  Swal.fire({
                    icon: "warning",
                    title: "Please select one Equipement",
                  });
                }
              }}
            >
              <IoMdEye className="h-6 w-6" />
              View
            </button>
          </Link>

          <button
            className={`flex text-gray-900 dark:text-gray-300 dark:text-gray-600 ${selectedEquipementIds.length !== 1 ? "cursor-not-allowed" : ""
              }`}
            onClick={() => {
              if (selectedEquipementIds.length !== 1) {
                Swal.fire({
                  icon: "warning",
                  title: "Please select one Equipement",
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
            Equipement S/N :
          </label>
          <input
            type="text"
            id="search"
            className="block w-40 rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-200 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search"
            onChange={(e) => setSCNQuery(e.target.value)}
          />
        </div>

        <div className="border-b border-gray-900/10 pb-6"></div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-gray-900 rtl:text-right dark:text-gray-900  sm:table lg:table">
            <thead className="overflow-x-auto bg-gray-50 text-xs uppercase dark:bg-gray-900 ">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                    />
                    <label for="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900   dark:text-gray-300"
                >
                  Equipement S/N
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Equipement Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Service No
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
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Modéle
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Contrat                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Date création
                </th>

              </tr>
            </thead>
            <tbody>
              {equipementData
                .filter((equipement) =>
                  Object.values(equipement)
                    .filter((value) => typeof value === "string")
                    .some((value) =>
                      value.toLowerCase().includes(scnquery.toLowerCase())
                    )
                )
                .map((equipement, index) => (
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
                          checked={selectedEquipementIds.includes(
                            equipement._id
                          )}
                          onChange={() => handleCheckboxChange(equipement._id)}
                        />

                        <label
                          htmlFor={`checkbox-table-search-${index}`}
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {equipement.equipement_sn}
                    </td>
                    <td
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {equipement.equipement_type}
                    </td>
                    <td
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {equipement.service && equipement.service.length > 0 && (
                        <>
                          <p>{equipement.service[0].service_no || 'N/A'}</p>

                        </>
                      )}
                    </td>
                    <td
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {equipement.client && equipement.client.length > 0 && (
                        <>
                          <p>{equipement.client[0].client || 'N/A'}</p>

                        </>
                      )}                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {equipement.status}
                    </td>
                    <td className="px-6 py-4">{equipement.modele} </td>
                    <td className="px-6 py-4">
                      {equipement.contrat && equipement.contrat.length > 0 && (
                        <>
                          <p>{equipement.contrat[0].contrat_sn || 'N/A'}</p>

                        </>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {equipement.createdAt ? format(new Date(equipement.createdAt), 'yyyy/MM/dd ') : 'N/A'}
                    </td>

                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <nav
        className="flex-column flex flex-wrap items-center justify-between pt-4 md:flex-row"
        aria-label="Table navigation"
      >
        <span className="mb-4 block  w-full    text-sm font-normal text-gray-900 dark:text-gray-300 md:mb-0 md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            1-10
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            1000
          </span>
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
  );
};

export default ManagementEquipement;
