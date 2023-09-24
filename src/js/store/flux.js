const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			loadContacts() {
				fetch("https://playground.4geeks.com/apis/fake/contact/agenda/chrisdv15-agenda")
					.then(response => {
						if (!response.ok) {
							throw new Error("Failed to fetch contacts");
						}
						return response.json();
					})
					.then(data => {
						// Update the contacts store and local storage
						setStore({ contacts: data });
						localStorage.setItem("contacts", JSON.stringify(data));
					})
					.catch(error => {
						console.log("Oh No! There was a problem:\n", error);
					});
			},

			createContact(newContact) {
				fetch("https://playground.4geeks.com/apis/fake/contact/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(newContact)
				})
					.then(response => {
						if (!response.ok) {
							throw new Error("Failed to create contact");
						}
						return response.json();
					})
					.then(data => {
						// Update the contacts store and local storage
						const store = getStore();
						const updatedcontacts = [...store.contacts, data];
						setStore({ contacts: updatedcontacts });
						localStorage.setItem("contacts", JSON.stringify(updatedcontacts));
					})
					.catch(error => {
						console.log("Oh No! There was a problem:\n", error);
					});
			},

			updateContact(contactId, updatedContact) {
				fetch(`https://playground.4geeks.com/apis/fake/contact/${contactId}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(updatedContact)
				})
					.then(response => {
						if (!response.ok) {
							throw new Error("Failed to update contact");
						}
						return response.json();
					})
					.then(data => {
						// Update the contacts store and local storage
						const store = getStore();
						const updatedcontacts = store.contacts.map(contact =>
							contact.id === contactId ? data : contact
						);
						setStore({ contacts: updatedcontacts });
						localStorage.setItem("contacts", JSON.stringify(updatedcontacts));
					})
					.catch(error => {
						console.log("Oh No! There was a problem:\n", error);
					});
			},

			deleteContact(contactId) {
				fetch(`https://playground.4geeks.com/apis/fake/contact/${contactId}`, {
					method: "DELETE"
				})
					.then(response => {
						if (!response.ok) {
							throw new Error("Failed to delete contact");
						}

						// Update the contacts store and local storage
						const store = getStore();
						const updatedcontacts = store.contacts.filter(contact => contact.id !== contactId);
						setStore({ contacts: updatedcontacts });
						localStorage.setItem("contacts", JSON.stringify(updatedcontacts));
					})
					.catch(error => {
						console.log("Oh No! There was a problem:\n", error);
					});
			}
		}
	};
};

export default getState;
