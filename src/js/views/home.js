import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import ContactCard from "../component/contactCard";

export const Home = () => {
  const { store, actions } = useContext(Context);

  let contacts = store.contacts || [];

  return (
    <div className="container">
      <h1>Contact List</h1>
      <div className="row">
        {contacts.map(contact => (
          <ContactCard key={contact.id} contact={contact} onDelete={() => actions.deleteContact(contact.id)} />
        ))}
      </div>
      <Link to="/add-contact" className="btn btn-primary">
        Add Contact
      </Link>
    </div>
  );
};
