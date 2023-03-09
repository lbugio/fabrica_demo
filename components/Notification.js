import {
  TrashIcon,
  PencilSquareIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";

export const Notification = ({
  showNotification,
  setShowNotification,
  notificationMessage,
  notificationType,
}) => {

  let bgColor;
  const icon = (() => {
    switch (notificationType) {
      case "create":
        bgColor = 'bg-green-100';
        return <CheckCircleIcon className="h-6 w-6 text-green-800" aria-hidden="true" />;
      case "edit":
        bgColor = 'bg-green-100';

        return <PencilSquareIcon className="h-6 w-6 text-green-800 hover:brightness-200" aria-hidden="true" />;
      case "delete":
        bgColor = 'bg-red-100';

        return <TrashIcon className="h-6 w-6 text-red-800 hover:brightness-200" aria-hidden="true" />;
      case "error":
        bgColor = 'bg-red-100';
        return <ExclamationTriangleIcon className="h-6 w-6 text-red-800 hover:brightness-200" aria-hidden="true" />;
      default:
        return null;
    }
  })();

  return (
    <div
      className={`absolute top-0 right-0 m-3 w-2/3 md:w-1/3 ${
        showNotification ? "" : "hidden"
      }`}
    >
      <Transition
        show={showNotification}
        enter="ease-out duration-500"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-500"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div className={`border-gray-300 border p-3 flex items-start shadow-lg rounded-md space-x-2 ${bgColor}`}>
          {icon}
          <div className="flex-1 space-y-1">
            <p className="text-base leading-6 font-medium text-gray-700">
              {notificationMessage}
            </p>
            <p className="text-sm leading-5 text-gray-600">
              Se vera en la tabla de datos
            </p>
          </div>
          <svg
            className="flex-shrink-0 h-5 w-5 text-gray-400 cursor-pointer"
            onClick={() => setShowNotification(false)}
            stroke="currentColor"
            viewBox="0 0 20 20"
            title="Cerrar"

          >
            <path
              strokeWidth="1.2"
              d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"
            ></path>
          </svg>
        </div>
      </Transition>
    </div>
  );
};