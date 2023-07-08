import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const AddContact = () => {
  const { actions } = useContext(Context);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    const newContact = {
      full_name: fullName,
      email,
      agenda_slug: 'chrisdv15-agenda',
      address,
      phone
    };
    actions.createContact(newContact);
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Add Contact</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <Link to="/" className="btn btn-secondary ms-2">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default AddContact;
