import { LoaderIcon } from "../ui/Icons";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  employeeName: string;
  isDeleting?: boolean;
}

export const DeleteConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  employeeName,
  isDeleting = false,
}: DeleteConfirmationProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full z-50 transition-opacity duration-200 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={(e) => {
        if (isDeleting) return;
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative top-20 mx-auto max-w-sm animate-fadeIn">
        <div className="bg-white dark:bg-dark-paper rounded-lg shadow-card dark:shadow-card-dark overflow-hidden">
          <div className="px-6 pt-4 pb-2">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 9V14M12 5C7.58172 5 4 8.58172 4 13C4 17.4183 7.58172 21 12 21C16.4183 21 20 17.4183 20 13C20 8.58172 16.4183 5 12 5ZM12 17H12.01V17.01H12V17Z"
                  stroke="#FA896B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3 className="text-lg text-center font-medium text-gray-900 dark:text-white mb-1">
              Delete Employee
            </h3>

            <p className="text-center text-gray-500 dark:text-gray-400 mb-5 px-6">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {employeeName}
              </span>
              ? This action cannot be undone.
            </p>
          </div>

          <div className="flex border-t border-gray-200 dark:border-dark-border">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-card focus:outline-none transition-colors disabled:opacity-50"
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-3 text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none transition-colors disabled:opacity-70 flex items-center justify-center"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <LoaderIcon />
                  <span className="ml-2">Deleting...</span>
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
