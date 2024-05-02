import "regenerator-runtime/runtime";
import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button } from "@/components/ui/button";

const StartRecording = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
    setIsListening(true);
    console.log("start record");
  }, []);

  const stopListening = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    SpeechRecognition.stopListening();
    setIsListening(false);
    console.log("Stop listening");
  };

  return (
    <div className="mx-auto max-w-md space-y-6 py-12">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold">Speech Recognition</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Use your voice to fill out this form.
        </p>
      </div>

      <form className="space-y-4">
        <div className="grid gap-2">
          <label className="text-base font-medium">Message</label>
          <div className="relative">
            <textarea
              id="message"
              placeholder="Speak your message..."
              className="block w-full rounded-md border text-white border-gray-300 px-4 py-3  placeholder-gray-500 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500"
              value={transcript}></textarea>
            {isListening && (
              <button
                type="button"
                className="absolute top-1/2 -translate-y-1/2 right-2 rounded-full bg-red-500 p-2 overflow-hidden focus:outline-none"
                onClick={stopListening}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 animate-pulse">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </button>
            )}
          </div>
        </div>
        {/* <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
          type="submit"
          onClick={stopListening}>
          Stop listening
        </button> */}
        <Button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
          type="submit"
          onClick={resetTranscript}>
          clear Text
        </Button>
      </form>
    </div>
  );
};

export default StartRecording;
