import React from "react";
import profpic from "../nonlocal/profpic.png";
import jsPDF from "jspdf";
export default function Icard(props) {
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
            Name:{props.name} <br />
            Roll:{props.roll} <br />
            Branch:{props.branch} <br />
            Sem:{props.sem} <br />
          </p>
        </div>
      </div>
    </section>
    <div className="container">
            <button className="btn btn-info" onClick={generatepdf}><ion-icon name="cloud-download"></ion-icon></button>
    </div></>
  );
}
