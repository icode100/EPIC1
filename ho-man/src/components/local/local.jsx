import React,{useEffect} from "react";
import profpic from "../nonlocal/profpic.png";
export default function Local(props) {
  useEffect(() => {
    document.title = "ho-man | local outing";
  }, []);
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
              Name:{props.name} <br />
              Roll:{props.roll} <br />
              Branch:{props.branch} <br />
              Sem:{props.sem} <br />
              Block:{props.block} <br />
              Room:{props.room} <br />
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
