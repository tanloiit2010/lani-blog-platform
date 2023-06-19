"use client";
import { Slide, TypeOptions } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import classNames from "classnames";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const contextStyles = {
  success: "bg-green-50 text-green-800 border-green-600",
  error: "bg-red-50 text-red-400 border-red-600",
  info: "bg-blue-50 text-blue-400 border-blue-400",
  warning: "bg-yellow-50 text-yellow-700 border-amber-600",
  default: "bg-green-50 text-green-400 border-green-600",
};

const icons = {
  success: <CheckCircleIcon />,
  error: <XCircleIcon />,
  info: <InformationCircleIcon />,
  warning: <ExclamationCircleIcon />,
  default: <InformationCircleIcon />,
};

const Toast = () => {
  return (
    <div className="absolute">
      <ToastContainer
        closeButton={false}
        transition={Slide}
        position={toast.POSITION.TOP_CENTER}
        toastClassName={(context) =>
          classNames(
            "border rounded-md my-4 p-2 mx-6 md:mx-0 flex items-center justify-end text-sm",
            contextStyles[context?.type || "default"]
          )
        }
        icon={(iconParams) => {
          const { type } = iconParams;
          const seletedType: TypeOptions = type as TypeOptions;

          return icons[seletedType || "default"];
        }}
        hideProgressBar={true}
      />
    </div>
  );
};

export default Toast;
