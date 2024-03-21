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
          className="flex items-center gap-5 text-sm font-medium text-dark "
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
                      <GitCommitHorizontal className="text-rose-600 mr-2 h-8 w-8" />
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

