import Signup from "./Signup/Signup";
import Login from "./Login/Login";

export default [
   {
     path: "login/*",
     element: <Login />,
   },

  {
    path: "/signup/*",
    element: <Signup />,
  },
  // {
  //   path: "/reset-password/*",
  //   element: <ResetPassword />,
  // },
  // {
  //   path: "/forget-password/*",
  //   element: <ForgetPassword />,
  // },
  //dddd
];
