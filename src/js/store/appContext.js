import React, { useState, useEffect } from "react";
import getState from "./flux.js";
import { loadContacts, createContact, updateContact, deleteContact } from "./store.js";

export const Context = React.createContext(null);

const injectContext = PassedComponent => {
  const StoreWrapper = props => {
    const [state, setState] = useState(
      getState({
        getStore: () => state.store,
        getActions: () => state.actions,
        setStore: updatedStore =>
          setState({
            store: Object.assign(state.store, updatedStore),
            actions: { ...state.actions }
          })
      })
    );

    useEffect(() => {
      loadContacts()
        .then(data => {
          setState(prevState => ({
            store: { ...prevState.store, contacts: data },
            actions: { ...prevState.actions }
          }));
        })
        .catch(error => {
          console.error(error);
        });
    }, []);

    const actions = {
      loadContacts: () => {
        loadContacts()
          .then(data => {
            setState(prevState => ({
              store: { ...prevState.store, contacts: data },
              actions: { ...prevState.actions }
            }));
          })
          .catch(error => {
            console.error(error);
          });
      },
      createContact: async newContact => {
        const createdContact = await createContact(newContact);
        if (createdContact) {
          setState(prevState => ({
            store: { ...prevState.store, contacts: [...prevState.store.contacts, createdContact] },
            actions: { ...prevState.actions }
          }));
        }
      },
      updateContact: async (contactId, updatedContact) => {
        const updated = await updateContact(contactId, updatedContact);
        if (updated) {
          setState(prevState => ({
            store: {
              ...prevState.store,
              contacts: prevState.store.contacts.map(contact =>
                contact.id === contactId ? updated : contact
              )
            },
            actions: { ...prevState.actions }
          }));
        }
      },
      deleteContact: async contactId => {
        const deleted = await deleteContact(contactId);
        if (deleted) {
          setState(prevState => ({
            store: {
              ...prevState.store,
              contacts: prevState.store.contacts.filter(contact => contact.id !== contactId)
            },
            actions: { ...prevState.actions }
          }));
        }
      }
    };

    return (
      <Context.Provider value={{ store: state.store, actions }}>
        <PassedComponent {...props} />
      </Context.Provider>
    );
  };

  return StoreWrapper;
};
export const useContactContext = () => useContext(Context);
export default injectContext;
