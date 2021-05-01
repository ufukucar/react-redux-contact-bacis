import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditContact = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const contacts = useSelector((state) => state);
  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (currentContact) {
      setName(currentContact.name);
      setEmail(currentContact.email);
      setNumber(currentContact.number);
    }
  }, [currentContact]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !name || !number) {
      return toast.warning("Lütfen tüm alanları doldurunuz!");
    }

    const checkEmail = contacts.find(
      (contact) => contact.id !== parseInt(id) && contact.email === email
    );

    if (checkEmail) {
      return toast.error("Böyle bir email bulunmaktadır!");
    }

    const checkNumber = contacts.find(
      (contact) => contact.id !== parseInt(id) && contact.number === number
    );

    if (checkNumber) {
      return toast.error("Bu numara başka bir kullanıcıya kayıtlı");
    }

    const data = {
      id: parseInt(id),
      name: name,
      email: email,
      number: number,
    };

    dispatch({ type: "EDIT_CONTACT", payload: data });
    toast.success("Üye başarıyla güncellendi");
    history.push("/");
  };

  return (
    <div className="container">
      {currentContact ? (
        <>
          <h1 className="display-3 my-5 text-center">Edit Contact - {id}</h1>
          <div className="row">
            <div className="col-md-6 shadow mx-auto p-5">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    placeholder="phone number"
                    className="form-control"
                    value={number}
                    onChange={(e) => setNumber(parseInt(e.target.value))}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="submit"
                    value="Edit Contact"
                    className="btn btn-dark"
                  />
                  <Link to="/" className="btn btn-danger ml-3">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <h1 className="display-3 my-5 text-center"> No Contact Babe !</h1>
      )}
    </div>
  );
};

export default EditContact;
