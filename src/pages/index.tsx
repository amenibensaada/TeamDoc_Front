import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import Static from "./home/staticlist";
import Folder from "./home/folder";
import Conditions from "./forgetPassword/Conditions";
import ResetPassword from "./forgetPassword/ResetPassword";
import ForgetPassword from "./forgetPassword/forgetPassword";
import { EditorReactContent } from "./home/EditorReactContent";
import HistoricalChangesPage from "./ContentHistory/HistoricalChangesPage";
import LandingPage from "./landingPage/landingPage";
import NotFound from "./notFound/notFound";
import Meet from "@/videochat/videochat";
import ProfilePage from "./profile/profilePage";
import SharedFoldersPage from "./home/foldershared";
import Chart from "./home/chart";

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
    path: "/editor/:id",
    element: <EditorReactContent />,
  },

  {
    path: "/folder",
    element: <Folder />,
  },
  {
    path: "/folder/static/:folderId",
    element: <Static />,
  },
  
  {
    path: "/folder/static",
    element: <Static />,
  },
  { path: "/contenthistory/:id*", element: <HistoricalChangesPage /> },
  { path: "/meet*", element: <Meet/> },
  { path: "/", element: <LandingPage /> },
  { path: "/profile", element: <ProfilePage /> },

  { path: "/contenthistory/:id", element: <HistoricalChangesPage /> },
  {
    path: "/Sharedfolders",
    element: <SharedFoldersPage />,
  },
  {
    path: "/Chart",
    element: <Chart />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
];
