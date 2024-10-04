import React, { Fragment } from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import Button from "./Button";

interface PopConfirmProps {
  onConfirm: () => void;
  onCancel?: () => void;
  prompt?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  position?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
}

const PopConfirm: React.FC<PopConfirmProps> = ({
  onConfirm,
  onCancel,
  prompt = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  position = "bottom",
  children,
}) => {
  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1/2 mt-2";
      case "left":
        return "right-full top-1/2 transform -translate-y-1/2 mr-2";
      case "right":
        return "left-full top-1/2 transform -translate-y-1/2 ml-2";
      default:
        return "top-full left-1/2 transform -translate-x-1/2 mt-2";
    }
  };

  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          <PopoverButton className="flex focus:outline-none focus:border-none focus:outline-0 focus:ring-0 items-center">
            {children}
          </PopoverButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel
              className={`absolute z-50 bg-white p-6 rounded-lg shadow-md border border-[#E0E0E0] ${getPositionClasses()}`}
            >
              <div className="min-w-52 space-y-4">
                <div>{prompt}</div>
                <div className="flex justify-between space-x-2">
                  <Button
                    onClick={() => {
                      if (onCancel) onCancel();
                      close();
                    }}
                    variant="secondary"
                  >
                    {cancelText}
                  </Button>
                  <Button
                    onClick={() => {
                      if (onConfirm) onConfirm();
                      close();
                    }}
                  >
                    {confirmText}
                  </Button>
                </div>
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default PopConfirm;
