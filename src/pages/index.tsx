import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import SideBar from "./sidebar/sidebar";
import Static from "./home/staticlist";
import Folder from "./home/folder";
import Conditions from "./forgetPassword/Conditions";
import ResetPassword from "./forgetPassword/ResetPassword";
import ForgetPassword from "./forgetPassword/forgetPassword";
import { EditorReactContent } from "./home/EditorReactContent";
import HistoricalChangesPage from "./ContentHistory/HistoricalChangesPage";
import LandingPage from "./landingPage/landingPage";
import NotFound from "./notFound/notFound";
import Footer from "./footer/footer";

export default [
  {
    path: "login/*",
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
    path: "/footer",
    element: <Footer />,
  },
  {
    path: "/editor/:id",
    element: <EditorReactContent />,
  },

  {
    path: "/folder",
    element: <Folder />,
  },
  {
    path: "/folder/static",
    element: <Static />,
  },
  { path: "/contenthistory/:id*", element: <HistoricalChangesPage /> },
  { path: "/", element: <LandingPage /> },

  { path: "/contenthistory/:id", element: <HistoricalChangesPage /> },
  {
    path: "/*",
    element: <NotFound />,
  },
];
