import React, { useState, useEffect } from "react";
import getState from "./flux.js";

export const Context = React.createContext(null);

const AppContext = ({ children }) => {
  const [store, setStore] = useState({
    contacts: []
  });

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const response = await fetch("https://assets.breatheco.de/apis/fake/contact/agenda/chrisdv15-agenda");
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      const data = await response.json();
      setStore(prevState => ({ ...prevState, contacts: data }));
    } catch (error) {
      console.error(error);
    }
  };

  const createContact = async (newContact) => {
    try {
      const response = await fetch("https://assets.breatheco.de/apis/fake/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newContact)
      });
      if (!response.ok) {
        throw new Error("Failed to create contact");
      }
      const data = await response.json();
      setStore(prevState => ({ ...prevState, contacts: [...prevState.contacts, data] }));
    } catch (error) {
      console.error(error);
    }
  };

  const updateContact = async (contactId, updatedContact) => {
    try {
      const response = await fetch(`https://assets.breatheco.de/apis/fake/contact/${contactId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedContact)
      });
      if (!response.ok) {
        throw new Error("Failed to update contact");
      }
      const data = await response.json();
      setStore(prevState => ({
        ...prevState,
        contacts: prevState.contacts.map(contact =>
          contact.id === contactId ? data : contact
        )
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteContact = async (contactId) => {
    try {
      const response = await fetch(`https://assets.breatheco.de/apis/fake/contact/${contactId}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }
      setStore(prevState => ({
        ...prevState,
        contacts: prevState.contacts.filter(contact => contact.id !== contactId)
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Context.Provider value={{ store, actions: { createContact, updateContact, deleteContact } }}>
      {children}
    </Context.Provider>
  );
};

const injectContext = (PassedComponent) => {
  const StoreWrapper = (props) => {
    return (
      <AppContext>
        <PassedComponent {...props} />
      </AppContext>
    );
  };
  return StoreWrapper;
};

export default injectContext;
