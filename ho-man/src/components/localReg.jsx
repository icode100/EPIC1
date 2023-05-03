import React, { useState, useEffect } from "react";
import profpic from "./nonlocal/profpic.png";
import { getLocalid, getToken, removeLocalid } from "../services/localStorageService";
import { useGetLoggedUserQuery } from "../services/userAuth";
import axios from "axios";



export default function LocalReg() {
  useEffect(() => {
    document.title = "ho-man | local outing";
  }, []);
  const { access_token } = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);
  const idc = getLocalid();
  var id = idc
  const [perm, setPerm] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/localpermission/${id}/`)
      .then((response) => {
        setPerm(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const instance = {
    ininstance: new Date().toLocaleTimeString(),
  };
  
  const handleSubmit = async(event) => {
    event.preventDefault();

  const putRequest1 = axios.put(`http://localhost:8000/localreturn/${id}/update/`, instance);

  Promise.all([putRequest1])
    .then((res) => {
      console.log(res[0].data); // response from first request
      removeLocalid();
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
  };
  console.log(id)
  // console.log(perm)
  return (
    <div className="container my-3">
      <section
        className="cred"
        style={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div class="card my-3" style={{ width: "18rem" }}>
          <img src={profpic} class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 className="card-title">Student Details</h5>
            <p
              class="card-text"
              style={{ fontWeight: "bold", fontFamily: "monospace" }}
            >
              Name:{isSuccess && data ? data.name : ""} <br />
              Roll:{isSuccess && data ? data.id : ""} <br />
              Branch:{isSuccess && data ? data.cred.branch : ""} <br />
              Sem:{isSuccess && data ? data.cred.sem : ""} <br />
              Block:{isSuccess && data ? data.cred.blockName : ""} <br />
              Room:{isSuccess && data ? data.cred.roomno : ""} <br />
            </p>
            {perm.security_ispermitted === false ?
            (
              <button type="submit" className="btn btn-danger" disabled>
                not permitted yet
              </button>
            ) : (
              <button type="submit" onClick={handleSubmit} className="btn btn-success">
                have returned
              </button>
            )}

            {/* {isLoading? <CircularProgress/>:<button type="submit"  href="#" className="btn btn-info">
              returned
            </button>} */}
          </div>
          <div className="disclaimer">
            <p>Disclaimer: this is to be filled at the time of departing</p>
          </div>
        </div>
      </section>
    </div>
  );
}
