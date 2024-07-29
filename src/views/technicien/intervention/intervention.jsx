import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useAuthContext } from 'views/auth/hooks/useAuthContext';
import { saveAs } from 'file-saver';
import domtoimage from 'dom-to-image';
import { CSSRulePlugin } from "gsap/dist/CSSRulePlugin";
import gsap from "gsap";

const Intervention = () => {
  const { user } = useAuthContext();
  const { ticketId } = useParams();
  const [ticketDetails, setticketDetails] = useState(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (ticketId) {
      fetch(`/api/ticket/${ticketId}`)
        .then((response) => response.json())
        .then((data) => setticketDetails(data))
        .catch((error) =>
          console.error("Error fetching ticket details:", error)
        );
    }
  }, [ticketId]);
  if (!ticketDetails) {
    return <div>Loading...</div>;
  }
  console.log(ticketDetails);


  // Register the CSSRulePlugin with GSAP
  gsap.registerPlugin(CSSRulePlugin);

  const handleDownload = () => {
    if (cardRef.current) {
      const proxyUrl = 'https://crossorigin.me/';

      domtoimage.toPng(cardRef.current, { cors: proxyUrl })
        .then(function (dataUrl) {
          saveAs(dataUrl, `ticket_${ticketId}.png`);
          window.scrollTo(0, 0);
        })
        .catch(function (error) {
          console.error('Error:', error);
        });
    }
  };

  return (

    <div className="flex justify-center items-center h-screen"> {/* Use flexbox to center vertically and horizontally */}
      <div className="rounded-md p-2 main mt-5 border-2 shadow-lg items-center bg-white border-tunisys-100">
        {/* Content of your container */}    <div ref={cardRef} className='bg-white'>
          <div className="flex w-full " >
            <div>
              <h2 className=" text-[25px] font-semibold  text-tunisys-100">Tunisys</h2>
              <h2 className=" text-[15px] font-semibold text-navy-900">124,Avenue de la liberté</h2>
              <h2 className=" text-[15px] font-semibold text-navy-900 ">1002 Tunis-Bélvedére</h2>
              <h2 className=" text-[15px] font-semibold text-navy-900 ">Tél : 71 791 699 </h2>
              <h2 className=" text-[15px] font-semibold text-navy-900">Fax : 71 786 188</h2>

            </div>
            <div className='' >
              <h2 className="p-3  border-8 border-red-700 text-[35px] font-semibold text-center text-tunisys-100 ml-7	">Fiche Intervention</h2>
            </div>
            <div className='ml-7'>
              <h2 className="text-[20px] font-semibold text-navy-900  ">Date : <span className='text-[15px]'>{new Date(ticketDetails.completion_time).toLocaleString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    
                  })}</span></h2>
              <h2 className="text-[20px] font-semibold  text-navy-900 ">Numéro : <span className='text-[15px]'>{ticketDetails.reference}</span> </h2>
            </div>
          </div>
          <div className='main border-red-800 ' >
            <form className="form" >
              <div className='border-8 block-inline	' >
                <div className='center  items-center justify-center text-center'>
                  <span className='text-[20px] border-8 text-navy-900 '>Client</span>
                </div>
                <div>
                  <input
                    readOnly
                    type="text"
                    value={ticketDetails.client?.client}
                    className="w-full h-9 mt-3 text-center text-lg text-navy-900"
                  />
                </div>
              </div>
              <div class="flex">
                <div className='border-8 w-[50%]'>
                  <div className='center  items-center justify-center text-center'>
                    <span className='text-[20px] border-8 text-navy-900'>Style systéme </span>
                  </div>
                  <div>
                    <input readOnly
                      type="text"
                      value={
                        ticketDetails.equipement
                          ? `${ticketDetails.equipement.equipement_type || ''} ${
                              ticketDetails.equipement.modele || ''
                            }`
                          : ''
                      }                      className="w-full h-9 mt-3 text-center text-lg text-navy-900" />
                  </div>
                </div>
                <div className='border-8 w-[50%]	'>
                  <div className='center  items-center justify-center text-center'>
                    <span className='text-[20px] border-8 text-navy-900'>Num série </span>
                  </div>
                  <div>
                    <input
                      readOnly
                      type="text"
                      value={ticketDetails.equipement?.equipement_sn}
                      className="w-full h-9 mt-3 text-center text-lg text-navy-900"
                    />
                  </div>
                </div>
              </div>
              <div className='border-8 block-inline	'>
                <div className='center  items-center justify-center text-center'>
                  <span className='text-[20px] border-8 text-navy-900'>Nature panne </span>
                </div>
                <div>
                  <input
                    readOnly
                    type="text"
                    value={ticketDetails.service_type}
                    className="w-full h-9 mt-3 text-center text-lg text-navy-900"
                  />
                </div>
              </div>
              <div className='border-8 block-inline	'>
                <div className='center  items-center justify-center text-center'>
                  <span className='text-[20px] border-8 text-navy-900'>Heure </span>
                </div>
                <div className='flex mt-4'>
                  <p className='text-[18px] text-navy-900'> D'arrivé</p>
                  <input readOnly
                    type="text"
                    className='text-[18px] w-[50%] h-9 mt-3 text-center text-navy-900'
                    value={new Date(ticketDetails.starting_time).toLocaleString('fr-FR', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric'

                    })}
                  />
                  <p className='text-[18px] w-[50%] h-9 mt-3 text-navy-900'> De cloturage</p>
                  <input
                    type="text"
                    readOnly
                    className="text-[18px] w-[50%] h-9 mt-3 text-center text-navy-900"
                    value={ticketDetails.solving_time ? new Date(ticketDetails.solving_time).toLocaleString('fr-FR', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric'
                    }) : ''}
                  />


                </div>
              </div>
              <div className='border-8 block-inline	'>
                <div className='center  items-center justify-center text-center'>
                  <span className='text-[20px] border-8 text-navy-900'>Action envisagé </span>
                </div>
                <div>
                  <input
                    readOnly
                    type="text"
                    value={ticketDetails.solution}
                    className="w-full h-9 mt-3 text-center text-lg text-navy-900" />
                </div>
              </div>

              <div className='border-8 block-inline	'>
                <div className='center  items-center justify-center text-center'>
                  <span className='text-[20px] border-8 text-navy-900'>Visa </span>
                </div>
                <div className='flex'>
                  <input required="" type="tel" placeholder="" className="w-full h-[50px] mt-3 border-4" />
                  <input required="" type="tel" placeholder="" className="w-full h-[50px] mt-3 border-4" />

                </div>
              </div>


            </form>
          </div>

        </div>
        <div className=' text-center mt-3'>
          <button className='bg-tunisys-100 text-white p-3 rounded-lg' onClick={handleDownload}>Imprimer</button>

        </div>
      </div>
    </div>
  );
}

export default Intervention;
