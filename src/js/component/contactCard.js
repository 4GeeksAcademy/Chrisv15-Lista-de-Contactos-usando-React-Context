import React from "react";
import { FaEdit, FaTrash, FaPhone, FaEnvelope } from "react-icons/fa";

const ContactCard = ({ contact, onDelete }) => {
  const { id, full_name, address, phone, email } = contact;

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-3">
          <div className="contact-image">
            <img
              src="https://lh3.googleusercontent.com/a/AAcHTtcY4bcCIcP4dFQX-sNvNk_7asIM5v4ke_ExcDZAnUmIsSGnJ2WMtdqQLmELHpqfBJAQOWK4nPQ5L03odtHUf_NA7DqZ=s288-c-no"
              alt={full_name}
              className="rounded-circle centered"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">{full_name}</h5>
            <div className="card-text">
              <p>
                <FaPhone className="icon" /> {phone}
              </p>
              <p>
                <FaEnvelope className="icon" /> {email}
              </p>
              <p>
                <span className="icon">
                  <i className="fas fa-map-marker-alt"></i>
                </span>{" "}
                {address}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-body">
            <div className="action-icons">
              <button type="button" class="btn btn-light">
                <FaEdit
                  className="edit-icon"
                  onClick={() => {
                    // Handle edit functionality here
                  }}
                />
              </button>
              <button type="button" class="btn btn-light">
                <FaTrash
                  className="delete-icon"
                  onClick={() => onDelete(id)}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
