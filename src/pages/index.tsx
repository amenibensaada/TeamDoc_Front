import Signup from "./Signup/Signup";
import Conditions from "./forgetPassword/Conditions";
import ResetPassword from "./forgetPassword/ResetPassword";
import ForgetPassword from "./forgetPassword/forgetPassword";

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
     path: "/reset-password/:token",
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
