import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import SideBar from "./sidebar/sidebar";

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
