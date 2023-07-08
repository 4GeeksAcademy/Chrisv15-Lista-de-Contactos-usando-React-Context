import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Contact = () => {
  const { actions } = useContext(Context);

  const handleDelete = contactId => {
    actions.deleteContact(contactId);
  };

  return (
    <div className="container">
      <h1>Contact List</h1>
      <div className="row">
        {/* Render the contact cards here */}
      </div>
      <Link to="/add-contact" className="btn btn-primary">
        Add Contact
      </Link>
    </div>
  );
};

export default Contact;
