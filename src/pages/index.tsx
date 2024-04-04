import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import SideBar from "./sidebar/sidebar";



import Conditions from "./forgetPassword/Conditions";
import ResetPassword from "./forgetPassword/ResetPassword";
import ForgetPassword from "./forgetPassword/forgetPassword";
import Footer from "./footer/footer";






export default [
  
    {
      path: "login/*",
      element: <Login />,
    },
  {
    path: "/signup/*",
    element: <Signup />,
  },
  {
    path: "/sidebar/*",
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
    path: "/conditions/*",
    element: <Conditions />,
  },
  {
    path:"/footer",
    element: <Footer />
  }

  //{
  // path: "/test/*",
  //element:<Test/> , }

  // {
  //   path: "login/*",
  //   element: <Login />,
  // },
  //dddd
];
