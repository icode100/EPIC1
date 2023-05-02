import React from "react";
import profpic from "../nonlocal/profpic.png";
import jsPDF from "jspdf";
import { getToken } from "../../services/localStorageService";
import { useGetLoggedUserQuery } from "../../services/userAuth";
export default function Icard(props) {
  const { access_token } = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);
  let generatepdf = ()=>{
    var doc = new jsPDF("p","pt",[305, 500]);
  

    doc.html(document.getElementById("icard"),{
      callback:function(pdf){
        pdf.save("mypdf.pdf")
      }
    })
  }

  

  return (
    <>
    <section
      className="cred"
      id="credid"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div class="card ms-2 mt-2" id="icard"style={{ width: "18rem" }}>
        <img src={profpic} class="card-img-top" alt="..." />

        <div class="card-body" id='cardbody'>
          <h5 className="card-title">Student Details</h5>
          <p
            className="card-text"
            style={{
              fontWeight: "bold",
              fontFamily: "monospace",
            }}
          >
            Name:{isSuccess && data ? data.name : ""} <br />
            Roll:{isSuccess && data ? data.id : ""} <br />
            Sem:{isSuccess && data ? data.cred.sem : ""} <br />
            Block:{isSuccess && data ? data.cred.blockName : ""} <br />
            Room:{isSuccess && data ? data.cred.roomno : ""} <br />
            Mess Credit: {isSuccess && data ? data.cred.credits : ""}
          </p>
        </div>
      </div>
    </section>
    <div className="container">
            <button className="btn btn-info" onClick={generatepdf}><ion-icon name="cloud-download"></ion-icon></button>
    </div></>
  );
}
