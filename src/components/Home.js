import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const contacts = useSelector((state) => state);

  const dispatch = useDispatch();

  const deleteContact = (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
    toast.success("Üye başarıyla silindi");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-right my-5">
          <Link to="/add" className="btn btn-outline-dark">
            Add Contact
          </Link>
        </div>
        <div className="col-md-12 mx-auto">
          <table className="table table-hover  ">
            <thead className="text-white  bg-dark text-center">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Number</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email} </td>
                  <td>{item.number}</td>
                  <td>
                    <Link
                      to={`/edit/${item.id}`}
                      className="btn btn-small btn-primary"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteContact(item.id)}
                      className="btn btn-small btn-danger ml-3"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
