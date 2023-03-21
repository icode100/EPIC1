import React,{useState,useEffect} from "react";
import profpic from './profpic.png'
export default function Nonlocal(props) {
  
  useEffect(() => {
    document.title = "ho-man | non-local outing";
  }, []);
    let stylesheet = {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin:'10px',
        maxWidth:'100vw'
    }
    const states = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal'
  ];
  const [endDate, setEndDate] = useState('');
  const [dateDifference, setDateDifference] = useState(null);
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };
  const calculateDateDifference = () => {
    const start = new Date();
    const end = new Date(endDate);
    const diffInMs = Math.abs(end - start);
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    setDateDifference(diffInDays);
  };
  return (
    <div className="container" style={stylesheet} >
        <h2>Hi! There 👋</h2>
        <section className="cred" style={{display:'grid',justifyContent:'center',alignItems:'center'}}>
            <div class="card my-3" style={{width: "18rem"}}>
                <img src={profpic} class="card-img-top" alt="..."/>
                <div class="card-body">
                    <p class="card-text" style={{fontWeight:'bold',fontFamily:'monospace'}}>
                        Name:{props.name} <br />
                        Roll:{props.roll} <br />
                        Branch:{props.branch} <br />
                        Sem:{props.sem} <br />
                        Block:{props.block} <br />
                        Room:{props.room} <br />
                    </p>
                </div>
            </div>
        </section>
      <form className="row">
        <div className="col-md-12">
          <label HTMLfor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>
        <div className="col-12">
          <label HTMLfor="reason" className="form-label">
            Reason for outing
          </label>
          <input
            type="text"
            className="form-control"
            id="reason"
            placeholder="Reason!!!"
          />
        </div>
        <div className="col-md-6">
          <label HTMLfor="inputCity" className="form-label">
            City
          </label>
          <input type="text" className="form-control" id="inputCity" />
        </div>
        <div className="col-md-4">
          <label HTMLfor="inputState" className="form-label">
            State
          </label>
          <select id="inputState" className="form-select">
            <option selected>Choose...</option>
            {states.map((item) => (
              <option key={item} value={item}>
              {item}
              </option>
              ))}
          </select>
        </div>
        <div className="col-md-2">
          <label HTMLfor="inputZip" className="form-label">
            Zip
          </label>
          <input type="text" className="form-control" id="inputZip" />
        </div>
        <div className="col-md-2">
          <label HTMLfor="retdate" className="form-label">
            Return date
          </label>
          <input type='datetime-local' value={endDate} onChange={handleEndDateChange} className="form-control" id="retdate" />
        </div>
        <p>
          <button class="btn btn-primary my-2" type="button" onClick={calculateDateDifference} data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
            Display rebate
          </button>
        </p>
        <div style={{ minHeight:"120px"}}>
          <div class="collapse collapse-horizontal" id="collapseWidthExample">
            <div class="card card-body" style={{width: "300px"}}>
            You are going for {dateDifference} days and your mess reduction is <em> Rs.{dateDifference*114}</em>
            </div>
          </div>
        </div>
          
        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"
            />
            <label className="form-check-label" HTMLfor="gridCheck">
              I follow the guidelines
            </label>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
