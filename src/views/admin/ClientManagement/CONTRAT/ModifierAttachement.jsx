import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const AttachmentsModal = ({
    isOpen,
    handleClose,
    existingAttachments,
    onDeleteAttachment,
    onAddAttachments,
    onSaveAttachments,
}) => {
    const [newAttachments, setNewAttachments] = useState([]);
    const { contratId } = useParams();

    const handleDeleteNewAttachment = (index) => {
        setNewAttachments((prevAttachments) => prevAttachments.filter((_, i) => i !== index));
    };

    const handleDeleteExistingAttachment = (attachmentId) => {
        console.log('Deleting existing attachment with ID:', attachmentId);
        onDeleteAttachment(attachmentId);
    };

    const handleAdd = () => {
        existingAttachments.forEach((existingAttachment) => {
            handleDeleteExistingAttachment(existingAttachment._id);
        });

        onAddAttachments(newAttachments);
        onSaveAttachments();
        setNewAttachments([]);
    };

    return (
        <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg rounded-md bg-white p-8 border-2 shadow-lg border-tunisys-100 dark:bg-gray-900">
                <div className={`modal ${isOpen ? 'open' : 'closed'}`}>
                    <div className="modal-content">
                        <h2>Attachments</h2>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            {existingAttachments &&
                                existingAttachments.map((existingAttachment, index) => (
                                    <div key={index} className="relative">
                                        <button
                                            className="absolute top-2 right-2 text-red-600"
                                            onClick={() => handleDeleteExistingAttachment(existingAttachment._id)}
                                        >
                                            X
                                        </button>
                                        <img
                                            src={existingAttachment.url}
                                            style={{ width: '200px', height: '200px' }}
                                            alt={`Existing Attachment ${index + 1}`}
                                            className='rounded'
                                        />
                                    </div>
                                ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            {newAttachments.map((newAttachment, index) => (
                                <div key={index} className="relative">
                                    <button
                                        className="absolute top-2 right-2 text-red-600"
                                        onClick={() => handleDeleteNewAttachment(index)}
                                    >
                                        X
                                    </button>
                                    <img
                                        src={URL.createObjectURL(newAttachment)}
                                        style={{ width: '200px', height: '200px' }}
                                        alt={`New Attachment ${index + 1}`}
                                        className='rounded'
                                    />
                                </div>
                            ))}
                        </div>

                        <input
                            type="file"
                            onChange={(e) => setNewAttachments(Array.from(e.target.files))}
                            multiple
                        />

                        <button
                            onClick={handleAdd}
                            className={`bg-green-500 rounded text-white p-2 ${newAttachments.length === 0 ? 'cursor-not-allowed opacity-50' : ''
                                }`}
                            disabled={newAttachments.length === 0}
                        >
                            Save Attachments
                        </button>

                        <button onClick={handleClose} className='ml-6 bg-red-500 rounded text-white p-2'>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttachmentsModal;
