import React from "react";

const ContactCard = ({ contact, onDelete }) => {
  const handleDelete = () => {
    onDelete(contact.id);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{contact.full_name}</h5>
        <p className="card-text">
          <strong>Email:</strong> {contact.email}
        </p>
        <p className="card-text">
          <strong>Address:</strong> {contact.address}
        </p>
        <p className="card-text">
          <strong>Phone:</strong> {contact.phone}
        </p>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
