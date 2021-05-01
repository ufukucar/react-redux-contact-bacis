import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const AddContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !name || !number) {
      return toast.warning("Lütfen tüm alanları doldurunuz!");
    }

    const checkEmail = contacts.find(
      (contact) => contact.email === email && email
    );

    if (checkEmail) {
      return toast.error("Böyle bir email bulunmaktadır!");
    }

    const checkNumber = contacts.find(
      (contact) => contact.number === number && number
    );

    if (checkNumber) {
      return toast.error("Bu numara başka bir kullanıcıya kayıtlı");
    }

    const data = {
      id: contacts.length + 1,
      name: name,
      email: email,
      number: number,
    };

    dispatch({ type: "ADD_CONTACT", payload: data });
    toast.success("Yeni üye kaydı yapıldı");
    history.push("/");
  };

  return (
    <div className="container">
      <h1 className="display-3 my-5 text-center">Add Contact</h1>
      <div className="row">
        <div className="col-md-6 shadow mx-auto p-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="email"
                placeholder="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                name="number"
                placeholder="phone number"
                className="form-control"
                value={number}
                onChange={(e) => setNumber(parseInt(e.target.value))}
              />
            </div>

            <div className="form-group">
              <input
                type="submit"
                value="Add Contact"
                className="btn btn-dark btn-block"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
