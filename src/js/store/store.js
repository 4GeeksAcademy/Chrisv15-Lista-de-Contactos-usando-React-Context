export async function loadContacts() {

    try {
      const response = await fetch("https://assets.breatheco.de/apis/fake/contact/agenda/chrisdv15-agenda");
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
  export async function createContact(newContact) {
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
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  
  export async function updateContact(contactId, updatedContact) {
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
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  
  export async function deleteContact(contactId) {
    try {
      const response = await fetch(`https://assets.breatheco.de/apis/fake/contact/${contactId}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }
      loadContacts();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  