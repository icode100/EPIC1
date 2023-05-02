import "./App.css";
import Login from "./components/loginpage/login";
import Register from "./components/loginpage/register";
import Home from "./components/Home";
import Error from "./error";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
  
} from "react-router-dom";
import Nonlocal from "./components/nonlocal/nonlocal";
import Local from "./components/local/local";
import Icard from "./components/icard/icard";
import ResetPass from "./components/loginpage/resetPass";
import { useSelector } from "react-redux";
import NonlocalReg from "./components/nonlocalReg";
import { getOutdate } from "./services/localStorageService";






function App() {
  // return <RouterProvider router={router} />;
  const {access_token} = useSelector(state=>state.auth)
  const outdate = getOutdate(state=>state.date)
  return (

  <BrowserRouter>

    <Routes>
      <Route path='/' element={!access_token?<Login/>:<Navigate to = '/home'/>}></Route>
      <Route path= "/register" element= {<Register/>}errorElement= {<Error/>}></Route>
      <Route path= "/resetpass" element= {<ResetPass/>}errorElement= {<Error/>}></Route>
      <Route path='/home' element={access_token?<Home/>:<Navigate to="/"/>}>
        
        <Route path="nonlocalreg" element={<NonlocalReg/>} errorElement={<Error/>}/>
        <Route path= "nonlocal"
          element= {!outdate?<Nonlocal/>:<Navigate to ='/home/nonlocalreg'/>}
          errorElement= {<Error/>} />
          <Route path= "local"
            element= {
              <Local
                name="girish"
                roll="123456"
                branch="cse"
                sem="4"
                block="ABC"
                room="s01"
              />
            }
            errorElement= {<Error/>} />

          <Route path= "icard"
            element= {
              <Icard
                name="girish"
                roll="123456"
                branch="cse"
                sem="4"
                block="ABC"
                room="s01"
              />
            }
            errorElement= {<Error/>} />

      </Route>

    </Routes>
        
  </BrowserRouter>
  )
}

export default App;