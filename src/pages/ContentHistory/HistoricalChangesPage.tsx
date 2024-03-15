//import PopupModel from "./Popup/PopupModel";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { GitCommitHorizontal, History, MousePointerClick } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HistoricalChangesPage() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="flex items-center px-6 h-14 border-b gap-4">
        <Link
          className="flex items-center gap-5 text-sm font-medium "
          onClick={() => window.history.back()}
        >
          <History className="text-green-500 mr-0 h-8 w-8" />
          Your Last Modification
        </Link>
        <nav className="ml-80 flex items-center gap-20">
          <div className="relative mb-3 md:w-96 mx-auto mt-3">
            <Input type="date" placeholder="Search"></Input>
          </div>
          <div>
            <div >
              <Button className="bg-dark-purple text-white font-mono py-2 px-2 rounded-full mt-3 mr-3">
                Restore
              </Button>
              <Button className="bg-red-700 text-white font-mono py-2 px-2 rounded-full mt-3">
                Cancel
              </Button>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex flex-1 min-h-1 overflow-hidden mx-auto ml-45">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 flex min-h-0">
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 min-h-0 p-4">
                <ScrollArea className="rounded-md border w-11/12">
                  <div className="p-4 text-sm leading-7">
                    <div className="flex items-center ">
                      <GitCommitHorizontal />
                      <p className="mb-2 last:mb-0">
                        <span className="font-medium">
                          the 12th of February at 13:06
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center text-dark-purple  font-mono mb-4 last:mb-0 ml-6">
                      <MousePointerClick className="text-pink-500 mr-2 h-4 w-5" />
                      <p className="mb-2 last:mb-0">Hana Romdhani</p>
                    </div>

                    <pre className="bg-gray-100 rounded-md p-4 text-sm  whitespace-pre-wrap">
                      {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, nostrum autem facilis dignissimos odio quaerat voluptatum et excepturi at amet. Deserunt consectetur, ipsum minus aliquid itaque repellat quod ab ipsa.`}
                    </pre>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// const HistoricalChangesPage = ({ documentChanges= [
//     {
//       id: 1,
//       date: '2024-03-01',
//       user: 'John Doe',
//       action: 'Modification',
//       description: 'Changements effectués dans la section 1 du document.',
//     },
//     {
//       id: 2,
//       date: '2024-03-05',
//       user: 'Alice Smith',
//       action: 'Ajout',
//       description: 'Nouvelle section ajoutée au document.',
//     },
//   ] }) => {
//   return (
//     // <div>
//     //   <h1>Historique des Modifications</h1>
//     //   <ul>
//     //     {documentChanges.map(change => (
//     //       <li key={change.id}>
//     //         <div>Date: {change.date}</div>
//     //         <div>Utilisateur: {change.user}</div>
//     //         <div>Action: {change.action}</div>
//     //         <div>Description: {change.description}</div>
//     //       </li>
//     //     ))}
//     //   </ul>
//     // </div>
//   //   <PopupModel
//   //   title="Historique des Modifications"
//   //   onClose={() => console.log("Modal closed")}
//   //   onSave={() => console.log("Changes saved")}
//   // >
//   //   <HistoricalChangesPage documentChanges={ <ul>
//   //     {documentChanges.map(change => (
//   //         <li key={change.id}>
//   //        <div>Date: {change.date}</div>
//   //        <div>Utilisateur: {change.user}</div>
//   //        <div>Action: {change.action}</div>
//   //         <div>Description: {change.description}</div>
//   //       </li>
//   //     ))}
//   //  </ul>} />
//   // </PopupModel>
//   <div className="flex flex-col h-screen w-full">
//   <header className="flex items-center px-6 h-14 border-b gap-4">
//     <Link className="flex items-center gap-2 text-sm font-medium" href="#">
//       <DatabaseIcon className="h-6 w-6" />
//       Version History
//     </Link>
//     <nav className="ml-auto flex items-center gap-2">
//       <button className="rounded-full" size="sm" variant="outline">
//         Commit
//       </button>
//       <Button className="rounded-full" size="sm" variant="outline">
//         Branch
//       </Button>
//       <div>
//         <div className="rounded-full button button-ghost w-20 h-8 text-xxs scale-95 font-medium">Jane Doe</div>
//         <div className="mt-1 w-36 origin-top-right">
//           <div />
//           <div />
//           <div />
//           <div />
//         </div>
//       </div>
//     </nav>
//   </header>
//   <main className="flex flex-1 min-h-0 overflow-hidden">
//     <aside className="flex flex-col w-60 border-r min-h-0">
//       <div className="flex items-center h-10 px-4 border-b">
//         <Input className="w-full h-full border-none box-content" placeholder="Search" type="search" />
//       </div>
//       <div className="flex-1 min-h-0 overflow-auto">
//         <nav className="flex flex-col gap-1 p-2 text-sm">
//           <Link className="flex items-center gap-2 rounded-md p-2 bg-gray-100" href="#">
//             <FileIcon className="h-4 w-4" />
//             index.html
//           </Link>
//           <Link className="flex items-center gap-2 rounded-md p-2" href="#">
//             <FileIcon className="h-4 w-4" />
//             styles.css
//           </Link>
//           <Link className="flex items-center gap-2 rounded-md p-2" href="#">
//             <FileIcon className="h-4 w-4" />
//             index.js
//           </Link>
//         </nav>
//       </div>
//     </aside>
//     <div className="flex-1 flex flex-col min-h-0">
//       <header className="flex items-center h-10 px-4 border-b">
//         <nav className="flex items-center gap-2 text-sm">
//           <Link className="underline" href="#">
//             index.html
//           </Link>
//           <Link className="ml-2 underline" href="#">
//             styles.css
//           </Link>
//           <Link className="ml-2 underline" href="#">
//             index.js
//           </Link>
//         </nav>
//         <Button className="ml-auto rounded-full" size="sm">
//           Commit to master
//         </Button>
//       </header>
//       <div className="flex-1 flex min-h-0">
//         <div className="flex-1 flex flex-col min-h-0">
//           <div className="flex-1 min-h-0 p-4">
//             <ScrollArea className="rounded-md border w-full">
//               <div className="p-4 text-sm leading-7">
//                 <p className="mb-2 last:mb-0">
//                   <span className="font-medium">Initial commit</span> by{" "}
//                   <span className="font-medium">Jane Doe</span>
//                 </p>
//                 <p className="text-gray-500 mb-4 last:mb-0">
//                   3 minutes ago ·
//                   <Link className="underline" href="#">
//                     View
//                   </Link>
//                 </p>
//                 <pre className="bg-gray-100 rounded-md p-4 text-sm">
//                   {`<html>\n  <head>\n    <title>Example</title>\n  </head>\n  <body>\n    <h1>Hello, world!</h1>\n  </body>\n</html>`}
//                 </pre>
//               </div>
//             </ScrollArea>
//           </div>
//         </div>
//       </div>
//     </div>
//   </main>
// </div>
// );
// };

// export default HistoricalChangesPage;
