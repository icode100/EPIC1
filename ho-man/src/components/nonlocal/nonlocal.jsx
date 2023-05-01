import React,{useState,useEffect} from "react";
import profpic from './profpic.png'
import { getToken } from "../../services/localStorageService";
import { useGetLoggedUserQuery } from "../../services/userAuth";
import { usePostNonLocalOutingFormMutation } from "../../services/userAuth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import PublishSharpIcon from '@mui/icons-material/PublishSharp';


export default function Nonlocal(props) {
  const {access_token} = getToken()
  const {data,isSuccess} = useGetLoggedUserQuery(access_token);
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
  const [outDate, setOutDate] = useState('');
  const navigate = useNavigate();
  const [dateDifference, setDateDifference] = useState(null);
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };
  const handleOutDateChange = (e) => {
    setOutDate(e.target.value);
  };
  const [nonlocalsubmit,{isLoading}] = usePostNonLocalOutingFormMutation();
  const HandleSubmit = async(event)=>{
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const actualData = 
    {
      stu:data.id,
      outinstance:formdata.get('outdate'),
      address:formdata.get('address'),
      reason:formdata.get('reason'),
      city:formdata.get('city'),
      state:formdata.get('state'),
      zip:parseInt(formdata.get('zip')),
      modeoft:formdata.get('modeoft')
    }
    console.log(actualData);
    const res = await nonlocalsubmit({actualData,access_token})
    if(res.error){
      alert("Sorry! 😢 we cannot process your request now. Please contact the admin");
    }
    if(res.data){
      navigate('/home');
    }

  }
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
                        Name:{isSuccess && data? data.name:""} <br />
                        Roll:{isSuccess && data? data.id:""} <br />
                        Branch:{isSuccess && data? data.cred.branch:""} <br />
                        Sem:{isSuccess && data? data.cred.sem:""} <br />
                        Block:{isSuccess && data? data.cred.blockName:""} <br />
                        Room:{isSuccess && data? data.cred.roomno:""} <br />
                    </p>
                </div>
            </div>
        </section>
      <form className="row" onSubmit={HandleSubmit}>
        <div className="col-md-12">
          <label HTMLfor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            name="address"
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
            name="reason"
            id="reason"
            placeholder="Reason!!!"
          />
        </div>
        <div className="col-md-6">
          <label HTMLfor="inputCity" className="form-label">
            City
          </label>
          <input type="text" className="form-control" name="city" id="inputCity" />
        </div>
        <div className="col-md-4">
          <label HTMLfor="inputState" className="form-label">
            State
          </label>
          <select id="inputState" name="state" className="form-select">
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
          <input type="text" className="form-control" name="zip" id="inputZip" />
        </div>
        <div className="col-md-2">
          <label HTMLfor="inputZip"  className="form-label">
            mode of transport
          </label>
          <input type="text" name='modeoft' className="form-control" id="inputZip" />
        </div>
        <div className="col-md-2">
          <label HTMLfor="outdate" className="form-label">
            Outing date
          </label>
          <input type='datetime-local' value={outDate} onChange={handleOutDateChange} className="form-control" name="outdate" id="outdate" />
        </div>
        <div className="col-md-2">
          <label HTMLfor="retdate" className="form-label">
            Expected Return date
          </label>
          <input type='datetime-local' value={endDate} onChange={handleEndDateChange} className="form-control" id="retdate" />
        </div>
        <p>
          <button class="btn btn-primary my-2" type="button" onClick={calculateDateDifference} data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
            Display expected rebate
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
        {isLoading? <CircularProgress/>:<button className="btn btn-success my-3" type="submit">
            <PublishSharpIcon/>
          </button>}
        </div>
      </form>
    </div>
  );
}
