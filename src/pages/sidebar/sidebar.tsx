import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChatModal from "../ai/ChatModal";

export default function SideBar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const logOutClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const Menus = [
    { title: "Open Chat", src: "iconAI", component: <ChatModal /> },

    // { title: "Dashboard", src: "Chart_fill" },

    // {
    //   title: "Files ",
    //   src: "folders",
    //   gap: true,
    //   path: "/folder/static/:folderId",
    // },
    { title: " Meet ", src: "new-folder", gap: true, path: "/meet" },
    { title: " Create file ", src: "add-file" },
    {
      title: "Last Modification",
      src: "history",
      path: "/contenthistory/660fb2c526e0ac259955f98f",
    },
    // { title: "add team space", src: "queue" },
    // { title: "Members", src: "diversity" },
    // { title: "Inbox", src: "freedom-of-speech" },
    // { title: "Download", src: "cloud-computing" },

    { title: "Accounts", src: "User", gap: true, path: "/profile" },
    {
      title: "logout",
      src: "logout",
      onClick: logOutClick,
      isButton: true,
    },
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-full p-5  pt-8 relative duration-300`}>
        <img
          src="/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
               border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="/assets/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}></h1>
        </div>

        <ul className="pt-6">
          {/* <li className="mt-2">
            <ChatModal />
          </li> */}
          {Menus.map((Menu, index) => (
            <li key={index} onClick={Menu.onClick}>
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4
                  ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}>
                {Menu.path ? (
                  <Link to={Menu.path} className="flex items-center gap-x-2">
                    <img src={`/assets/${Menu.src}.png`} />
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200`}>
                      {Menu.title}
                    </span>
                  </Link>
                ) : Menu.component ? (
                  Menu.component
                ) : (
                  <div className="flex items-center gap-x-2">
                    <img src={`/assets/${Menu.src}.png`} />
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200`}>
                      {Menu.title}
                    </span>
                  </div>
                )}
              </li>
            </li>
          ))}
          <li className="mt-2"></li>
        </ul>
      </div>
    </div>
  );
}
