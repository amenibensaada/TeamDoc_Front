import { askQuestion } from "@/services/OpenAIService";
import { useState } from "react";

// import React, { useState } from "react";

// function Chat() {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await askQuestion(question);
//     setAnswer(response);
//   };

function Chat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const response = await askQuestion(question);
    setAnswer(response);
  };

  return (
    <div className="">
      <img src="/assets/logo.png" className=" w-1/12 mx-6 my-6" />
      <div className="grid gap-4 lg:grid-cols-4 min-h-screen items-start lg:items-center lg:py-6 py-12 px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="hidden lg:flex flex-col gap-2">
          <div className="text-3xl font-bold">Talk to TeamDocAI</div>
          <div className="text-gray-500 dark:text-gray-400">
            Ask questions, get code, explore the possibilities.
          </div>
          <div>
            <img src="/assets/AI.png" alt="Your Image" className=" w-1/2" />
          </div>
        </div>
        <div className="lg:col-span-3 grid gap-4">
          <div className="grid gap-2">
            <div className="text-xl font-semibold">Ask a question</div>
            <div className="prose text-gray-500 max-w-[600px] dark:text-gray-400">
              Try asking a question or describing a problem. For example, you
              can ask for help with a coding problem, request a summary of a
              long piece of text, or ask for a creative story.
            </div>
          </div>
          <div className="grid gap-4">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-2 bg-white">
                <label className="sr-only" htmlFor="question">
                  Enter your question
                </label>

                <input
                  className="min-h-[100px] border bg-white mb-10"
                  type="text"
                  id="question"
                  placeholder="   Enter your question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              <button
                className=" bg-violet-400 hover:bg-violet-700 text-white font-bold py-2 px-10 rounded-lg"
                type="submit">
                Ask
              </button>
            </form>
          </div>
          <div className="grid gap-4">
            <div className="text-xl font-semibold">Response</div>
            <div className="border p-4 rounded-lg bg-white dark:bg-gray-950">
              <div className="prose">
                <p>{answer}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

// <div>
//   <form onSubmit={handleSubmit}>
//     <input
//       type="text"
//       value={question}
//       onChange={(e) => setQuestion(e.target.value)}
//     />
//     <button type="submit">Ask</button>
//   </form>
//   <p>{answer}</p>
// </div>
//   );
// }

// export default Chat;
