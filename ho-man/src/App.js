import "./App.css";
import Login from "./components/loginpage/login";
import Register from "./components/loginpage/register";
import Home from "./components/Home";
import Error from "./error";
import {
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";
import Nonlocal from "./components/nonlocal/nonlocal";
import Local from "./components/local/local";
import Icard from "./components/icard/icard";
import ResetPass from "./components/loginpage/resetPass";

const router = createBrowserRouter([
  { path: "/", element: <Login />,errorElement: <Error/> },
  { path: "/register", element: <Register />,errorElement: <Error/> },
  { path: "/resetpass", element: <ResetPass />,errorElement: <Error/> },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "nonlocal",
        element: (
          <Nonlocal
            name="Alex"
            roll="123456"
            branch="cse"
            sem="4"
            block="ABC"
            room="s01"
          />
        ),
        errorElement: <Error/>
      },
      {
        path: "local",
        element: (
          <Local
            name="Alex"
            roll="123456"
            branch="cse"
            sem="4"
            block="ABC"
            room="s01"
          />
        ),
        errorElement: <Error/>
      },
      {
        path: "icard",
        element: (<>
          <Icard
          name="Alex"
          roll="123456"
          branch="cse"
          sem="4"
          block="ABC"
          room="s01"
        />
        </>
        ),
        
      },
    ],
    
  },
  {
    path:'/err',
    element:<Error/>
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
