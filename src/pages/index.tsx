import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import SideBar from "./sidebar/sidebar";
import Editor from "./home/EditorContent";
import Static from "./home/staticlist";
import Folder from "./home/folder";

import { EditorReactContent } from "./home/EditorReactContent";


import Conditions from "./forgetPassword/Conditions";
import ResetPassword from "./forgetPassword/ResetPassword";
import ForgetPassword from "./forgetPassword/forgetPassword";
import HistoricalChangesPage from "./ContentHistory/HistoricalChangesPage";
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
    path: "/contenthistory/:id*",
    element: <HistoricalChangesPage />,
  },
  { path: "/footer", element: <Footer /> },
{
    path: "/editor/:id",
    element: <EditorReactContent />,
  },
  {
    path: "/editor/react/:id",
    element: <Editor />,
  },
  {
    path: "/*",
    element: <Folder />, 
  },
  {
    path: "/folder/static",
    element: <Static />, 
  },

];
