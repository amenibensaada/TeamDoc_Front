import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import SideBar from "./sidebar/sidebar";



import Conditions from "./forgetPassword/Conditions";
import ResetPassword from "./forgetPassword/ResetPassword";
import ForgetPassword from "./forgetPassword/forgetPassword";
import NotFound from "./notFound/notFound";






export default [
  
    {
      path: "login/",
      element: <Login />,
    },
  {
    path: "/signup/",
    element: <Signup />,
  },
  {
    path: "/sidebar/",
    element: <SideBar />,
  },

  {
    path: "/forgetPassword",
    element: <ForgetPassword />,
  },

  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/conditions/",
    element: <Conditions />,
  }, 

  {
    path: "/*", // This path will match any URL
    element: <NotFound/> // Use the NotFound component as the element
  }
   
] ;

  //{
  // path: "/test/*",
  //element:<Test/> , }

  // {
  //   path: "login/*",
  //   element: <Login />,
  // },
  //dddd

