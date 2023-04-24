import React, { useEffect } from "react";
import profpic from "../nonlocal/profpic.png";
import { getToken } from "../../services/localStorageService";
import { useGetLoggedUserQuery } from "../../services/userAuth";

export default function Local(props) {
  useEffect(() => {
    document.title = "ho-man | local outing";
  }, []);

  const {access_token} = getToken()
  const {data,isSuccess} = useGetLoggedUserQuery(access_token);
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
              departing time:{new Date().toLocaleTimeString()}
            </p>
            <button type="submit" href="#" className="btn btn-info">
              <ion-icon name="bicycle-outline"></ion-icon>
            </button>
          </div>
          <div className="disclaimer">
            <p>Disclaimer: this is to be filled at the time of departing</p>
          </div>
        </div>
      </section>
    </div>
  );
}
