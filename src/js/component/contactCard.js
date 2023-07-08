import React, { useState, useContext } from 'react';
import { FaEdit, FaTrash, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import { Context } from "../store/appContext";

const ContactCard = ({ contact, onDelete }) => {
  const { actions } = useContext(Context);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editedContact, setEditedContact] = useState(contact);

  const handleDelete = () => {
    onDelete(contact.id);
    setShowDeleteModal(false);
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleSaveContact = () => {
    actions.updateContact(contact.id, editedContact);
    handleCloseEditModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContact({ ...editedContact, [name]: value });
  };

  return (
    <div className="card mb-3">
    <div className="row g-0">
      <div className="col-md-3">
        <div className="contact-image">
          <img
            src="https://lh3.googleusercontent.com/a/AAcHTtcY4bcCIcP4dFQX-sNvNk_7asIM5v4ke_ExcDZAnUmIsSGnJ2WMtdqQLmELHpqfBJAQOWK4nPQ5L03odtHUf_NA7DqZ=s288-c-no"
            alt={contact.full_name}
            className="rounded-circle centered"
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="card-body">
          <h5 className="card-title">{contact.full_name}</h5>
          <div className="card-text">
            <p>
              <span className="icon">
                <i className="fas fa-map-marker-alt"></i>
              </span>{' '}
              {contact.address}
            </p>
            <p>
              <FaPhone className="icon" /> {contact.phone}
            </p>
            <p>
              <FaEnvelope className="icon" /> {contact.email}
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card-body">
          <div className="action-icons">
            <button type="button" className="btn btn-light" onClick={handleEdit}>
              <FaEdit className="edit-icon" />
            </button>
            <button type="button" className="btn btn-light" onClick={() => setShowDeleteModal(true)}>
              <FaTrash className="delete-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <Modal show={showEditModal} onHide={handleCloseEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="full_name">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="full_name"
            name="full_name"
            value={editedContact.full_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={editedContact.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={editedContact.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={editedContact.address}
            onChange={handleChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleCloseEditModal}>
          Close
        </button>
        <button className="btn btn-primary" onClick={handleSaveContact}>
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>

    <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this contact?</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleCloseDeleteModal}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  </div>
  );
};

export default ContactCard;