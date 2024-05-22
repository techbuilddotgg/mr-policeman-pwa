import React, { FC } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        {children && <div>{children}</div>}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
