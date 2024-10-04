import { Fragment, ReactNode } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Button from "./Button";

interface ModalProps {
  children: ReactNode;
  footer?: ReactNode;
  isOpen?: boolean;
  onCloseModal: () => void;
}

export default function Modal({
  children,
  isOpen = true,
  onCloseModal,
}: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onCloseModal} static>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-4/12 min-w-80 transform overflow-visible rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex flex-row justify-end mb-2">
                  {onCloseModal && (
                    <Button variant="secondary" onClick={onCloseModal}>
                      <XMarkIcon color="black" className="h-5 w-5" />
                    </Button>
                  )}
                </div>
                <div>{children}</div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
