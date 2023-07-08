import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import ContactCard from "../component/contactCard";

export const Home = () => {
	const { store, actions } = useContext(Context);
  
	const contacts = store.contacts || []; // Verificar si store.contacts es undefined y proporcionar un valor predeterminado []
  
	return (
	  <div className="container">
		<h1>Contact List</h1>
		<div className="row">
		  {store.contacts.map(contact => (
			<ContactCard key={contact.id} contact={contact} onDelete={actions.deleteContact} />
		  ))}
		</div>
		<Link to="/add-contact" className="btn btn-primary">
		  Add Contact
		</Link>
	  </div>
	);
  };
  