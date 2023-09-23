import React, { FC } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

// Modal component
interface IModalProps {
  visible: boolean;
  hideIconClose?: boolean;
  className?: string;
  children?: any;
  onClose?: any;
}

const ModalWrapper = styled.div<{ visible: boolean | undefined }>`
  top: 0;
  left: 0;
  background-color: #0005;
  position: fixed;
  display: ${(p) => (p.visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  z-index: 1031;
`;
const ModalBody = styled.div`
  position: relative;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  box-shadow: 0px 10px 24px #00000040;
  @media only screen and (max-width: 767px) {
    width: 98%;
  }
`;
const CloseIcon = styled(MdClose)`
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
  font-size: x-large;
`;

const Modal: FC<IModalProps> = ({
  visible = false,
  children,
  className,
  onClose,
  hideIconClose,
}) => {
  return (
    <ModalWrapper visible={visible}>
      <ModalBody className={className}>
        {!hideIconClose ? <CloseIcon onClick={onClose} /> : null}
        {children}
      </ModalBody>
    </ModalWrapper>
  );
};

export default Modal;
