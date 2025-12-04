import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  const closeModal = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  const switchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const switchToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <ModalContext.Provider
      value={{
        isLoginOpen,
        isRegisterOpen,
        openLoginModal,
        openRegisterModal,
        closeModal,
        switchToRegister,
        switchToLogin
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};