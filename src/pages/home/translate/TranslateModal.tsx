import { Button } from "@/components/ui/button";
interface TranslateModalProps {
  isOpen: boolean;
  onClose: () => void;
  translatedText: string;
}
export const TranslateModal: React.FC<TranslateModalProps> = ({
  isOpen,
  onClose,
  translatedText,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Translated Text
          </h3>
        </div>
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-400">{translatedText}</p>
        </div>
        <div className="mt-6 flex justify-end">
          <Button className=" bg-white text-black" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TranslateModal;
