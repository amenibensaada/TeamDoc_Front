import { useState } from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [open, setOpen] = useState(true);
  
  const Menus = [
    { title: "Dashboard", src: "Chart_fill" },
    { title: "Files ", src: "folders", gap: true },
    { title: " Create folder ", src: "new-folder" },
    { title: " Create file ", src: "add-file" },
    { title: "Last Modification", src: "history", path: "/contenthistory" },
    { title: "add team space", src: "queue" },
    { title: "Members", src: "diversity" },
    { title: "Inbox", src: "freedom-of-speech" },
    { title: "Analytics", src: "analytics" },
    { title: "Download", src: "cloud-computing" },
    { title: "Accounts", src: "User", gap: true },
    { title: "Schedule ", src: "Calendar" },
    { title: "Search", src: "Search" },
    { title: "Setting", src: "Setting" },
    { title: "logout", src: "logout" },
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-full p-5  pt-8 relative duration-300`}
      >
        <img
          src="/src/pages/sidebar/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
               border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="/src/pages/sidebar/assets/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            TeamDoc
          </h1>
        </div>

        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                  ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              {/* {Menu.path && ( */}
                <Link to={Menu.path} className="flex items-center gap-x-2">
                  <img src={`/src/pages/sidebar/assets/${Menu.src}.png`} />
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {Menu.title}
                  </span>
                </Link>
              {/* )} */}
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold ">Home Page</h1>
      </div>
    </div>
  );
}
