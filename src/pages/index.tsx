import Signup from "./Signup/Signup";
import ForgetPassword from "./ForgetPassword/ForgetPassword";
import ResetPassword from "./ForgetPassword/ResetPassword";
import Conditions from "./ForgetPassword/Conditions";
//import Test from "./ForgetPassword/Test";

//import ResetPassword from "./ForgetPassword/ResetPassword";



export default [
 

  {
    path: "/signup/*",
    element: <Signup />,
  },
 
 {
  path: "/forgetPassword",
  element:<ForgetPassword/>,
 },
    {
     path: "/reset-password/*",
     element: <ResetPassword />,
  },
  {
    path: "/conditions/*",
    element: <Conditions/>,
 },

  //{
   // path: "/test/*",
    //element:<Test/> , }

   // {
  //   path: "login/*",
  //   element: <Login />,
  // },
];
